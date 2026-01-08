import { useState, useRef, useEffect } from 'react'
import { Language } from '@/context/LanguageContext'
import { useI18n } from '@/hooks/useI18n'
import { glassClasses } from '@/styles/glass'

const LANGUAGES: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'mn', label: 'Mongolian', native: 'Монгол' },
    { code: 'ko', label: 'Korean', native: '한국어' },
    { code: 'ja', label: 'Japanese', native: '日本語' },
    { code: 'zh', label: 'Chinese', native: '中文' },
]

export function LanguageSwitcher() {
    const { lang, setLang } = useI18n()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors font-medium text-sm"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {currentLang.native}
            </button>

            {isOpen && (
                <div className={`${glassClasses} absolute right-0 mt-2 w-48 rounded-2xl p-2 shadow-xl border-white/20 dark:border-white/5 overflow-hidden z-[60]`}>
                    <div className="space-y-1">
                        {LANGUAGES.map((l) => (
                            <button
                                key={l.code}
                                onClick={() => {
                                    setLang(l.code)
                                    setIsOpen(false)
                                }}
                                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${lang === l.code
                                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                    : 'text-slate-600 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <span>{l.native}</span>
                                    <span className={`text-[10px] opacity-60 ${lang === l.code ? 'text-white' : ''}`}>
                                        {l.label}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
