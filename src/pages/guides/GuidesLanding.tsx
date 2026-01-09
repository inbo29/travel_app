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
        <div className="min-h-screen pt-24 pb-32 px-6">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Search Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto relative">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 top-2 w-10 h-10 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all md:hidden"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight pt-12 md:pt-0">
                        Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">Guide / Tour</span>
                    </h1>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search location, name or keywords..."
                            className="w-full h-18 bg-white dark:bg-white/5 backdrop-blur-3xl border-2 border-slate-200/50 dark:border-white/10 rounded-3xl pl-16 pr-8 text-xl focus:border-accent outline-none transition-all shadow-2xl shadow-black/5 dark:text-white"
                        />
                    </div>
                </div>

                {/* Tabs & Quick Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                px-8 py-3.5 rounded-2xl font-black capitalize transition-all duration-300
                                ${activeTab === tab
                                    ? 'bg-accent text-white shadow-xl shadow-accent/30 scale-105'
                                    : 'bg-white/50 dark:bg-white/5 text-slate-500 dark:text-white/40 hover:bg-white dark:hover:bg-white/10 border border-slate-200 dark:border-white/5'
                                }
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Unified List Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map(item => {
                            if (item.itemType === 'tour') return <TourCard key={item.id} tour={item} />
                            if (item.itemType === 'guide') return <GuideCard key={item.id} guide={item} />

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => navigate('/guides/interpreter')}
                                    className={`${glassClasses} p-8 rounded-[2.5rem] border-white/20 hover:scale-[1.02] transition-all cursor-pointer group space-y-6`}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                                        🎤
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">{item.name}</h3>
                                        <p className="text-slate-500 dark:text-white/50 font-medium">{item.description}</p>
                                    </div>
                                    <div className="flex justify-between items-center text-accent font-black text-lg">
                                        <span>${item.price}/hr</span>
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                                            <span>⭐</span>
                                            <span>{item.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        {filteredItems.length === 0 && (
                            <div className="col-span-full text-center py-32 space-y-6">
                                <div className="text-8xl animate-bounce">🔍</div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No matches found</h3>
                                    <p className="text-slate-500 dark:text-white/40">Try adjusting your search or category</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
