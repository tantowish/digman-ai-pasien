import { QueryParams } from "@/app/page";
import { Dispatch, SetStateAction, createContext } from "react";

interface Context {
    uploadedFile: string | null,
    setUploadedFile: Dispatch<SetStateAction<string | null>>,
    imageResume: string | null,
    setImageResume: Dispatch<SetStateAction<string | null>>,
    resume: string | null,
    setResume: Dispatch<SetStateAction<string | null>>,
    resuming: boolean,
    setResuming: Dispatch<SetStateAction<boolean>>,
    modalImageUrl: string | null,
    setModalImageUrl: Dispatch<SetStateAction<string | null>>
    uploading: boolean,
    setUploading: Dispatch<SetStateAction<boolean>>,
    analyzing: boolean
    setAnalyzing: Dispatch<SetStateAction<boolean>>,
    params: QueryParams | null,
    setParams: Dispatch<SetStateAction<QueryParams | null>>
}

export const Context = createContext<Context>({
    uploadedFile: null,
    setUploadedFile: () => {},
    imageResume: null,
    setImageResume: () => {},
    resume: null,
    setResume: () => {},
    resuming: false,
    setResuming: () => {},
    modalImageUrl: null,
    setModalImageUrl: () => {},
    uploading: false,
    setUploading: () => {},
    analyzing: false,
    setAnalyzing: () => {},
    params: null,
    setParams: () => {}
})