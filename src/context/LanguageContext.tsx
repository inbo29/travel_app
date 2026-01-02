import { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'en' | 'mn' | 'ko' | 'ja' | 'zh'

interface LanguageContextValue {
    lang: Language
    setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>('en')

    useEffect(() => {
        const stored = localStorage.getItem('lang') as Language | null
        if (stored) {
            setLangState(stored)
        } else {
            const browserLang = navigator.language.slice(0, 2) as Language
            setLangState(browserLang || 'en')
        }
    }, [])

    const setLang = (l: Language) => {
        setLangState(l)
        localStorage.setItem('lang', l)
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
    return ctx
}
