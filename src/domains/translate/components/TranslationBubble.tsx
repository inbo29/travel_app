import { LANGUAGES } from '@/domains/translate/types'

interface TranslationBubbleProps {
    speaker: 'me' | 'partner'
    sourceText: string
    translatedText: string
    fromLang: string
    toLang: string
    timestamp?: number
}

export function TranslationBubble({ speaker, sourceText, translatedText, fromLang, toLang, timestamp }: TranslationBubbleProps) {
    const isMe = speaker === 'me'
    const fromFlag = LANGUAGES.find(l => l.code === fromLang)?.flag || '🌐'
    const toFlag = LANGUAGES.find(l => l.code === toLang)?.flag || '🌐'

    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] space-y-2 ${isMe ? 'items-end' : 'items-start'}`}>
                {/* Source */}
                <div className={`px-5 py-3 rounded-3xl ${isMe
                        ? 'bg-accent text-white rounded-br-lg'
                        : 'bg-white dark:bg-white/10 text-slate-900 dark:text-white rounded-bl-lg border border-slate-200 dark:border-white/10'
                    }`}>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{fromFlag}</span>
                        <span className="text-[10px] font-bold opacity-60 uppercase">Original</span>
                    </div>
                    <p className="font-medium">{sourceText}</p>
                </div>

                {/* Translation */}
                <div className={`px-5 py-3 rounded-3xl ${isMe
                        ? 'bg-accent/20 text-accent-dark dark:text-accent rounded-br-lg'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/80 rounded-bl-lg'
                    }`}>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{toFlag}</span>
                        <span className="text-[10px] font-bold opacity-60 uppercase">Translation</span>
                    </div>
                    <p className="font-medium">{translatedText}</p>
                </div>

                {timestamp && (
                    <p className={`text-[10px] text-slate-400 px-2 ${isMe ? 'text-right' : 'text-left'}`}>
                        {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                )}
            </div>
        </div>
    )
}
