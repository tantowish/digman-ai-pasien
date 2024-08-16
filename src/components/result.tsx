import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Context } from "@/context/context"
import { useContext } from "react"
import { ScrollArea } from "./ui/scroll-area"
import Markdown from "react-markdown"
import Image from "next/image"

export default function Result() {
    const {resume, imageResume, uploadedFile, setModalImageUrl} = useContext(Context)
  return (
    <AlertDialog>
        <AlertDialogTrigger>
            <button type="button" id="result-user" className="bg-main text-white py-2 px-4 lg:py-2.5 lg:px-8 text-sm md:text-base rounded-md hover:bg-teal-400 transition duration-300 flex items-center">Lihat Hasil</button>
        </AlertDialogTrigger>
            <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-main">Hasil Analisis AI</AlertDialogTitle>
            <AlertDialogDescription>
                <ScrollArea className="h-[450px] sm:h-[400px]">
                    <div className="mb-4 mt-2">
                        <h4 className="font-bold text-base text-slate-800">Resume Konsultasi</h4>
                        <Markdown className={"text-justify"}>{resume}</Markdown>
                    </div>
                    {(imageResume && uploadedFile) &&
                        <div>
                            <h4 className="font-bold text-base text-slate-800 mb-4">Resume Image</h4>
                            <div className="w-72 h-48 mx-auto mb-2 rounded-lg">
                                <Image 
                                    src={`https://storage.googleapis.com/digman-dev/${uploadedFile}`} 
                                    width={320} 
                                    height={288} 
                                    alt={uploadedFile || "uploaded-image"} 
                                    className="w-full h-full object-cover rounded-lg"
                                    onClick={() => setModalImageUrl(`https://storage.googleapis.com/digman-dev/${uploadedFile}`)}
                                />
                            </div>
                            <Markdown className={"text-justify"}>{imageResume}</Markdown>
                        </div>
                    }
                </ScrollArea>
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogAction className="bg-main text-white py-2 px-4 lg:py-2.5 lg:px-8 text-sm md:text-base rounded-md hover:bg-teal-400 transition duration-300 flex items-center">Kembali</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

