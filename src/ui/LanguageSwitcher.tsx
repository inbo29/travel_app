import { useState, useRef, useEffect } from 'react'
import { Language } from '@/context/LanguageContext'
import { useI18n } from '@/hooks/useI18n'
import { glassClasses } from '@/styles/glass'

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'mn', label: 'Mongolian', flag: '🇲🇳' },
    { code: 'ko', label: 'Korean', flag: '🇰🇷' },
    { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
    { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
    { code: 'my', label: 'Myanmar', flag: '🇲🇲' }
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
                aria-label={`Current language: ${currentLang.label}`}
                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95 group relative"
            >
                <span className="text-xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                    {currentLang.flag}
                </span>
                {/* Active Indicator Glow */}
                <div className="absolute inset-0 rounded-xl border-2 border-accent/20 dark:border-white/10 group-hover:border-accent/50 transition-colors"></div>
                {/* Small dot for current language */}
                <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-accent border-2 border-white dark:border-bg-dark" />
            </button>

            {isOpen && (
                <div className={`${glassClasses} absolute right-0 mt-3 w-40 rounded-2xl p-2 shadow-2xl border-white/20 dark:border-white/5 overflow-hidden z-[60] animate-in fade-in zoom-in duration-200`}>
                    <div className="flex flex-col gap-1">
                        {LANGUAGES.map((l) => (
                            <button
                                key={l.code}
                                onClick={() => {
                                    setLang(l.code)
                                    setIsOpen(false)
                                }}
                                aria-label={`Switch to ${l.label}`}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all
                                    ${lang === l.code
                                        ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                        : 'text-slate-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10'
                                    }
                                `}
                            >
                                <span className="text-xl">{l.flag}</span>
                                <span className="flex-1 text-left">{l.label}</span>
                                {lang === l.code && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
