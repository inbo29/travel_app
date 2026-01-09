import { useState } from 'react'
import { LANGUAGES, Language } from '@/domains/translate/types'
import { glassClasses } from '@/styles/glass'

interface LanguageSelectorProps {
    value: string
    onChange: (code: string) => void
    label?: string
}

export function LanguageSelector({ value, onChange, label }: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const selected = LANGUAGES.find(l => l.code === value) || LANGUAGES[0]

    return (
        <div className="relative">
            {label && (
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${glassClasses} w-full px-5 py-4 rounded-2xl flex items-center justify-between gap-3 border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-all`}
            >
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{selected.flag}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{selected.name}</span>
                </div>
                <svg className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className={`absolute top-full left-0 right-0 mt-2 z-50 ${glassClasses} rounded-2xl border-slate-200 dark:border-white/10 bg-white dark:bg-bg-dark shadow-2xl overflow-hidden`}>
                    {LANGUAGES.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                onChange(lang.code)
                                setIsOpen(false)
                            }}
                            className={`w-full px-5 py-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-white/10 transition-all ${lang.code === value ? 'bg-accent/10' : ''
                                }`}
                        >
                            <span className="text-xl">{lang.flag}</span>
                            <span className="font-bold text-slate-900 dark:text-white">{lang.name}</span>
                            {lang.code === value && <span className="ml-auto text-accent">✓</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
