import AppointmentButton from "./appointment-button";
import Result from "./result";

export default function SuccessModal() {
  return (
    <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70">
        <div className="px-8">
            <div className="flex flex-col p-8 md:px-16 bg-slate-50 border-main shadow-xl rounded-3xl">
                <div className="success-animation">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"></circle><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path></svg>
                </div>
                <h1 className="text-center text-2xl text-slate-700 w-full mt-4 mb-8 font-semibold">Analisis Berhasil</h1>
                <div className="flex flex-wrap gap-10">
                    <Result />
                    <AppointmentButton/>
                </div>
            </div>
        </div>
    </div>
  )
}
