'use client'

import { QueryParams } from "@/app/page";
import { Context } from "@/context/context";
import { FC, useState } from "react";


interface GlobalStateProps {
    children: React.ReactNode
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
    // Chat State
   const [uploadedFile, setUploadedFile] = useState<string | null>(null)
   const [imageResume, setImageResume] = useState<string | null>(null)
   const [resume, setResume] = useState<string | null>(null)
   const [resuming, setResuming] = useState<boolean>(false)
   const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
   const [uploading, setUploading] = useState<boolean>(false)    
   const [analyzing, setAnalyzing] = useState<boolean>(false) 
   const [params, setParams] = useState<QueryParams | null>(null)

    return (
        <Context.Provider
            value={{ 
                uploadedFile,
                setUploadedFile,
                imageResume,
                setImageResume,
                resume,
                setResume,
                resuming,
                setResuming,
                modalImageUrl,
                setModalImageUrl,
                uploading,
                setUploading,
                analyzing,
                setAnalyzing,
                params,
                setParams
             }}
        >{children}</Context.Provider>
    )
}