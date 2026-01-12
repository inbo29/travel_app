import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { useExploreMapStore, Category } from '@/store/exploreMapStore'
import { glassClasses } from '@/styles/glass'

const CATEGORIES: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: '🔍' },
    { id: 'restaurant', label: 'Restaurants', icon: '🍽️' },
    { id: 'cafe', label: 'Cafes', icon: '☕' },
    { id: 'hotel', label: 'Hotels', icon: '🏨' },
    { id: 'attraction', label: 'Attractions', icon: '📍' },
    { id: 'museum', label: 'Museums', icon: '🏛️' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
]

export default function MapPage() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Store Connection
    const {
        searchQuery,
        setSearchQuery,
        activeCategory,
        setCategory,
        selectedPOI,
        selectPOI,
        showDangerZones,
        toggleDangerZones
    } = useExploreMapStore()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className="h-screen w-full relative pointer-events-none">
            {/* Top Area: Search & Filters (Pointer Events Auto) */}
            <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-col gap-3 pointer-events-auto">

                {/* Search Bar - Google Maps Style */}
                <div className="bg-white dark:bg-bg-dark rounded-full shadow-lg flex items-center p-3 gap-3 border border-slate-100 dark:border-white/10 max-w-md">
                    <button onClick={() => navigate('/home')} className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors">
                        <svg className="w-5 h-5 text-slate-500 dark:text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder={t('header.searchPlaceholder')}
                        className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white text-sm font-medium placeholder:text-slate-400"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-600">✕</button>
                    )}
                    <button className="p-2 bg-accent/10 rounded-full text-accent">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                {/* Filter Chips - Horizontal Scroll */}
                <div
                    ref={scrollContainerRef}
                    className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 max-w-full md:max-w-md mask-linear-fade"
                >
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`
                                flex-none px-4 py-2 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-2 whitespace-nowrap
                                ${activeCategory === cat.id
                                    ? 'bg-accent text-white'
                                    : 'bg-white dark:bg-bg-dark text-slate-600 dark:text-white/80 border border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'}
                            `}
                        >
                            <span>{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Map Layers Control (Top Right) */}
            <div className="absolute top-24 right-4 z-[1000] pointer-events-auto flex flex-col gap-2">
                <button
                    onClick={() => toggleDangerZones(!showDangerZones)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl border-2 transition-all ${showDangerZones ? 'bg-red-500 border-red-400 text-white animate-pulse' : 'bg-white dark:bg-bg-dark border-white/10 text-slate-400'}`}
                    title="Toggle Danger Zones"
                >
                    <span className="text-xl">⚠️</span>
                </button>
            </div>

            {/* Bottom Sheet: Selected Place Details */}
            {selectedPOI && (
                <div className="absolute bottom-6 left-4 right-4 md:left-6 md:w-96 md:bottom-auto md:top-24 z-[1000] pointer-events-auto animate-slide-up">
                    <div className={`${glassClasses} p-0 rounded-3xl bg-white/90 dark:bg-bg-dark/95 shadow-2xl overflow-hidden border-slate-200 dark:border-white/10`}>
                        {/* Image Placeholder */}
                        <div className="h-32 bg-slate-200 dark:bg-white/5 relative">
                            <button
                                onClick={() => selectPOI(null)}
                                className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-colors"
                            >
                                ✕
                            </button>
                            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/50 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur">
                                {selectedPOI.category}
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{selectedPOI.name}</h3>
                                {selectedPOI.address && <p className="text-sm text-slate-500 mt-1">{selectedPOI.address}</p>}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <span className="text-accent text-sm">★</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{selectedPOI.rating || 'N/A'}</span>
                                    <span className="text-slate-400 text-xs">(128 reviews)</span>
                                </div>
                                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="text-green-500 text-xs font-bold">Open Now</span>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 py-3 bg-accent text-white rounded-xl font-bold text-sm shadow-md shadow-accent/20 hover:scale-[1.02] transition-transform">
                                    Directions
                                </button>
                                <button className="flex-1 py-3 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
