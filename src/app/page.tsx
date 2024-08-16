'use client'

import AnalyzeSpinner from "@/components/analyze-spinner";
import ChatContainer from "@/components/chat/chat-container";
import { Modal } from "@/components/modal";
import { PatientForm } from "@/components/patient-form";
import SuccessModal from "@/components/success-modal";
import { Context } from "@/context/context";
import { User } from "@/types/user";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export type QueryParams = {
  link?: string,
  rekmed?: string,
  name?: string,
  age?: string,
  sex?: "P" | "L" | undefined
}

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const {resume, resuming, modalImageUrl, setModalImageUrl, uploadedFile, setParams, params} = useContext(Context)

  const searchParams = useSearchParams()


  useEffect(() => {
    const params: QueryParams = {
      link: searchParams.get('link') || undefined,
      rekmed: searchParams.get('rekmed') || undefined,
      name: searchParams.get('nama') || undefined,
      age: searchParams.get('umur') || undefined,
      sex: searchParams.get('kelamin') as "P"|"L" || undefined,
    } 
    setParams(params)
    setUser({
      name: params.name!,
      age: Number(params.age),
      sex: params.sex as "P"|"L"
    })
  }, [])
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && pageRef.current) {
      console.log('scrolling')
      pageRef.current.scrollTo({
        top: pageRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [isOpen]);
  return (
    <div className="flex flex-wrap h-screen items-center text-slate-600" ref={pageRef}>
      {resuming ? <AnalyzeSpinner/> : resume && <SuccessModal/>}
        <div className="flex flex-col items-center justify-center lg:w-1/2 h-screen w-full p-8 lg:px-32 lg:py-16 bg-white">
          <h1 className="text-center text-2xl font-bold mb-12">Form Informasi Carigi AI</h1>
          <PatientForm setIsOpen={setIsOpen} setUser={setUser} />
          <p className="absolute bottom-4 lg:left-4 text-slate-500 text-sm lg:text-base ">© Copyright 2023 Carigi Indonesia - All Rights Reserved</p>
        </div>
        <div className="w-full lg:w-1/2 h-screen bg-main flex flex-wrap items-center">
          {(isOpen && user) ? 
            <ChatContainer user={user} />
            : 
            <div className="p-8 max-w-sm lg:max-w-lg mx-auto transition hover:translate-x-2 hover:scale-105 duration-500 ease-in-out">
                <Image src="/asset/3d_teeth.png" alt="3D teeth" width={768} height={768} loading="eager"/>
            </div>
          }
        </div>
        {modalImageUrl && (
            <Modal
                src={modalImageUrl}
                alt={uploadedFile || "uploaded-image"} 
                onClose={() => setModalImageUrl(null)}
            />
        )}
    </div>
  );
}