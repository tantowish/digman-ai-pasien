import { Dispatch, SetStateAction, createContext } from "react";

interface Context {
    uploadedFile: string | null,
    setUploadedFile: Dispatch<SetStateAction<string | null>>,
    imageResume: string | null,
    setImageResume: Dispatch<SetStateAction<string | null>>,
    resume: string | null,
    setResume: Dispatch<SetStateAction<string | null>>,
}

export const Context = createContext<Context>({
    uploadedFile: null,
    setUploadedFile: () => {},
    imageResume: null,
    setImageResume: () => {},
    resume: null,
    setResume: () => {}
})