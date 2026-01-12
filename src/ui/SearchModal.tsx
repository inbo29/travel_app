
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
}

const MOCK_RESULTS = [
    { id: 1, type: 'guide', title: 'Hidden Valley Trek', price: '$450', match: 98 },
    { id: 2, type: 'ticket', title: 'Museum Pass', price: '$25', match: 85 },
    { id: 3, type: 'taxi', title: 'Airport Transfer', price: '$40', match: 72 },
    { id: 4, type: 'stay', title: 'Nomad Yurt Stay', price: '$25/n', match: 60 },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const { t } = useI18n()
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [results, setResults] = useState(MOCK_RESULTS)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            // Reset state
            setQuery('')
            setIsSearching(false)
            setResults(MOCK_RESULTS)
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    const handleSearch = () => {
        if (!query.trim()) return

        setIsSearching(true)

        // Simulate "Sorting/Searching" process
        const interval = setInterval(() => {
            setResults(prev => [...prev].sort(() => Math.random() - 0.5))
        }, 150)

        setTimeout(() => {
            clearInterval(interval)
            setIsSearching(false)
            onClose()
            // Navigate to a relevant detail screen (e.g., the first result mock or a generic search page)
            // For this demo, let's go to /tickets or /guides based on random choice or query
            navigate('/guides')
        }, 2000)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
        if (e.key === 'Escape') {
            onClose()
        }
    }

    if (!isOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={`relative w-full max-w-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200 ${glassClasses} rounded-3xl p-6 shadow-2xl ring-1 ring-white/20`}>

                {/* Search Input */}
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                        <svg className={`w-6 h-6 ${isSearching ? 'animate-spin text-accent' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isSearching ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            )}
                        </svg>
                    </div>
                    <input
                        autoFocus
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isSearching ? t('header.searching') : t('header.searchPlaceholder')}
                        className="w-full bg-black/5 dark:bg-white/5 border-2 border-transparent focus:border-accent/50 rounded-2xl py-4 pl-14 pr-4 text-lg outline-none text-slate-900 dark:text-white placeholder-slate-400 transition-all font-medium"
                        disabled={isSearching}
                    />
                </div>

                <div className="space-y-3 min-h-[300px]">
                    <div className="flex items-center justify-between px-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
                        <span>{isSearching ? t('header.sorting') : 'Suggested'}</span>
                        {isSearching && <span className="text-accent animate-pulse">{t('header.processing')}</span>}
                    </div>

                    <div className="grid gap-3 transition-all">
                        {results.map((item, idx) => (
                            <div
                                key={item.id}
                                className={`flex items-center gap-4 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer group ${isSearching ? 'animate-pulse' : ''}`}
                                style={{ transitionDelay: `${idx * 50}ms` }}
                                onClick={() => !isSearching && setQuery(item.title)}
                            >
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-xl">
                                    {item.type === 'guide' ? '🧭' : item.type === 'ticket' ? '🎫' : item.type === 'taxi' ? '🚕' : '🏠'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors">{item.title}</h4>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                        <span className="capitalize">{item.type}</span>
                                        <span>•</span>
                                        <span>Match: {item.match}%</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-slate-900 dark:text-white">{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex justify-end gap-2 text-xs font-medium text-slate-400">
                    <span className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded-md">{t('header.escToClose')}</span>
                    <span className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded-md">{t('header.enterToSearch')}</span>
                </div>
            </div>
        </div>,
        document.body
    )
}
