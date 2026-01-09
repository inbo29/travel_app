import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useTranslateStore } from '@/store/translateStore'
import { TranslateService } from '@/services/translate.service'
import { TranslationBubble } from '@/domains/translate/components/TranslationBubble'
import { LANGUAGES } from '@/domains/translate/types'

export default function ConversationTranslate() {
    const navigate = useNavigate()
    const store = useTranslateStore()
    const scrollRef = useRef<HTMLDivElement>(null)
    const [activeSpeaker, setActiveSpeaker] = useState<'me' | 'partner' | null>(null)

    const fromFlag = LANGUAGES.find(l => l.code === store.fromLang)?.flag || '🌐'
    const toFlag = LANGUAGES.find(l => l.code === store.toLang)?.flag || '🌐'

    // Auto-scroll to bottom
    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, [store.conversation])

    const handleSpeak = async (speaker: 'me' | 'partner') => {
        setActiveSpeaker(speaker)

        // Simulate listening
        await new Promise(r => setTimeout(r, 1500))

        const fromL = speaker === 'me' ? store.fromLang : store.toLang
        const toL = speaker === 'me' ? store.toLang : store.fromLang

        // Get translation
        const res = speaker === 'me'
            ? await TranslateService.translateVoice(null, fromL, toL)
            : await TranslateService.getPartnerReply('', fromL, toL)

        store.addMessage({
            speaker,
            sourceText: res.sourceText,
            translatedText: res.translatedText,
        })

        setActiveSpeaker(null)
    }

    return (
        <div className="pt-24 pb-48 px-6 max-w-2xl mx-auto flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 shrink-0">
                <button
                    onClick={() => navigate('/translate')}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Conversation</h1>
                    <p className="text-xs text-amber-500 font-bold">⚠️ Simulated Mode</p>
                </div>
                <button
                    onClick={() => store.clearConversation()}
                    className="text-sm text-red-400 font-bold"
                >
                    Clear
                </button>
            </div>

            {/* Language Bar */}
            <div className={`${glassClasses} p-4 rounded-2xl mb-4 flex items-center justify-between border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 shrink-0`}>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{fromFlag}</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">You</span>
                </div>
                <span className="text-slate-400">⇄</span>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{toFlag}</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">Partner</span>
                </div>
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-6 pr-2"
            >
                {store.conversation.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-4xl mb-4">💬</p>
                        <p className="text-slate-400">Tap a button below to start speaking</p>
                    </div>
                )}
                {store.conversation.map(msg => (
                    <TranslationBubble
                        key={msg.id}
                        speaker={msg.speaker}
                        sourceText={msg.sourceText}
                        translatedText={msg.translatedText}
                        fromLang={msg.speaker === 'me' ? store.fromLang : store.toLang}
                        toLang={msg.speaker === 'me' ? store.toLang : store.fromLang}
                        timestamp={msg.timestamp}
                    />
                ))}
            </div>

            {/* Bottom Mic Buttons */}
            <div className={`fixed bottom-0 left-0 right-0 p-6 ${glassClasses} border-t border-slate-200 dark:border-white/10 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-xl z-50`}>
                <div className="max-w-2xl mx-auto flex gap-4">
                    <button
                        onClick={() => handleSpeak('me')}
                        disabled={activeSpeaker !== null}
                        className={`flex-1 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${activeSpeaker === 'me'
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-accent text-white'
                            }`}
                    >
                        {fromFlag} {activeSpeaker === 'me' ? 'Listening...' : 'You'}
                    </button>
                    <button
                        onClick={() => handleSpeak('partner')}
                        disabled={activeSpeaker !== null}
                        className={`flex-1 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${activeSpeaker === 'partner'
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-slate-700 text-white'
                            }`}
                    >
                        {toFlag} {activeSpeaker === 'partner' ? 'Listening...' : 'Partner'}
                    </button>
                </div>
            </div>
        </div>
    )
}
