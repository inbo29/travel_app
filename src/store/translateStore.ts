import { create } from 'zustand'
import {
    TranslationMode,
    TranslationContext,
    TranslationRecord,
    ConversationMessage
} from '@/domains/translate/types'

const MAX_HISTORY = 50

interface TranslateState {
    // Language Selection
    fromLang: string
    toLang: string

    // Mode
    mode: TranslationMode
    context: TranslationContext

    // Current Translation
    inputText: string
    outputText: string

    // Conversation
    conversation: ConversationMessage[]

    // OCR
    ocrImageId: string | null // Path or ID, never base64
    ocrResult: string | null

    // History (limited)
    history: TranslationRecord[]

    // Actions
    setLanguages: (from: string, to: string) => void
    swapLanguages: () => void
    setMode: (mode: TranslationMode) => void
    setContext: (context: TranslationContext) => void
    setInput: (text: string) => void
    setOutput: (text: string) => void

    // History Actions
    addHistory: (record: Omit<TranslationRecord, 'id' | 'timestamp'>) => void
    removeHistory: (id: string) => void
    clearHistory: () => void

    // Conversation Actions
    addMessage: (msg: Omit<ConversationMessage, 'id' | 'timestamp'>) => void
    clearConversation: () => void

    // OCR Actions
    setOcrImage: (id: string | null) => void
    setOcrResult: (text: string | null) => void

    // Reset
    reset: () => void
}

const initialState = {
    fromLang: 'en',
    toLang: 'ko',
    mode: 'TEXT' as TranslationMode,
    context: 'travel' as TranslationContext,
    inputText: '',
    outputText: '',
    conversation: [],
    ocrImageId: null,
    ocrResult: null,
    history: [],
}

export const useTranslateStore = create<TranslateState>((set, get) => ({
    ...initialState,

    setLanguages: (from, to) => set({ fromLang: from, toLang: to }),

    swapLanguages: () => set(state => ({
        fromLang: state.toLang,
        toLang: state.fromLang,
        inputText: state.outputText,
        outputText: state.inputText,
    })),

    setMode: (mode) => set({ mode }),
    setContext: (context) => set({ context }),
    setInput: (text) => set({ inputText: text }),
    setOutput: (text) => set({ outputText: text }),

    addHistory: (record) => set(state => {
        const newRecord: TranslationRecord = {
            ...record,
            id: `tr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            timestamp: Date.now(),
        }
        // FIFO: Add to front, limit to MAX_HISTORY
        const updated = [newRecord, ...state.history].slice(0, MAX_HISTORY)
        return { history: updated }
    }),

    removeHistory: (id) => set(state => ({
        history: state.history.filter(r => r.id !== id)
    })),

    clearHistory: () => set({ history: [] }),

    addMessage: (msg) => set(state => {
        const newMsg: ConversationMessage = {
            ...msg,
            id: `msg_${Date.now()}`,
            timestamp: Date.now(),
        }
        return { conversation: [...state.conversation, newMsg] }
    }),

    clearConversation: () => set({ conversation: [] }),

    setOcrImage: (id) => set({ ocrImageId: id }),
    setOcrResult: (text) => set({ ocrResult: text }),

    reset: () => set(initialState),
}))
