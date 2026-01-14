import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { TicketService } from '@/services/tickets.service'

const CATEGORIES = ['all', 'performance', 'bus', 'train', 'flight', 'museum']

const MOCK_TICKETS = [
    {
        id: 'p1',
        type: 'performance',
        title: 'Summer Solstice Festival',
        date: 'JUN 21',
        location: 'Central Park, NY',
        price: 50,
        currency: 'USD',
        provider: 'Trap Me Events',
        image: 'nature/nt2.png',
        trending: true,
    },
    {
        id: 'p2',
        type: 'performance',
        title: 'Forest Music Festival 2024',
        date: 'OCT 12',
        location: 'Redwood National Park',
        price: 120,
        currency: 'USD',
        provider: 'Eco Sound',
        image: 'nature/nt1.png',
        trending: true,
    },
    {
        id: 'b1',
        type: 'bus',
        title: 'Ulaanbaatar to Terelj',
        date: 'Daily',
        location: 'Dragon Terminal',
        price: 15,
        currency: 'USD',
        provider: 'National Bus',
        image: 'city/ct1.png',
        trending: false,
    },
    {
        id: 't1',
        type: 'train',
        title: 'Trans-Siberian Express',
        date: 'Weekly',
        location: 'Main Station',
        price: 450,
        currency: 'USD',
        provider: 'Railway Co',
        image: 'nature/nt3.png',
        trending: false,
    },
]

export default function TicketsHome() {
    const { t } = useI18n()
    const { type = 'all' } = useParams()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(type)

    // Data State
    const [tickets, setTickets] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    // Fetch Tickets
    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true)
            try {
                // For 'all' tab, we pass undefined or 'all' to service
                // If query is empty, it returns list. Service handles delay.
                const data = await TicketService.list(searchQuery, activeTab === 'all' ? undefined : activeTab)
                setTickets(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        // Debounce
        const timer = setTimeout(fetchTickets, 300)
        return () => clearTimeout(timer)
    }, [activeTab, searchQuery])

    // Update active tab when URL param changes
    useEffect(() => {
        if (type) setActiveTab(type)
    }, [type])

    const trendingTickets = tickets.filter(t => t.trending)

    return (
        <div className="relative min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 bg-pattern-dark opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

            <main className="relative z-10 pt-20 md:pt-24 max-w-7xl mx-auto px-4 md:px-6 pb-32">
                <div className="space-y-10 animate-fade-in">
                    {/* Header: Title & Description */}
                    <header className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Tickets
                        </h1>
                        <p className="text-slate-500 dark:text-white/50 font-medium">
                            Discover events, transport, and local experiences
                        </p>
                    </header>

                    {/* Search & Global Filter Bar (Sticky on mobile/tablet) */}
                    <div className="sticky top-16 z-20 py-4 -mx-4 px-4 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                            {/* Search Input */}
                            <div className={`${glassClasses} flex items-center gap-3 px-5 py-3 rounded-2xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex-1 max-w-xl`}>
                                <span className="text-xl opacity-50">🔍</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search tickets, places..."
                                    className="bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 flex-1 font-semibold"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">✕</button>
                                )}
                            </div>

                            {/* Sort Filter (Placeholder functionality) */}
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
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

                        {/* Category Chips */}
                        <div className="flex gap-3 overflow-x-auto no-scrollbar">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveTab(cat)
                                        navigate(`/tickets/${cat}`)
                                    }}
                                    className={`
                                        px-6 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all whitespace-nowrap border
                                        ${activeTab === cat
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
                                            : 'bg-transparent border-slate-200 dark:border-white/20 text-slate-500 dark:text-white/50 hover:border-slate-400 dark:hover:border-white/50'
                                        }
                                    `}
                                >
                                    {t(`tickets.categories.${cat}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-32 text-center">
                            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                            <p className="text-sub-light dark:text-sub-dark font-bold text-lg">Finding best tickets...</p>
                        </div>
                    ) : (
                        <section className="space-y-8 animate-fade-in-up">
                            {/* Section Title */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {searchQuery
                                        ? `Search Results for "${searchQuery}"`
                                        : (activeTab === 'all' ? t('tickets.recommended') : t(`tickets.categories.${activeTab}`))
                                    }
                                </h2>
                                <span className="text-xs font-bold text-slate-400 dark:text-white/30 truncate max-w-[150px]">
                                    {tickets.length} results found
                                </span>
                            </div>

                            {tickets.length === 0 ? (
                                <div className="text-center py-32 bg-slate-50/50 dark:bg-white/[0.02] rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10 backdrop-blur-sm">
                                    <div className="text-6xl mb-6 grayscale opacity-30">🔍</div>
                                    <p className="font-black text-xl text-slate-900 dark:text-white mb-2">No tickets found</p>
                                    <p className="text-slate-500 text-sm font-medium">Try exploring different categories or keywords.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                    {tickets.map(ticket => (
                                        <div
                                            key={ticket.id}
                                            onClick={() => navigate(`/tickets/detail/${ticket.id}`)}
                                            className={`${glassClasses} group rounded-[2.5rem] overflow-hidden bg-white/70 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-sm hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-500 cursor-pointer flex flex-col`}
                                        >
                                            <div className="aspect-[1.1] relative overflow-hidden">
                                                <img
                                                    src={`${import.meta.env.BASE_URL}${ticket.image}`}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                    alt={ticket.title}
                                                />
                                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-white border border-white/20 uppercase tracking-widest">
                                                    {t(`tickets.categories.${ticket.category.toLowerCase()}`) || ticket.category}
                                                </div>
                                                {ticket.trending && (
                                                    <div className="absolute top-4 left-4 bg-accent px-3 py-1 round-full text-[10px] font-black text-white shadow-lg animate-pulse">
                                                        HOT
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-[0.1em]">
                                                        <span>📅 {Array.isArray(ticket.dateRange) ? ticket.dateRange[0] : ticket.dateRange}</span>
                                                        <span className="opacity-30">•</span>
                                                        <span className="truncate">📍 {ticket.location}</span>
                                                    </div>
                                                    <h4 className="font-black text-xl text-slate-900 dark:text-white leading-tight group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem]">
                                                        {ticket.title}
                                                    </h4>
                                                </div>

                                                <div className="flex items-end justify-between pt-2">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest mb-0.5">Price from</p>
                                                        <div className="text-2xl font-black text-accent">${ticket.priceFrom}</div>
                                                    </div>
                                                    <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination Controls */}
                            {tickets.length > 0 && (
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
