import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useTranslateStore } from '@/store/translateStore'
import { TranslationMode } from '@/domains/translate/types'

const MODES = [
    { mode: 'TEXT' as TranslationMode, icon: '📝', label: 'Text', route: '/translate/text' },
    { mode: 'VOICE' as TranslationMode, icon: '🎙️', label: 'Voice', route: '/translate/voice' },
    { mode: 'CONVERSATION' as TranslationMode, icon: '💬', label: 'Conversation', route: '/translate/conversation' },
    { mode: 'OCR' as TranslationMode, icon: '📷', label: 'Camera', route: '/translate/ocr' },
]

export default function TranslateHome() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const { history } = useTranslateStore()

    return (
        <div className="relative min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 bg-pattern-dark opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

            <main className="relative z-10 pt-20 md:pt-24 max-w-7xl mx-auto px-4 md:px-6 pb-32">
                <div className="max-w-3xl mx-auto space-y-10 animate-fade-in">
                    {/* Header: Title & Description */}
                    <header className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            AI Translator
                        </h1>
                        <p className="text-slate-500 dark:text-white/50 font-medium italic">
                            {t('translate.subtitle')}
                        </p>
                    </header>

                    {/* Mode Selection Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {MODES.map(m => (
                            <button
                                key={m.mode}
                                onClick={() => navigate(m.route)}
                                className={`${glassClasses} p-10 rounded-[2.5rem] border border-white/20 dark:border-white/5 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all duration-500 text-left shadow-xl shadow-black/5 hover:scale-[1.05] active:scale-[0.98] group relative overflow-hidden`}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-accent/10 transition-colors" />
                                <div className="text-6xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">{m.icon}</div>
                                <p className="font-black text-2xl text-slate-900 dark:text-white tracking-tight">{t(`translate.modes.${m.mode.toLowerCase()}`)}</p>
                                <p className="text-xs text-sub-light dark:text-sub-dark mt-2 font-bold uppercase tracking-widest opacity-60">
                                    Instant AI Processing
                                </p>
                            </button>
                        ))}
                    </div>

                    {/* Saved History Quick Access */}
                    <div className={`${glassClasses} p-8 rounded-[2.5rem] border border-white/20 dark:border-white/5 bg-white/70 dark:bg-white/5 shadow-2xl shadow-black/5 space-y-6`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-black text-xl text-slate-900 dark:text-white">{t('translate.recentTitle')}</h2>
                                <p className="text-[10px] text-accent font-bold uppercase tracking-widest">History Log</p>
                            </div>
                            <button
                                onClick={() => navigate('/translate/saved')}
                                className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-white/10 text-accent text-xs font-black hover:bg-accent hover:text-white transition-all uppercase tracking-widest"
                            >
                                {t('translate.viewAll')} ({history.length})
                            </button>
                        </div>

                        {history.length === 0 ? (
                            <div className="py-10 text-center space-y-3 opacity-40">
                                <p className="text-4xl text-slate-400">📜</p>
                                <p className="text-slate-400 text-sm font-bold italic">{t('translate.empty')}</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {history.slice(0, 3).map(h => (
                                    <div key={h.id} className="group flex items-center gap-5 p-5 rounded-[1.5rem] bg-white/50 dark:bg-white/5 border border-transparent hover:border-accent/20 transition-all cursor-pointer">
                                        <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center text-xl shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                                            {h.mode === 'TEXT' ? '📝' : h.mode === 'VOICE' ? '🎙️' : h.mode === 'OCR' ? '📷' : '💬'}
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <p className="font-bold text-slate-900 dark:text-white truncate group-hover:text-accent transition-colors">{h.sourceText}</p>
                                            <p className="text-sm text-slate-500 font-medium truncate opacity-70">{h.translatedText}</p>
                                        </div>
                                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-40 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="h-16" />
                </div>
            </main>
        </div>
    )
}
