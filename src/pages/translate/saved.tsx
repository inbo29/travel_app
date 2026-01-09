import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useTranslateStore } from '@/store/translateStore'
import { LANGUAGES } from '@/domains/translate/types'

export default function SavedTranslations() {
    const navigate = useNavigate()
    const store = useTranslateStore()
    const [searchQuery, setSearchQuery] = useState('')

    const filteredHistory = store.history.filter(h =>
        h.sourceText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.translatedText.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleDelete = (id: string) => {
        if (confirm('Delete this translation?')) {
            store.removeHistory(id)
        }
    }

    const handleClearAll = () => {
        if (confirm('Clear all saved translations?')) {
            store.clearHistory()
        }
    }

    return (
        <div className="pt-24 pb-32 px-6 max-w-2xl mx-auto space-y-6">
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
                <div className="flex-1">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Saved Translations</h1>
                    <p className="text-xs text-slate-400">{store.history.length} / 50 saved</p>
                </div>
                {store.history.length > 0 && (
                    <button
                        onClick={handleClearAll}
                        className="text-sm text-red-400 font-bold"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Search */}
            <div className={`${glassClasses} flex items-center gap-3 px-5 py-4 rounded-2xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5`}>
                <span className="text-xl">🔍</span>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search translations..."
                    className="bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 flex-1 font-medium"
                />
            </div>

            {/* List */}
            {filteredHistory.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-4xl mb-4">📚</p>
                    <p className="text-slate-400 font-medium">
                        {searchQuery ? 'No matching translations found.' : 'No saved translations yet.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredHistory.map(h => {
                        const fromFlag = LANGUAGES.find(l => l.code === h.fromLang)?.flag || '🌐'
                        const toFlag = LANGUAGES.find(l => l.code === h.toLang)?.flag || '🌐'
                        return (
                            <div
                                key={h.id}
                                className={`${glassClasses} p-5 rounded-[2rem] border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">{fromFlag}</span>
                                        <span className="text-slate-400">→</span>
                                        <span className="text-sm">{toFlag}</span>
                                        <span className={`ml-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${h.mode === 'TEXT' ? 'bg-blue-100 text-blue-600' :
                                                h.mode === 'VOICE' ? 'bg-purple-100 text-purple-600' :
                                                    h.mode === 'OCR' ? 'bg-green-100 text-green-600' :
                                                        'bg-orange-100 text-orange-600'
                                            }`}>
                                            {h.mode}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(h.id)}
                                        className="text-red-400 text-sm"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <p className="font-medium text-slate-900 dark:text-white mb-2 truncate">{h.sourceText}</p>
                                <p className="text-sm text-accent truncate">{h.translatedText}</p>
                                <p className="text-[10px] text-slate-400 mt-2">
                                    {new Date(h.timestamp).toLocaleDateString()} • {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
