import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useTranslateStore } from '@/store/translateStore'
import { TranslateService } from '@/services/translate.service'
import { MOCK_OCR_SCENARIOS } from '@/mocks/translate'

export default function OCRResult() {
    const navigate = useNavigate()
    const store = useTranslateStore()
    const [translated, setTranslated] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    const scenario = MOCK_OCR_SCENARIOS.find(s => s.id === store.ocrImageId)

    useEffect(() => {
        if (!store.ocrImageId) {
            navigate('/translate/ocr')
            return
        }

        const translate = async () => {
            const res = await TranslateService.translateOCR(store.ocrImageId!, store.fromLang, store.toLang)
            setTranslated(res.translatedText)
            setLoading(false)
        }
        translate()
    }, [store.ocrImageId])

    const handleSave = () => {
        if (!store.ocrResult || !translated) return
        store.addHistory({
            sourceText: store.ocrResult,
            translatedText: translated,
            fromLang: store.fromLang,
            toLang: store.toLang,
            context: store.context,
            mode: 'OCR',
        })
        alert('Saved to history!')
        navigate('/translate/saved')
    }

    const handleCopy = () => {
        if (translated) {
            navigator.clipboard.writeText(translated)
            alert('Copied!')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white font-bold">Translating...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-24 pb-32 px-6 max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/translate/ocr')}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">Scan Result</h1>
            </div>

            {/* Scanned Image */}
            {scenario && (
                <div className="rounded-[2rem] overflow-hidden">
                    <img
                        src={scenario.imageUrl}
                        className="w-full h-48 object-cover"
                        alt="Scanned"
                    />
                </div>
            )}

            {/* Extracted Text */}
            <div className={`${glassClasses} p-6 rounded-[2rem] border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5`}>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Detected Text</p>
                <p className="text-slate-900 dark:text-white font-medium whitespace-pre-line">{store.ocrResult}</p>
            </div>

            {/* Translation */}
            <div className={`${glassClasses} p-6 rounded-[2rem] border-accent/30 bg-accent/5`}>
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">Translation</p>
                <p className="text-slate-900 dark:text-white font-medium text-lg whitespace-pre-line">{translated}</p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={handleCopy}
                    className={`${glassClasses} py-5 rounded-2xl font-bold text-slate-900 dark:text-white border-slate-200 dark:border-white/10`}
                >
                    📋 Copy Translation
                </button>
                <button
                    onClick={handleSave}
                    className="py-5 rounded-2xl font-bold bg-accent text-white"
                >
                    ⭐ Save to History
                </button>
            </div>

            <button
                onClick={() => navigate('/translate/ocr')}
                className="w-full py-4 text-center text-accent font-bold"
            >
                Scan Another
            </button>
        </div>
    )
}
