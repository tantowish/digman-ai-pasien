import { useContext } from "react";
import { Button } from "./ui/button";
import { Context } from "@/context/context";

export default function AppointmentButton() {
  const {resume, imageResume, uploadedFile, params} = useContext(Context)
  const link = `https://${params?.link}/register?rekmed=${params?.rekmed}&rangkuman=${resume}&rangkumanGambar=${imageResume}&image=${uploadedFile}`
  
  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <Button onClick={handleClick} className={`bg-main text-white py-2 px-4 lg:py-2.5 lg:px-8 text-sm md:text-base rounded-md hover:bg-teal-400 transition duration-300 flex items-center`} disabled={params?.rekmed == undefined || params.rekmed.trim() == ""}>Daftar Antrian</Button>
  )
}
