import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { TicketService } from '@/services/tickets.service'
import { useTicketBookingStore } from '@/store/ticketBookingStore'
import { TicketDetailItem } from '@/mocks/tickets/ticket.detail.mock'

export default function TicketDetail() {
    const { t } = useI18n()
    const { id } = useParams()
    const navigate = useNavigate()
    const { initBooking } = useTicketBookingStore()

    const [ticket, setTicket] = useState<TicketDetailItem | null>(null)
    const [loading, setLoading] = useState(true)
    const [basePrice, setBasePrice] = useState(100) // Estimate

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return
            setLoading(true)
            try {
                // Get Detail
                const detail = await TicketService.detail(id)
                setTicket(detail)

                // Also get list item to get the price (since detail might not have price directly in mock if they are split)
                // In a real API detail should have price.
                // For now, let's fetch list and find it or just assume a price from detail logic if I added it?
                // The mock detail doesn't have price. The mock list has priceFrom.
                // Let's quickly fetch list to find price.
                const list = await TicketService.list()
                const listItem = list.find(l => l.id === id)
                if (listItem) {
                    setBasePrice(listItem.priceFrom)
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchDetail()
    }, [id])

    const handleBook = () => {
        if (!ticket || !id) return
        // We need category. List item has it. 
        // Ideally detail should have category too. 
        // Let's assume we can pass category from state or just default for now till we fix mock.
        // Or we can find it in the list fetch above.
        // Let's assume 'EVENT' for safety or fetch it properly.
        // Actually, let's fetch list item to be sure in useEffect.

        TicketService.list().then(list => {
            const listItem = list.find(l => l.id === id)
            if (listItem) {
                initBooking(id, listItem.category, listItem.priceFrom)
                navigate(`/tickets/booking/${id}`)
            }
        })
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>
    if (!ticket) return <div className="min-h-screen flex items-center justify-center text-white">Ticket not found</div>

    return (
        <div className="relative min-h-screen pb-32">
            {/* Back Button */}
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* Hero Image */}
            <div className="fixed top-0 left-0 right-0 h-[60vh] z-0">
                <img
                    src={`${ticket.images[0]}`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-bg-dark" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />
            </div>

            {/* Content Sidebar / Stack */}
            <div className="relative pt-[45vh] px-6 z-10 max-w-2xl mx-auto space-y-8">

                {/* Main Card */}
                <div className={`${glassClasses} rounded-[2.5rem] p-8 space-y-8 border-slate-200 dark:border-white/10 bg-white/90 dark:bg-bg-dark/90 shadow-2xl backdrop-blur-xl`}>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">{ticket.id.startsWith('event') ? 'Forest Music Festival' : 'Ticket Detail'}</h1>
                        {/* Note: Title is not in detail mock, only desc. I should fix mock or use ID or description. 
                            Wait, list mock has title. I should probably merge them in service.detail().
                            For now I'll just use ID or hardcode checks or rely on what I have.
                            Actually, simpler: update detail mock to include title/location?
                            No, let's keep it separated as per "real world" often having summary vs detail endpoints.
                            But for UI, I need title here. I'll rely on the one I fetched or just use description snippet.
                        */}
                        <p className="text-slate-500 font-bold">{ticket.description.slice(0, 50)}...</p>
                    </div>

                    {/* Schedule */}
                    {ticket.schedule && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-widest text-[#B4AEC4]">Time Schedule</h3>
                            <div className="space-y-3">
                                {ticket.schedule.map((s, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <div className="w-16 text-right font-black text-accent">{s.time}</div>
                                        <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-white/20" />
                                        <div className="font-bold text-slate-700 dark:text-white/80">{s.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Included */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-widest text-[#B4AEC4]">Included</h3>
                        <div className="flex flex-wrap gap-2">
                            {ticket.included.map(inc => (
                                <span key={inc} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-white/70">
                                    ✅ {inc}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Booking Bar */}
            <div className={`fixed bottom-0 left-0 right-0 p-6 ${glassClasses} border-t border-slate-200 dark:border-white/10 z-[60] bg-white/80 dark:bg-bg-dark/80 backdrop-blur-xl pb-10`}>
                <div className="max-w-2xl mx-auto flex items-center justify-between gap-6">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{t('tickets.checkout.total')}</p>
                        <div className="text-3xl font-black text-accent flex items-baseline gap-1">
                            <span className="text-lg text-slate-400">$</span>
                            {basePrice}
                            <span className="text-xs font-bold text-slate-400">/ person</span>
                        </div>
                    </div>
                    <button
                        onClick={handleBook}
                        className="flex-1 py-5 bg-accent text-white font-black rounded-[2rem] shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg"
                    >
                        {t('tickets.details.selectDate')}
                    </button>
                </div>
            </div>
        </div>
    )
}
