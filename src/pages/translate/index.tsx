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
        <div className="pt-8 pb-32 px-6 max-w-2xl mx-auto space-y-10">
            {/* Header / Management of title handled by Global Header */}
            <div>
                <p className="text-slate-500 dark:text-white/50 font-medium text-sm">{t('translate.subtitle')}</p>
            </div>

            {/* Mode Selection Grid */}
            <div className="grid grid-cols-2 gap-4">
                {MODES.map(m => (
                    <button
                        key={m.mode}
                        onClick={() => navigate(m.route)}
                        className={`${glassClasses} p-8 rounded-3xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-all text-left shadow-xl shadow-black/5 group`}
                    >
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{m.icon}</div>
                        <p className="font-black text-xl text-slate-900 dark:text-white">{t(`translate.modes.${m.mode.toLowerCase()}`)}</p>
                    </button>
                ))}
            </div>

            {/* Saved History Quick Access */}
            <div className={`${glassClasses} p-6 rounded-3xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-xl shadow-black/5`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg text-slate-900 dark:text-white">{t('translate.recentTitle')}</h2>
                    <button
                        onClick={() => navigate('/translate/saved')}
                        className="text-accent text-sm font-bold hover:underline"
                    >
                        {t('translate.viewAll')} ({history.length})
                    </button>
                </div>

                {history.length === 0 ? (
                    <p className="text-slate-400 text-sm italic">{t('translate.empty')}</p>
                ) : (
                    <div className="space-y-3">
                        {history.slice(0, 3).map(h => (
                            <div key={h.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-lg">
                                    {h.mode === 'TEXT' ? '📝' : h.mode === 'VOICE' ? '🎙️' : h.mode === 'OCR' ? '📷' : '💬'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-900 dark:text-white truncate">{h.sourceText}</p>
                                    <p className="text-sm text-slate-500 truncate">{h.translatedText}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
