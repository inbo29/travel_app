import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useTranslateStore } from '@/store/translateStore'
import { MOCK_OCR_SCENARIOS } from '@/mocks/translate'

export default function OCRTranslate() {
    const navigate = useNavigate()
    const store = useTranslateStore()
    const [isScanning, setIsScanning] = useState(false)

    const handleScan = async () => {
        setIsScanning(true)

        // Simulate camera capture and processing
        await new Promise(r => setTimeout(r, 2000))

        // Pick a random scenario
        const scenario = MOCK_OCR_SCENARIOS[Math.floor(Math.random() * MOCK_OCR_SCENARIOS.length)]
        store.setOcrImage(scenario.id)
        store.setOcrResult(scenario.extractedText)

        setIsScanning(false)
        navigate('/translate/result')
    }

    return (
        <div className="pt-24 pb-32 px-6 max-w-2xl mx-auto min-h-screen flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/translate')}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Camera Translate</h1>
                    <p className="text-xs text-amber-500 font-bold">⚠️ Simulated Camera</p>
                </div>
            </div>

            {/* Camera Viewfinder Mock */}
            <div className="flex-1 relative rounded-[3rem] overflow-hidden bg-black/50 min-h-[400px]">
                {/* Simulated Camera Feed */}
                <img
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600"
                    className="w-full h-full object-cover opacity-70"
                    alt="Camera viewfinder"
                />

                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {isScanning ? (
                        <div className="text-center">
                            <div className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
                            <p className="text-white font-bold text-lg">Scanning...</p>
                        </div>
                    ) : (
                        /* Viewfinder Frame */
                        <div className="w-64 h-48 border-4 border-accent rounded-2xl relative">
                            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-accent rounded-tl-lg" />
                            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-accent rounded-tr-lg" />
                            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-accent rounded-bl-lg" />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-accent rounded-br-lg" />
                            <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium whitespace-nowrap">
                                Align text within frame
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Capture Button */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all disabled:opacity-50"
                >
                    <div className="w-16 h-16 rounded-full border-4 border-slate-900 flex items-center justify-center">
                        📷
                    </div>
                </button>
            </div>
        </div>
    )
}
