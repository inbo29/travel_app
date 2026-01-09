import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useTranslateStore } from '@/store/translateStore'
import { TranslateService } from '@/services/translate.service'
import { LanguageSelector } from '@/domains/translate/components/LanguageSelector'
import { TranslationContext } from '@/domains/translate/types'

const CONTEXTS: { value: TranslationContext; label: string; icon: string }[] = [
    { value: 'travel', label: 'Travel', icon: '✈️' },
    { value: 'business', label: 'Business', icon: '💼' },
    { value: 'medical', label: 'Medical', icon: '🏥' },
    { value: 'general', label: 'General', icon: '💬' },
]

export default function TextTranslate() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const store = useTranslateStore()

    const [loading, setLoading] = useState(false)

    const handleTranslate = async () => {
        if (!store.inputText.trim()) return
        setLoading(true)
        try {
            const res = await TranslateService.translateText({
                sourceText: store.inputText,
                fromLang: store.fromLang,
                toLang: store.toLang,
                context: store.context,
            })
            store.setOutput(res.translatedText)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = () => {
        if (!store.inputText || !store.outputText) return
        store.addHistory({
            sourceText: store.inputText,
            translatedText: store.outputText,
            fromLang: store.fromLang,
            toLang: store.toLang,
            context: store.context,
            mode: 'TEXT',
        })
        // Show feedback
        alert('Saved!') // TODO: Replace with toast
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(store.outputText)
        alert('Copied!') // TODO: Replace with toast
    }

    return (
        <div className="pt-24 pb-32 px-6 max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/translate')}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">Text Translate</h1>
            </div>

            {/* Context Selection */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {CONTEXTS.map(c => (
                    <button
                        key={c.value}
                        onClick={() => store.setContext(c.value)}
                        className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${store.context === c.value
                                ? 'bg-accent text-white'
                                : `${glassClasses} border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70`
                            }`}
                    >
                        <span>{c.icon}</span>
                        {c.label}
                    </button>
                ))}
            </div>

            {/* Language Selectors */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
                <LanguageSelector
                    value={store.fromLang}
                    onChange={(code) => store.setLanguages(code, store.toLang)}
                    label="From"
                />
                <button
                    onClick={() => store.swapLanguages()}
                    className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 transition-all mb-1"
                >
                    ⇄
                </button>
                <LanguageSelector
                    value={store.toLang}
                    onChange={(code) => store.setLanguages(store.fromLang, code)}
                    label="To"
                />
            </div>

            {/* Input */}
            <div className={`${glassClasses} p-6 rounded-[2rem] border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5`}>
                <textarea
                    value={store.inputText}
                    onChange={(e) => store.setInput(e.target.value)}
                    placeholder="Type something to translate..."
                    rows={4}
                    className="w-full bg-transparent resize-none outline-none text-slate-900 dark:text-white placeholder-slate-400 font-medium text-lg"
                />
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
                    <span className="text-xs text-slate-400">{store.inputText.length} characters</span>
                    <button
                        onClick={handleTranslate}
                        disabled={loading || !store.inputText.trim()}
                        className="px-8 py-3 bg-accent text-white font-bold rounded-xl disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            '🔤'
                        )}
                        Translate
                    </button>
                </div>
            </div>

            {/* Output */}
            {store.outputText && (
                <div className={`${glassClasses} p-6 rounded-[2rem] border-accent/30 bg-accent/5`}>
                    <p className="text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
                        {store.outputText}
                    </p>
                    <div className="flex gap-3 pt-4 mt-4 border-t border-accent/20">
                        <button onClick={handleCopy} className="flex-1 py-3 rounded-xl bg-white/50 dark:bg-white/10 font-bold text-slate-700 dark:text-white">
                            📋 Copy
                        </button>
                        <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-accent text-white font-bold">
                            ⭐ Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
