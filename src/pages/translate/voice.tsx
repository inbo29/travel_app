import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useTranslateStore } from '@/store/translateStore'
import { TranslateService } from '@/services/translate.service'
import { LanguageSelector } from '@/domains/translate/components/LanguageSelector'
import { LANGUAGES } from '@/domains/translate/types'

export default function VoiceTranslate() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const store = useTranslateStore()
    const [isListening, setIsListening] = useState(false)
    const [result, setResult] = useState<{ source: string; translated: string } | null>(null)

    const fromFlag = LANGUAGES.find(l => l.code === store.fromLang)?.flag || '🌐'
    const toFlag = LANGUAGES.find(l => l.code === store.toLang)?.flag || '🌐'

    const handleMicPress = async () => {
        setIsListening(true)
        setResult(null)

        // Simulate listening for 2 seconds
        await new Promise(r => setTimeout(r, 2000))
        setIsListening(false)

        // Get simulated translation
        const res = await TranslateService.translateVoice(null, store.fromLang, store.toLang)
        setResult({ source: res.sourceText, translated: res.translatedText })
    }

    const handleSave = () => {
        if (!result) return
        store.addHistory({
            sourceText: result.source,
            translatedText: result.translated,
            fromLang: store.fromLang,
            toLang: store.toLang,
            context: store.context,
            mode: 'VOICE',
        })
        // Show feedback
        alert(t('translate.saveBtn') + '!')
    }

    return (
        <div className="pt-24 pb-32 px-6 max-w-2xl mx-auto space-y-8 min-h-screen flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/translate')}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">{t('translate.voice.title')}</h1>
                    <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">⚠️ {t('translate.voice.simulated')}</p>
                </div>
            </div>

            {/* Language Selectors */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
                <LanguageSelector
                    value={store.fromLang}
                    onChange={(code) => store.setLanguages(code, store.toLang)}
                    label={t('translate.voice.speak')}
                />
                <button
                    onClick={() => store.swapLanguages()}
                    className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 transition-all mb-1 shadow-sm shadow-accent/5"
                >
                    ⇄
                </button>
                <LanguageSelector
                    value={store.toLang}
                    onChange={(code) => store.setLanguages(store.fromLang, code)}
                    label={t('translate.voice.translateTo')}
                />
            </div>

            {/* Result Display */}
            {result && (
                <div className="space-y-4">
                    <div className={`${glassClasses} p-6 rounded-3xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-xl shadow-black/5`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span>{fromFlag}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('translate.voice.recognized')}</span>
                        </div>
                        <p className="text-lg font-medium text-slate-900 dark:text-white leading-relaxed">{result.source}</p>
                    </div>
                    <div className={`${glassClasses} p-6 rounded-3xl border-accent/20 bg-accent/5 shadow-xl shadow-accent/5`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span>{toFlag}</span>
                            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{t('translate.voice.translation')}</span>
                        </div>
                        <p className="text-lg font-medium text-slate-900 dark:text-white leading-relaxed">{result.translated}</p>
                        <button
                            onClick={handleSave}
                            className="mt-4 w-full py-4 rounded-xl bg-accent text-white font-bold shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            ⭐ {t('translate.saveBtn')}
                        </button>
                    </div>
                </div>
            )}

            {/* Mic Button */}
            <div className="flex-1 flex items-center justify-center">
                <button
                    onClick={handleMicPress}
                    disabled={isListening}
                    className={`w-40 h-40 rounded-full flex items-center justify-center text-6xl transition-all shadow-2xl ${isListening
                        ? 'bg-red-500 animate-pulse scale-110'
                        : 'bg-accent hover:scale-105'
                        }`}
                >
                    🎙️
                </button>
            </div>

            <p className="text-center text-slate-400 font-bold tracking-tight py-4">
                {isListening ? t('translate.voice.listening') : t('translate.voice.tapToStart')}
            </p>
        </div>
    )
}
