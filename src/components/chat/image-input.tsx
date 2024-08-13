import { Dispatch, SetStateAction, useState } from "react"
import { Input } from "../ui/input"
import { FaChevronLeft } from "react-icons/fa";
import { uploadBucket } from "@/lib/image-uploader";

type Props = {
    setIsUploadSection: Dispatch<SetStateAction<boolean>>
}

export default function ImageInput({setIsUploadSection}: Props) {
    const [uploadedFile, setUploadedFile] = useState<string | null>(null)
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        // Check if the file exists before attempting to upload
        if (file) {
            const uploaded = await uploadBucket(file);
            setUploadedFile(uploaded)
            console.log(uploaded)
        } else {
            console.error("No file selected");
        }
    }
  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative">
        <button className="absolute top-0 left-0 flex flex-wrap gap-1 items-center justify-center" onClick={() => setIsUploadSection(false)}>
            <FaChevronLeft />
            <p className="font-semibold">Kembali</p>
        </button>
        <label className="cursor-pointer px-16 py-3 text-black border border-main border-dashed" htmlFor="gambar">
            Pick photo
        </label>
        <Input 
            className="hidden" 
            type="file" 
            name="gambar" 
            id="gambar" 
            accept="image/*"
            onChange={handleFileChange}
        />
        {/* <div className="flex flex-col items-center justify-center h-36">
            <div id="image-preview" className="mt-10 hidden">
                <img id="preview" src="" alt="Image Preview" className="max-w-44 mx-auto max-h-36 rounded-lg"/>
            </div>
        </div> */}
    </div>
  )
}