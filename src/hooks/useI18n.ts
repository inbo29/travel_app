import { useContext } from 'react'
import { LanguageContext, Language } from '@/context/LanguageContext'
import en from '@/locales/en.json'
import ko from '@/locales/ko.json'
import mn from '@/locales/mn.json'
import ja from '@/locales/ja.json'
import zh from '@/locales/zh.json'

const DICT: Record<Language, any> = { en, ko, mn, ja, zh }

export function useI18n() {
    const context = useContext(LanguageContext)
    if (!context) throw new Error('useI18n must be used within LanguageProvider')

    const { lang, setLang } = context
    const dict = DICT[lang] || DICT.en

    const t = (path: string, vars?: Record<string, any>) => {
        let text = path.split('.').reduce((acc: any, key) => acc?.[key], dict) ?? path
        if (vars) {
            Object.entries(vars).forEach(([key, val]) => {
                text = text.replace(`{{${key}}}`, val)
            })
        }
        return text
    }

    return { t, lang, setLang }
}
