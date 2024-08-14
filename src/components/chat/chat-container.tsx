import { useChat } from 'ai/react';
import { Button } from '../ui/button'
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Markdown from 'react-markdown'
import { FaCamera } from "react-icons/fa";
import { BsChatLeftTextFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { toast } from '../ui/use-toast';
import { User } from '@/types/user';
import { PROMPTCHAT } from '@/lib/prompts';
import TextareaAutosize from 'react-textarea-autosize';
import ImageInput from './image-input';

type Props = {
    user: User
}
export default function ChatContainer({user}: Props) {
    const [isImage, setIsImage] = useState<boolean>(false)
    const [type, setType] = useState<string | null>(null)
    const [isUploadSection, setIsUploadSection] = useState<boolean>(false)
    const { messages, input, handleInputChange, handleSubmit, error, isLoading, setMessages } = useChat({
        initialMessages: [
            {
                id: new Date().toISOString(),
                content: PROMPTCHAT,
                role: "system"
            }
        ],
    });

    useEffect(() => {
        setMessages([...messages, {
            id: new Date().toISOString(),
            content: `Nama pasien adalah ${user.name} umur ${user.age} jenis kelamin ${user.sex}`,
            role: "system"
        }])
    }, [])

    useEffect(()=>{
        if(error){
            toast({
                variant: "destructive",
                title: "failed",
                description: error.message 
            })
        }
    }, [error])

    const handleResult = () => {
        if(messages.length < 12){
            toast({
                variant: "destructive",
                title: "failed",
                description: "Selesaikan konsultasi" 
            })
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && event.shiftKey && !isLoading) {
            event.preventDefault();
            handleSubmit(event as any);
        }
    };

    const handleSetType = (type: string) => {
        setType(type);
        setIsUploadSection(true)
    };
  return (
      <div className="px-4 lg:px-0 w-full md:w-[80%] lg:w-[70%] mx-auto">
        <div className="bg-white shadow-2xl rounded-lg w-full  transition ease-in-out duration-500 group">
            <div className="p-4 border-b bg-main text-white rounded-t-lg flex justify-between items-center">
                <p className="text-lg font-semibold">Carigi AI</p>
                <div className="flex flex-wrap items-center">
                    <button className="mr-5" onClick={() => setIsImage(!isImage)}>
                        {isImage ? 
                            <BsChatLeftTextFill className='text-2xl'/>
                        : 
                            <FaCamera className='text-2xl'/>
                        }
                    </button>
                </div>
            </div>
            <div>
                {isImage ? 
                    <div className="p-4 h-[60vh] overflow-y-auto text-center flex flex-col justify-center items-center">
                        {isUploadSection ? 
                                <ImageInput setIsUploadSection={setIsUploadSection} type={type}/>
                            :
                            <>
                                <h1 className="mb-8 mt-4">Pilih sesuai foto atau gambar</h1>
                                <button onClick={() => handleSetType('gigi')} className="p-3 bg-main text-white font-semibold w-2/3 rounded-lg mb-8">
                                    Gigi
                                </button>
                                <button onClick={() => handleSetType('gusi')} className="p-3 bg-main text-white font-semibold w-2/3 rounded-lg mb-8">
                                    Gusi
                                </button>
                                <button onClick={() => handleSetType('jll')} className="p-3 bg-main text-white font-semibold w-2/3 rounded-lg mb-8">
                                    Jaringan Lunak Lainnya
                                </button>
                            </>
                        }
                    </div>
                    :
                    <>
                        <ScrollArea className="px-4 h-[60vh] overflow-y-auto w-full">
                            <ScrollBar />
                            <div className="mt-4 mb-2">
                                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block max-w-[90%] text-justify">Halo, saya adalah AI yang memiliki pengetahuan tentang gigi dan mulut, silahkan tanya apapun terkait permasalahan anda. </p>
                            </div>
                            {messages.map((message, index) => (
                                <div key={message.id}>
                                    {message.role === "assistant" && (
                                        <div className="mb-2">
                                            <Markdown className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block max-w-[90%] overflow-auto text-justify">{message.content}</Markdown>
                                        </div>
                                    )}
                                    {message.role === "user" && (
                                        <div className='text-right mb-2'>
                                            <p className="bg-main text-white rounded-lg py-2 px-4 w-fit inline-block max-w-[90%] overflow-auto break-words">{message.content}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {
                                messages.length >= 12 && 
                                <div className='w-full text-center my-2'>
                                    <button onClick={handleResult} className='hover:underline text-sm text-red-400'>Berhenti dan Lihat Hasil</button>
                                </div>
                            }
                        </ScrollArea>
                        <form onSubmit={handleSubmit} method="post" className="p-4 border-t flex flex-nowrap mx-auto">
                            <TextareaAutosize 
                                onChange={handleInputChange} 
                                onKeyDown={handleKeyDown}
                                value={input} 
                                placeholder="Type a message" 
                                className="w-4/5 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-main group-focus:scale-105" name="prompt" 
                                autoComplete={"off"}
                                maxRows={3}
                                style={{ resize: "none", height: 42 }}
                                />
                            <button type="submit" disabled={isLoading} className={`w-1/5 bg-main text-white py-2 rounded-r-md  transition duration-300 ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:bg-teal-400'}`}>Send</button>
                        </form> 
                    </>
                } 
            </div>               
        </div>
    </div>
  )
}
