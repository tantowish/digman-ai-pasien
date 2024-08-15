import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { FaChevronLeft } from "react-icons/fa";
import { uploadBucket } from "@/lib/image-uploader";
import Image from "next/image";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import Spinner from "../spinner";
import { toast } from "../ui/use-toast";
import { Context } from "@/context/context";

type Props = {
    setIsUploadSection: Dispatch<SetStateAction<boolean>>,
    type: string | null
}

export default function ImageInput({setIsUploadSection, type}: Props) {
    const {uploadedFile, setUploadedFile, imageResume, setImageResume} = useContext(Context)
    const [loading, setLoading] = useState<boolean>(false)    
    const [analyzing, setAnalyzing] = useState<boolean>(false)    
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const file = event.target.files?.[0];
        // Check if the file exists before attempting to upload
        if (file) {
            const uploaded = await uploadBucket(file);
            setUploadedFile(uploaded)
            setLoading(false)
            console.log(uploaded)
        } else {
            setLoading(false)
            console.error("No file selected");
        }
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log('clicked')
        setAnalyzing(true)
        try {
            const response = await fetch('/api/chat/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: type, image: uploadedFile }),
            });

            const result = await response.json();

            if (response.ok) {
                setImageResume(result.data.text)
                console.log('Success:', result);
            } else {
                toast({
                    title: "Failed",
                    description: result.message,
                    variant: "destructive"
                })
                console.error('Error fetch:', result.message);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Server error",
                variant: "destructive"
            })
            console.error('Error:', error);
        } finally {
            setAnalyzing(false);
        }
    }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative">
        {imageResume ? 
                <div>
                    <div className="w-80 h-60">
                        <Image src={`https://storage.googleapis.com/digman-dev/${uploadedFile}`} width={320} height={288} className="w-full h-full object-cover" alt=""/>
                    </div>
                    <p>Sudah Analisis</p>
                    <Button type="button" onClick={() => setImageResume(null)}>Ulangi</Button>
                </div>
            :
            <>
                <button className="absolute top-0 left-0 flex flex-wrap gap-1 items-center justify-center" onClick={() => setIsUploadSection(false)}>
                    <FaChevronLeft />
                    <p className="font-semibold">Kembali</p>
                </button>
                <Input 
                    className="hidden" 
                    type="file" 
                    name="gambar" 
                    id="gambar" 
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {loading ?
                    <div className="flex flex-col justify-center items-center gap-2">
                        <label className="cursor-pointer text-black border border-main border-dashed rounded-md p-4 flex flex-wrap justify-center items-center">
                            <Skeleton className="w-80 h-60"/>
                        </label>
                        <Button disabled className="flex flex-wrap justify-center items-center gap-1"><Spinner/>Uploading</Button>
                    </div>
                    :
                    uploadedFile ? 
                    <div className="flex flex-col justify-center items-center gap-2">
                        <label className="cursor-pointer p-4 text-black border border-main border-dashed rounded-md" htmlFor="gambar">
                            <div className="w-80 h-60 rounded">
                                <Image src={`https://storage.googleapis.com/digman-dev/${uploadedFile}`} width={320} height={288} className="w-full h-full object-cover rounded" alt=""/>
                            </div>
                        </label>
                        <Button type="button" disabled={analyzing} onClick={handleSubmit}>
                            {analyzing ? 
                                <Spinner/>
                                :
                                "Analysis"
                            }
                        </Button>
                    </div>
                    :
                    <label className="cursor-pointer text-black border border-main border-dashed rounded-md h-24 flex flex-wrap justify-center items-center" htmlFor="gambar">
                        <p className="w-60">Pick photo</p>
                    </label>
                }
            </>
        }
    </div>
  )
}