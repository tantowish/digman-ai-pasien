
export default function AnalyzeSpinner() {
  return (
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
  )
}
