import { useChat } from 'ai/react';
import { Button } from '../ui/button'
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Markdown from 'react-markdown'
import { FaCamera } from "react-icons/fa";
import { useEffect } from 'react';
import { toast } from '../ui/use-toast';

export default function ChatContainer() {
    const { messages, input, handleInputChange, handleSubmit, error } = useChat();

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
        if(messages.length < 6){
            toast({
                variant: "destructive",
                title: "failed",
                description: "Selesaikan konsultasi" 
            })
        }
    }
  return (
      <div className="px-4 md:px-0 w-96 mx-auto mt-20">
        <div className="bg-white shadow-2xl rounded-lg max-w-lg w-full  transition ease-in-out duration-500 group">
            <div className="p-4 border-b bg-main text-white rounded-t-lg flex justify-between items-center">
                <p className="text-lg font-semibold">Carigi AI</p>
                <div className="flex flex-wrap items-center">
                    <button className="mr-5">
                        <FaCamera className='text-2xl'/>
                    </button>
                </div>
            </div>
            <div>
                <ScrollArea className="px-4 h-80 overflow-y-auto">
                    <ScrollBar />
                    <div className="mt-4 mb-2">
                        <p className="bg-gray-200 text-gray-700 text-sm rounded-lg py-2 px-4 inline-block max-w-xs text-justify">Halo, saya adalah AI yang memiliki pengetahuan tentang gigi dan mulut, silahkan tanya apapun terkait permasalahan anda. </p>
                    </div>
                    {messages.map((message, index) => (
                        <div key={index}>
                            {message.role === "assistant" && (
                                <div className="mb-2">
                                    <Markdown className="bg-gray-200 text-gray-700 text-sm rounded-lg py-2 px-4 inline-block max-w-xs overflow-auto text-justify">{message.content}</Markdown>
                                </div>
                            )}
                            {message.role === "user" && (
                                <div className="text-right mb-2">
                                    <p className="bg-main text-sm text-white rounded-lg py-2 px-4 inline-block">{message.content}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </ScrollArea>
                <form onSubmit={handleSubmit} method="post" className="p-4 border-t flex flex-nowrap mx-auto">
                    <input onChange={handleInputChange} value={input} type="text" placeholder="Type a message" className="w-3/4 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-main group-focus:scale-105" name="prompt" autoComplete={"off"}/>
                    <button type="submit" className="w-1/5 bg-main text-white py-2 rounded-r-md hover:bg-teal-400 transition duration-300">Send</button>
                </form>  
            </div>               
        </div>
        <div className="flex flex-wrap justify-center mt-8">
            <Button onClick={handleResult} className="bg-[#FFF500] font-semibold text-slate-700 py-2.5 px-4 rounded-xl hover:bg-[#EBE100] transition duration-300 flex items-center shadow-md">Lihat Hasil</Button>
        </div>
    </div>
  )
}
