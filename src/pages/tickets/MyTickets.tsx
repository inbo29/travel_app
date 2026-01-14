import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'

export default function MyTickets() {
    const { t } = useI18n()
    const navigate = useNavigate()

    const MY_TICKETS = [
        {
            id: 'conf-123',
            title: 'Forest Music Festival',
            date: 'OCT 12',
            time: '19:00',
            location: 'NY',
            type: 'Performance',
            seat: 'VIP - Sec A',
            status: 'active'
        },
        {
            id: 'conf-456',
            title: 'Express Bus (UB-ER)',
            date: 'OCT 15',
            time: '08:30',
            location: 'Dragon Terminal',
            type: 'Bus',
            seat: 'Plate 54-12',
            status: 'used'
        }
    ]

    return (
        <div className="relative min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 bg-pattern-dark opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

            <main className="relative z-10 pt-20 md:pt-24 max-w-7xl mx-auto px-4 md:px-6 pb-32">
                <div className="max-w-3xl mx-auto space-y-10 animate-fade-in">
                    {/* Header: Title & Description */}
                    <header className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            {t('tickets.success.viewMy')}
                        </h1>
                        <p className="text-slate-500 dark:text-white/40 font-medium italic">
                            You have {MY_TICKETS.length} active tickets
                        </p>
                    </header>

                    {/* Ticket List */}
                    <div className="space-y-6">
                        {MY_TICKETS.map(ticket => (
                            <div
                                key={ticket.id}
                                onClick={() => navigate(`/tickets/success/${ticket.id}`)}
                                className={`
                                    ${glassClasses} p-8 rounded-[2.5rem] flex flex-col sm:flex-row items-stretch sm:items-center justify-between group cursor-pointer 
                                    transition-all duration-500 border border-white/20 dark:border-white/5 bg-white/70 dark:bg-white/5 hover:shadow-2xl hover:scale-[1.02]
                                    ${ticket.status === 'used' ? 'opacity-50 grayscale scale-95' : ''}
                                `}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${ticket.status === 'used' ? 'bg-slate-200 dark:bg-white/10' : 'bg-accent/20 ring-4 ring-accent/5'}`}>
                                        {ticket.type === 'Performance' ? '🎫' : '🚌'}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <p className="text-[10px] font-black text-accent uppercase tracking-widest">{ticket.type}</p>
                                            <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-wider ${ticket.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{ticket.title}</h3>
                                        <div className="flex flex-col gap-0.5">
                                            <p className="text-slate-500 dark:text-white/40 text-[12px] font-bold">{ticket.date} • {ticket.time} • {ticket.location}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-accent text-[10px] font-black uppercase tracking-wider">Seat: {ticket.seat}</span>
                                                <span className="w-1 h-1 bg-slate-300 dark:bg-white/20 rounded-full"></span>
                                                <span className="text-slate-400 text-[10px] font-bold">Ref: {ticket.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 sm:mt-0 flex items-center justify-end sm:block">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:bg-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent/30 transition-all duration-500">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate('/tickets')}
                        className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem] text-slate-400 dark:text-white/30 font-black text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent hover:bg-accent/5 transition-all active:scale-95"
                    >
                        + Find more adventures
                    </button>

                    <div className="h-20" />
                </div>
            </main>
        </div>
    )
}
