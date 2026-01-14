import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { getTours } from '@/services/tours.service'
import { getGuides } from '@/services/guides.service'
import { Tour } from '@/types/tour'
import { Guide } from '@/types/guide'
import { TourCard } from '@/domains/tours'
import { GuideCard } from '@/domains/guides'

const TABS = ['all', 'tours', 'guides', 'interpreter']

export default function GuidesLanding() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTab, setActiveTab] = useState('all')
    const [tours, setTours] = useState<Tour[]>([])
    const [guides, setGuides] = useState<Guide[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const [toursData, guidesData] = await Promise.all([
                getTours(),
                getGuides()
            ])
            setTours(toursData)
            setGuides(guidesData)
            setLoading(false)
        }
        fetchData()
    }, [])

    const filteredItems = useMemo(() => {
        const tourItems = tours.map(t => ({ ...t, itemType: 'tour' as const }))
        const guideItems = guides.map(g => ({ ...g, itemType: 'guide' as const }))

        // Mock Interpreters for the list
        const interpreters = [
            {
                id: 'int1',
                name: 'Professional Translation Service',
                itemType: 'interpreter' as const,
                languages: ['English', 'Mongolian', 'Korean'],
                price: 50,
                rating: 5.0,
                description: 'Certified document and on-site interpretation'
            }
        ]

        let combined: any[] = []
        if (activeTab === 'all' || activeTab === 'tours') combined.push(...tourItems)
        if (activeTab === 'all' || activeTab === 'guides') combined.push(...guideItems)
        if (activeTab === 'all' || activeTab === 'interpreter') combined.push(...interpreters)

        if (!searchQuery) return combined

        const q = searchQuery.toLowerCase()
        return combined.filter(item => {
            const searchSource = item.itemType === 'tour' ? item.title : item.name
            const locationSource = item.location || ''
            return searchSource.toLowerCase().includes(q) || locationSource.toLowerCase().includes(q)
        })
    }, [searchQuery, activeTab])

    return (
        <div className="relative min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 bg-pattern-dark opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

            <main className="relative z-10 pt-20 md:pt-24 max-w-7xl mx-auto px-4 md:px-6 pb-32">
                <div className="space-y-10 animate-fade-in">
                    {/* Header: Title & Description */}
                    <header className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Guides & Tours
                        </h1>
                        <p className="text-slate-500 dark:text-white/50 font-medium italic">
                            Find your perfect companion for the journey
                        </p>
                    </header>

                    {/* Search & Global Filter Bar */}
                    <div className="sticky top-16 z-20 py-4 -mx-4 px-4 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                            {/* Search Input */}
                            <div className={`${glassClasses} flex items-center gap-3 px-5 py-3 rounded-2xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex-1 max-w-xl`}>
                                <span className="text-xl opacity-50"></span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search location, name or keywords..."
                                    className="bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 flex-1 font-semibold"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">✕</button>
                                )}
                            </div>

                            {/* Sort Filter */}
                            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                                {['All', 'Price Low', 'Latest', 'Popular'].map((filter) => (
                                    <button
                                        key={filter}
                                        className={`px-5 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all border
                                            ${filter === 'All'
                                                ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                                                : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/10'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tabs & Quick Filters */}
                        <div className="flex gap-3 overflow-x-auto no-scrollbar">
                            {TABS.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`
                                        px-6 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all whitespace-nowrap border
                                        ${activeTab === tab
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg'
                                            : 'bg-transparent border-slate-200 dark:border-white/20 text-slate-500 dark:text-white/50 hover:border-slate-400 dark:hover:border-white/50'
                                        }
                                    `}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Unified List Grid */}
                    {loading ? (
                        <div className="py-32 text-center">
                            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                            <p className="text-sub-light dark:text-sub-dark font-bold text-lg">Finding best guides...</p>
                        </div>
                    ) : (
                        <section className="space-y-8 animate-fade-in-up">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {filteredItems.map(item => {
                                    if (item.itemType === 'tour') return <TourCard key={item.id} tour={item} />
                                    if (item.itemType === 'guide') return <GuideCard key={item.id} guide={item} />

                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => navigate('/guides/interpreter')}
                                            className={`${glassClasses} p-8 rounded-[2.5rem] border-white/20 hover:scale-[1.05] hover:shadow-2xl transition-all duration-500 cursor-pointer group flex flex-col justify-between h-full space-y-6 relative overflow-hidden`}
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />

                                            <div className="space-y-6">
                                                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg ring-4 ring-white/10">
                                                    🎤
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{item.name}</h3>
                                                    <p className="text-slate-500 dark:text-white/50 font-medium line-clamp-3">{item.description}</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center text-accent font-black text-lg pt-4 border-t border-slate-100 dark:border-white/5">
                                                <span>${item.price}<span className="text-[10px] text-slate-400 font-bold ml-1">/HR</span></span>
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                                                    <span className="text-sm">⭐</span>
                                                    <span className="text-sm">{item.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                {filteredItems.length === 0 && (
                                    <div className="col-span-full text-center py-32 space-y-6 bg-slate-50/50 dark:bg-white/[0.02] rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10">
                                        <div className="text-8xl animate-bounce grayscale opacity-30">🔍</div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No matches found</h3>
                                            <p className="text-slate-500 dark:text-white/40 font-medium">Try adjusting your search or category</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Pagination Controls */}
                            {filteredItems.length > 0 && (
                                <div className="flex items-center justify-center gap-2 pt-12">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 opacity-50 cursor-not-allowed">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    {[1, 2, 3].map(page => (
                                        <button
                                            key={page}
                                            className={`w-10 h-10 rounded-xl font-black text-sm transition-all
                                                ${page === 1
                                                    ? 'bg-accent text-white shadow-md'
                                                    : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-white/10'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </main>
        </div>
    )
}
