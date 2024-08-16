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
    const {uploadedFile, setUploadedFile, imageResume, setImageResume, uploading, setUploading, analyzing, setAnalyzing} = useContext(Context) 
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploading(true)
        const file = event.target.files?.[0];
        if (file) {
            const uploaded = await uploadBucket(file);
            setUploadedFile(uploaded)
            setUploading(false)
            console.log(uploaded)
        } else {
            setUploading(false)
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
                <div className="flex flex-col justify-center items-center gap-4 p-4">
                    <p className="text-2xl font-bold text-main">Sudah Analisis</p>
                    <div className="border border-main border-dashed rounded-xl p-3">
                        <div className="w-80 h-60">
                            <Image src={`https://storage.googleapis.com/digman-dev/${uploadedFile}`} width={320} height={288} className="w-full h-full object-cover rounded-lg" alt={uploadedFile || "uplouded-image"}/>
                        </div>
                    </div>
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
                    disabled={uploading || analyzing}
                />
                {uploading ?
                    <div className="flex flex-col justify-center items-center gap-4">
                        <label className="cursor-pointer text-black border border-main border-dashed rounded-xl p-4 flex flex-wrap justify-center items-center">
                            <Skeleton className="w-80 h-60"/>
                        </label>
                        <Button disabled className="flex flex-wrap justify-center items-center gap-1"><Spinner/>Uploading</Button>
                    </div>
                    :
                    uploadedFile ? 
                    <div className="flex flex-col justify-center items-center gap-4">
                        <label className={`p-3 text-black border border-main border-dashed rounded-xl ${uploading || analyzing ? "cursor-not-allowed": "cursor-pointer"}`} htmlFor="gambar">
                            <div className="w-80 h-60 rounded">
                                <Image src={`https://storage.googleapis.com/digman-dev/${uploadedFile}`} width={320} height={288} className="w-full h-full object-cover rounded-lg" alt=""/>
                            </div>
                        </label>
                        <Button type="button" disabled={analyzing} onClick={handleSubmit}>
                            {analyzing ? 
                                <div className="flex flex-wrap justify-center items-center gap-2">
                                    <Spinner/> 
                                    <p>Analyzing</p> 
                                </div>
                                :
                                "Analysis"
                            }
                        </Button>
                    </div>
                    :
                    <label className={`cursor-pointer text-black border border-main border-dashed rounded-md h-24 flex flex-wrap justify-center items-center  ${uploading || analyzing ? "cursor-not-allowed": "cursor-pointer"}`} htmlFor="gambar">
                        <p className="w-60">Pick photo</p>
                    </label>
                }
            </>
        }
    </div>
  )
}