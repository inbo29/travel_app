import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { glassClasses } from '@/styles/glass'

export default function TranslatorPage() {
    const { t } = useI18n()
    const navigate = useNavigate()

    return (
        <div className="pt-24 pb-32 px-6 max-w-lg mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all shrink-0"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('nav.translate')}</h1>
            </div>

            {/* Input Area */}
            <div className={`${glassClasses} p-6 rounded-[2rem] border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 space-y-4`}>
                <div className="flex items-center justify-between text-sm font-bold text-slate-500 dark:text-white/60">
                    <span>ENGLISH</span>
                    <button>⇄</button>
                    <span className="text-accent">MONGOLIAN</span>
                </div>
                <textarea
                    className="w-full bg-transparent border-none outline-none text-2xl font-medium text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-white/20 resize-none h-32"
                    placeholder="Enter text to translate..."
                />
                <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white">🎤</button>
                    <button className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">➤</button>
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
                <button className={`${glassClasses} p-6 rounded-3xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex flex-col items-center gap-3 hover:bg-white dark:hover:bg-white/10 transition-all`}>
                    <span className="text-3xl">📷</span>
                    <span className="font-bold text-slate-900 dark:text-white">Camera</span>
                </button>
                <button className={`${glassClasses} p-6 rounded-3xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex flex-col items-center gap-3 hover:bg-white dark:hover:bg-white/10 transition-all`}>
                    <span className="text-3xl">🗣️</span>
                    <span className="font-bold text-slate-900 dark:text-white">Conversation</span>
                </button>
            </div>
        </div>
    )
}
