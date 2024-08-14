'use client'

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

    return (
        <Context.Provider
            value={{ 
                uploadedFile,
                setUploadedFile,
                imageResume,
                setImageResume,
                resume,
                setResume
             }}
        >{children}</Context.Provider>
    )
}