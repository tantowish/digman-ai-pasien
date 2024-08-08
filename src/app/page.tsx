'use client'

import ChatContainer from "@/components/chat/chat-container";
import { PatientForm } from "@/components/patient-form";
import { User } from "@/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>({
    name: "Tantowi",
    age: 20,
    sex: "P"
  })

  useEffect(() => {
    console.log(user)
    console.log(isOpen)
  }, [user])
  return (
    <div className="flex flex-wrap h-screen items-center text-slate-600">
      <div className="flex flex-col items-center justify-center md:w-1/2 h-screen w-full p-8 lg:px-32 lg:py-16 bg-white">
        <h1 className="text-center text-2xl font-bold mb-12">Form Informasi Carigi AI</h1>
        <PatientForm setIsOpen={setIsOpen} setUser={setUser}/>
      </div>
      <div className="w-full md:w-1/2 h-screen bg-main flex flex-wrap items-center">
        {(isOpen && user) ? 
          <ChatContainer/>
        : 
          <div className="p-8 max-w-sm md:max-w-lg mx-auto transition hover:translate-x-2 hover:scale-105 duration-500 ease-in-out">
              <Image src="/asset/3d_teeth.png" alt="3D teeth" width={768} height={768}/>
          </div>
        }
      </div>
    </div>
  );
}