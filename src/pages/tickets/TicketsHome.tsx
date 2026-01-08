import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'

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

    const filteredTickets = activeTab === 'all'
        ? MOCK_TICKETS
        : MOCK_TICKETS.filter(t => t.type === activeTab)

    const trendingTickets = MOCK_TICKETS.filter(t => t.trending)

    return (
        <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-10">
            {/* Header & Search */}
            <div className="space-y-4">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{t('tickets.title')}</h1>
                <div className={`${glassClasses} flex items-center gap-3 px-6 py-4 rounded-[2rem] border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5`}>
                    <span className="text-2xl">🔍</span>
                    <input
                        type="text"
                        placeholder={t('tickets.search')}
                        className="bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 flex-1 font-medium"
                    />
                </div>
            </div>

            {/* Category Chips */}
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => {
                            setActiveTab(cat)
                            navigate(`/tickets/${cat}`)
                        }}
                        className={`
                            px-8 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap
                            ${activeTab === cat
                                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                : `${glassClasses} border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/10`
                            }
                        `}
                    >
                        {t(`tickets.categories.${cat}`)}
                    </button>
                ))}
            </div>

            {/* Trending Section (Only on 'All') */}
            {activeTab === 'all' && (
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('tickets.trending')}</h2>
                        <button className="text-accent text-sm font-bold uppercase tracking-widest">{t('sections.viewAll')}</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {trendingTickets.map(ticket => (
                            <div
                                key={ticket.id}
                                onClick={() => navigate(`/tickets/detail/${ticket.id}`)}
                                className={`${glassClasses} group relative rounded-[2.5rem] overflow-hidden cursor-pointer border-white/20`}
                            >
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img
                                        src={`${import.meta.env.BASE_URL}${ticket.image}`}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                <div className="absolute top-6 left-6">
                                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-white border border-white/30">
                                        {ticket.date}
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-black text-white leading-tight">{ticket.title}</h3>
                                        <p className="text-white/70 text-sm font-medium flex items-center gap-2">
                                            📍 {ticket.location}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-accent font-black text-2xl">${ticket.price}</div>
                                        <button className="mt-2 text-[10px] font-bold uppercase bg-accent text-white px-4 py-2 rounded-lg">
                                            {t('tickets.bookNow')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Main List */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {activeTab === 'all' ? t('tickets.recommended') : t(`tickets.categories.${activeTab}`)}
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {filteredTickets.map(ticket => (
                        <div
                            key={ticket.id}
                            onClick={() => navigate(`/tickets/detail/${ticket.id}`)}
                            className={`${glassClasses} group p-4 rounded-3xl flex items-center gap-5 hover:bg-slate-50 dark:hover:bg-white/10 transition-all cursor-pointer border-slate-200 dark:border-white/10`}
                        >
                            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl shrink-0">
                                <img
                                    src={`${import.meta.env.BASE_URL}${ticket.image}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 uppercase tracking-widest">
                                        {t(`tickets.categories.${ticket.type}`)}
                                    </span>
                                    <span className="text-slate-500 dark:text-white/40 text-[10px] font-bold">• {ticket.date}</span>
                                </div>
                                <h4 className="font-bold text-lg truncate text-slate-900 dark:text-white">{ticket.title}</h4>
                                <p className="text-sm text-slate-500 dark:text-white/40 font-medium truncate">📍 {ticket.location}</p>
                            </div>
                            <div className="text-right shrink-0 px-2">
                                <div className="text-accent font-black text-lg">${ticket.price}</div>
                                <div className="text-[10px] text-slate-400 dark:text-white/30 font-bold uppercase mt-1">Per Ticket</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
