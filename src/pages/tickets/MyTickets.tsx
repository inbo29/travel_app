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
        <div className="pt-24 pb-40 px-6 max-w-2xl mx-auto space-y-10">
            <div className="space-y-2">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white">{t('tickets.success.viewMy')}</h1>
                <p className="text-slate-500 dark:text-white/40 font-medium">You have {MY_TICKETS.length} active tickets</p>
            </div>

            <div className="space-y-4">
                {MY_TICKETS.map(ticket => (
                    <div
                        key={ticket.id}
                        onClick={() => navigate(`/tickets/success/${ticket.id}`)}
                        className={`
                            ${glassClasses} p-6 rounded-[2.5rem] flex items-center justify-between group cursor-pointer 
                            transition-all border-slate-200 dark:border-white/10 hover:shadow-xl
                            ${ticket.status === 'used' ? 'opacity-60 grayscale' : ''}
                        `}
                    >
                        <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${ticket.status === 'used' ? 'bg-slate-200 dark:bg-white/10' : 'bg-accent/20'}`}>
                                {ticket.type === 'Performance' ? '🎫' : '🚌'}
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <p className="text-[10px] font-black text-accent uppercase tracking-widest">{ticket.type}</p>
                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${ticket.status === 'active' ? 'bg-accent/10 text-accent' : 'bg-slate-200 text-slate-500'}`}>
                                        {ticket.status}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{ticket.title}</h3>
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-slate-500 dark:text-white/40 text-[11px] font-medium">{ticket.date} • {ticket.time} • {ticket.location}</p>
                                    <p className="text-accent text-[10px] font-bold">Seat: {ticket.seat}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 dark:bg-white/5 group-hover:bg-accent group-hover:text-white transition-all">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate('/tickets')}
                className="w-full py-6 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem] text-slate-400 dark:text-white/40 font-bold hover:border-accent hover:text-accent transition-all"
            >
                + Find more events
            </button>
        </div>
    )
}
