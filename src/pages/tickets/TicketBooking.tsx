import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useTicketBookingStore } from '@/store/ticketBookingStore'
import { TicketService } from '@/services/tickets.service'
import { TicketDetailItem } from '@/mocks/tickets/ticket.detail.mock'
import { TicketRule } from '@/mocks/tickets/rules'
import { useState } from 'react'

export default function TicketBooking() {
    const { t } = useI18n()
    const { id } = useParams()
    const navigate = useNavigate()
    const store = useTicketBookingStore()

    const [rule, setRule] = useState<TicketRule | null>(null)
    const [detail, setDetail] = useState<TicketDetailItem | null>(null)
    const [loading, setLoading] = useState(true)

    // Verify booking session
    useEffect(() => {
        if (!store.ticketId || store.ticketId !== id) {
            // If store doesn't match ID, redirect to detail (or re-init if we had logic)
            // For safety, force back to detail to re-init
            navigate(`/tickets/detail/${id}`, { replace: true })
            return
        }

        const fetchRule = async () => {
            if (store.category) {
                const r = TicketService.getRule(store.category)
                setRule(r)
                const d = await TicketService.detail(id!)
                setDetail(d)
                setLoading(false)
            }
        }
        fetchRule()
    }, [id, store.ticketId, store.category, navigate])

    if (loading || !rule || !detail) return <div className="min-h-screen flex items-center justify-center text-white">Loading booking info...</div>

    return (
        <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto space-y-8 min-h-screen">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => store.step === 1 ? navigate(-1) : store.setStep(store.step - 1)}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Booking: {detail.id}</h1>
                    <p className="text-sm text-slate-500 dark:text-white/60 font-bold">Step {store.step} of {rule.seatSelection ? 3 : 2}</p>
                </div>
            </div>

            {/* Step Content */}
            <div className={`${glassClasses} bg-white/90 dark:bg-bg-dark/90 p-8 rounded-[3rem] shadow-2xl border-slate-200 dark:border-white/10`}>
                {store.step === 1 && (
                    <StepDateSelection rule={rule} store={store} onNext={() => store.setStep(2)} />
                )}
                {store.step === 2 && (
                    rule.seatSelection
                        ? <StepSeatSelection store={store} onNext={() => store.setStep(3)} />
                        : <StepReview store={store} detail={detail} />
                )}
                {store.step === 3 && rule.seatSelection && (
                    <StepReview store={store} detail={detail} />
                )}
            </div>
        </div>
    )
}

function StepDateSelection({ rule, store, onNext }: { rule: TicketRule, store: any, onNext: () => void }) {
    // Mock Dates
    const dates = ['Today', 'Tomorrow', 'In 2 days']

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Select Date</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dates.map((d, i) => {
                    const dateStr = new Date(Date.now() + i * 86400000).toISOString().split('T')[0]
                    return (
                        <button
                            key={d}
                            onClick={() => store.setDate(dateStr)}
                            className={`p-6 rounded-3xl border-2 transition-all text-left ${store.selectedDate === dateStr ? 'border-accent bg-accent/10' : 'border-slate-100 dark:border-white/10 hover:border-accent/50'}`}
                        >
                            <p className="text-xs font-bold text-slate-400 uppercase">{d}</p>
                            <p className="text-lg font-black text-slate-900 dark:text-white">{dateStr}</p>
                        </button>
                    )
                })}
            </div>

            {rule.roundTrip && (
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <label className="flex items-center gap-4 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-6 h-6 rounded-md accent-accent"
                            checked={!!store.returnDate}
                            onChange={(e) => store.setReturnDate(e.target.checked ? '2024-12-31' : null)} // Mock return date
                        />
                        <span className="font-bold text-slate-900 dark:text-white">Add Return Trip (Double Price)</span>
                    </label>
                </div>
            )}

            <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white">Passengers</h3>
                <div className="flex items-center gap-4">
                    <button onClick={() => store.setPassengers(Math.max(1, store.passengers - 1))} className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 font-black">-</button>
                    <span className="text-2xl font-black w-10 text-center">{store.passengers}</span>
                    <button onClick={() => store.setPassengers(store.passengers + 1)} className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 font-black">+</button>
                </div>
            </div>

            <button
                onClick={onNext}
                disabled={!store.selectedDate}
                className="w-full py-5 rounded-2xl bg-accent text-white font-black text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next Step
            </button>
        </div>
    )
}

function StepSeatSelection({ store, onNext }: { store: any, onNext: () => void }) {
    // Mock Seat Grid
    const rows = 5
    const cols = 4

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Select Seats</h2>
            <p className="text-slate-500">Select {store.passengers} seats.</p>

            <div className="flex justify-center gap-2 mb-8">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-slate-200 dark:bg-white/10" /> <span className="text-xs font-bold">Available</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-accent" /> <span className="text-xs font-bold">Selected</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-slate-800 dark:bg-black/50" /> <span className="text-xs font-bold">Taken</span></div>
            </div>

            <div className="grid gap-4 max-w-sm mx-auto">
                {Array.from({ length: rows }).map((_, r) => (
                    <div key={r} className="flex gap-4 justify-center">
                        {Array.from({ length: cols }).map((_, c) => {
                            const seatId = `${r}-${c}`
                            const isSelected = store.selectedSeats.includes(seatId)
                            return (
                                <button
                                    key={c}
                                    onClick={() => store.toggleSeat(seatId)}
                                    className={`
                                        w-12 h-12 rounded-xl font-bold text-xs transition-all flex items-center justify-center
                                        ${isSelected ? 'bg-accent text-white shadow-lg scale-110' : 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20'}
                                    `}
                                >
                                    {String.fromCharCode(65 + c)}{r + 1}
                                </button>
                            )
                        })}
                    </div>
                ))}
            </div>

            <button
                onClick={onNext}
                disabled={store.selectedSeats.length === 0} // Ideally match passenger count
                className="w-full py-5 rounded-2xl bg-accent text-white font-black text-xl disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
                Confirm Seats
            </button>
        </div>
    )
}

function StepReview({ store, detail }: { store: any, detail: any }) {
    const navigate = useNavigate()

    const handlePay = () => {
        // Assume payment success for mock
        navigate(`/tickets/success/${store.ticketId}`)
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Review & Pay</h2>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
                    <span className="font-bold text-slate-500">Ticket</span>
                    <span className="font-black text-slate-900 dark:text-white text-right">{detail.id}</span>
                    {/* Ideally Title */}
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
                    <span className="font-bold text-slate-500">Date</span>
                    <span className="font-black text-slate-900 dark:text-white">{store.selectedDate}</span>
                </div>
                {store.returnDate && (
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
                        <span className="font-bold text-slate-500">Return</span>
                        <span className="font-black text-slate-900 dark:text-white">{store.returnDate}</span>
                    </div>
                )}
                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
                    <span className="font-bold text-slate-500">Passengers</span>
                    <span className="font-black text-slate-900 dark:text-white">{store.passengers}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="font-black text-lg text-slate-900 dark:text-white">Total</span>
                    <span className="font-black text-3xl text-accent">${store.totalPrice}</span>
                </div>
            </div>

            <button
                onClick={handlePay}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-xl shadow-xl hover:bg-slate-800 transition-all"
            >
                Pay Now
            </button>
        </div>
    )
}
