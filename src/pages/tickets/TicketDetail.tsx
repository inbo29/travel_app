import { useNavigate, useParams } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'

const MOCK_TICKETS = {
    'p1': {
        id: 'p1',
        title: 'Summer Solstice Festival',
        date: 'JUN 21',
        time: '18:00 - 02:00',
        location: 'Central Park, NY',
        price: 50,
        provider: 'Trap Me Events',
        image: 'nature/nt2.png',
        rating: 4.8,
        reviews: 3200,
        description: 'Experience the magic of nature combined with electronic beats. The Summer Solstice Festival brings together top artists for an unforgettable night under the stars.',
    },
    'p2': {
        id: 'p2',
        title: 'Forest Music Festival 2024',
        date: 'OCT 12',
        time: '14:00 - 23:00',
        location: 'Redwood National Park',
        price: 120,
        provider: 'Eco Sound',
        image: 'nature/nt1.png',
        rating: 4.9,
        reviews: 1540,
        description: 'Join us at the heart of the forest for a sustainable music experience. Acoustic sets and folk tunes echo through the ancient redwoods.',
    }
}

export default function TicketDetail() {
    const { t } = useI18n()
    const { id } = useParams()
    const navigate = useNavigate()

    const ticket = MOCK_TICKETS[id as keyof typeof MOCK_TICKETS] || MOCK_TICKETS['p1']

    return (
        <div className="relative min-h-screen">
            {/* Hero Image */}
            <div className="fixed top-0 left-0 right-0 h-[50vh] z-0">
                <img
                    src={`${import.meta.env.BASE_URL}${ticket.image}`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-bg-bg-dark" />
            </div>

            {/* Content Sidebar / Stack */}
            <div className="relative pt-[40vh] px-6 pb-40 z-10 max-w-2xl mx-auto">
                {/* Header Actions */}
                <div className="absolute top-10 left-6 right-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex gap-3">
                        <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">❤️</button>
                        <button className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">📤</button>
                    </div>
                </div>

                {/* Main Card */}
                <div className={`${glassClasses} rounded-[3rem] p-8 space-y-8 border-slate-200 dark:border-white/20 bg-white/80 dark:bg-bg-bg-dark/50 shadow-2xl`}>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-accent">★</span>
                            <span className="text-slate-900 dark:text-white font-bold">{ticket.rating}</span>
                            <span className="text-slate-500 dark:text-white/40 text-sm">({ticket.reviews} reviews)</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">{ticket.title}</h1>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-slate-600 dark:text-white/70">
                                <span className="text-xl">📅</span>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-400 dark:text-white/30">Date</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{ticket.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 dark:text-white/70">
                                <span className="text-xl">📍</span>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-400 dark:text-white/30">Location</p>
                                    <p className="font-bold text-slate-900 dark:text-white truncate">{ticket.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('tickets.details.about')}</h3>
                        <p className="text-slate-600 dark:text-white/60 leading-relaxed font-medium">
                            {ticket.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-2xl">👤</div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{t('tickets.details.provider')}</p>
                            <p className="font-bold text-slate-900 dark:text-white">{ticket.provider}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Booking Bar */}
            <div className={`fixed bottom-0 left-0 right-0 p-8 ${glassClasses} border-t border-slate-200 dark:border-white/10 z-[60] bg-white/80 dark:bg-bg-bg-dark/80 backdrop-blur-xl`}>
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{t('tickets.checkout.total')}</p>
                        <div className="text-3xl font-black text-accent">${ticket.price}</div>
                    </div>
                    <button
                        onClick={() => navigate(`/tickets/options/${ticket.id}`)}
                        className="px-12 py-5 bg-accent text-white font-bold rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        {t('tickets.details.selectDate')}
                    </button>
                </div>
            </div>
        </div>
    )
}
