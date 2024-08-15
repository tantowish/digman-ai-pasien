'use client'

import ChatContainer from "@/components/chat/chat-container";
import { Modal } from "@/components/modal";
import { PatientForm } from "@/components/patient-form";
import Result from "@/components/result";
import { Context } from "@/context/context";
import { User } from "@/types/user";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const {resume, setResume, resuming, modalImageUrl, setModalImageUrl, uploadedFile} = useContext(Context)

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

  // useEffect(() => {
  //   console.log(user)
  //   console.log(isOpen)
  // }, [user, isOpen])
  return (
    <div className="flex flex-wrap h-screen items-center text-slate-600" ref={pageRef}>
      {resuming ?
         <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
                <path className="text-teal-100" strokeDasharray="60" strokeDashoffset="60" strokeOpacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/>
                </path>
                <path className="text-main" strokeDasharray="15" strokeDashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                </path></g>
            </svg>
            <h1 className="text-center text-2xl text-white font-semibold">Sedang Menganalisis...</h1>
          </div>
         </div>
         :
         resume && 
         <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70">
          <div className="px-8">
              <div className="flex flex-col p-8 md:px-16 bg-slate-50 border-main shadow-xl rounded-3xl">
                  <div className="success-animation">
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"></circle><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path></svg>
                  </div>
                  <h1 className="text-center text-2xl text-slate-700 w-full mt-4 mb-8 font-semibold">Analisis Berhasil</h1>
                  <div className="flex flex-wrap gap-10">
                      <Result />
                      <button type="button" id="daftar" className="bg-main text-white py-2 px-4 lg:py-2.5 lg:px-8 text-sm md:text-base rounded-md hover:bg-teal-400 transition duration-300 flex items-center">Daftar Antrian</button>
                  </div>
              </div>
          </div>
         </div>
      }
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