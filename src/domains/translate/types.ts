// Translation System Types
export type TranslationMode = 'TEXT' | 'VOICE' | 'CONVERSATION' | 'OCR'
export type TranslationContext = 'travel' | 'business' | 'medical' | 'general'

export interface Language {
    code: string
    name: string
    flag: string
}

export const LANGUAGES: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'mn', name: 'Монгол', flag: '🇲🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

// Request / Response DTOs
export interface TranslateReq {
    sourceText: string
    fromLang: string
    toLang: string
    context?: TranslationContext
}

export interface TranslateRes {
    sourceText: string
    translatedText: string
    fromLang: string
    toLang: string
    detectedLang?: string
    confidence?: number
}

// History Record
export interface TranslationRecord {
    id: string
    timestamp: number
    sourceText: string
    translatedText: string
    fromLang: string
    toLang: string
    context: TranslationContext
    mode: TranslationMode
}

// Conversation Message
export interface ConversationMessage {
    id: string
    speaker: 'me' | 'partner'
    sourceText: string
    translatedText: string
    timestamp: number
}
