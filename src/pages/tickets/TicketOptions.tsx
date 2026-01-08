import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'

const DATES = [
    { label: 'SAT', day: '12', full: 'Oct 12' },
    { label: 'SUN', day: '13', full: 'Oct 13' },
    { label: 'MON', day: '14', full: 'Oct 14' },
    { label: 'TUE', day: '15', full: 'Oct 15' },
    { label: 'WED', day: '16', full: 'Oct 16' },
]

const TIMES = ['14:00', '16:30', '19:00', '21:30']

const SEAT_TYPES = [
    { id: 'std', title: 'Standard', subtitle: 'General Admission', price: 50 },
    { id: 'vip', title: 'VIP Access', subtitle: 'Front Row + Free Drinks', price: 120, popular: true }
]

export default function TicketOptions() {
    const { t } = useI18n()
    const { id } = useParams()
    const navigate = useNavigate()

    const [selectedDate, setSelectedDate] = useState('12')
    const [selectedTime, setSelectedTime] = useState('19:00')
    const [selectedSeat, setSelectedSeat] = useState('vip')
    const [qty, setQty] = useState(1)

    const basePrice = SEAT_TYPES.find(s => s.id === selectedSeat)?.price || 0
    const totalPrice = basePrice * qty

    return (
        <div className="pt-24 pb-40 px-6 max-w-2xl mx-auto space-y-12">
            {/* Header & Step */}
            <div className="flex items-center gap-6">
                <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-900 dark:text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('tickets.options.title')}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="h-1 w-8 bg-accent rounded-full" />
                        <div className="h-1 w-8 bg-accent rounded-full" />
                        <div className="h-1 w-8 bg-white/20 rounded-full" />
                        <p className="text-[10px] font-bold text-slate-500 dark:text-white/40 ml-2 uppercase">Step 2 of 3</p>
                    </div>
                </div>
            </div>

            {/* Date Selection */}
            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('tickets.options.date')}</h3>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {DATES.map(date => (
                        <button
                            key={date.day}
                            onClick={() => setSelectedDate(date.day)}
                            className={`
                                flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all
                                ${selectedDate === date.day
                                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                    : `${glassClasses} text-slate-600 dark:text-white/60 hover:bg-white/10`
                                }
                            `}
                        >
                            <span className="text-[10px] font-bold opacity-60 uppercase">{date.label}</span>
                            <span className="text-xl font-black">{date.day}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Time Selection */}
            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('tickets.options.time')}</h3>
                <div className="grid grid-cols-4 gap-3">
                    {TIMES.map(time => (
                        <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`
                                py-3 rounded-xl font-bold text-sm transition-all
                                ${selectedTime === time
                                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                    : `${glassClasses} text-slate-600 dark:text-white/60 hover:bg-white/10`
                                }
                            `}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </section>

            {/* Seat Selection */}
            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('tickets.options.seat')}</h3>
                <div className="space-y-3">
                    {SEAT_TYPES.map(seat => (
                        <button
                            key={seat.id}
                            onClick={() => setSelectedSeat(seat.id)}
                            className={`
                                w-full p-6 rounded-[2rem] text-left transition-all border-2 relative overflow-hidden
                                ${selectedSeat === seat.id
                                    ? 'border-accent bg-accent/[0.05] dark:bg-accent/[0.1] shadow-xl shadow-accent/5'
                                    : `${glassClasses} border-white/10 hover:border-white/20`
                                }
                            `}
                        >
                            <div className="flex justify-between items-center relative z-10">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className={`text-lg font-bold ${selectedSeat === seat.id ? 'text-accent' : 'text-slate-900 dark:text-white'}`}>
                                            {seat.title}
                                        </h4>
                                        {seat.popular && (
                                            <span className="text-[9px] font-black text-white bg-accent px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-white/40 font-medium">{seat.subtitle}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-2xl font-black ${selectedSeat === seat.id ? 'text-accent' : 'text-slate-900 dark:text-white'}`}>
                                        ${seat.price}
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-bold">/ pax</p>
                                </div>
                            </div>

                            {selectedSeat === seat.id && (
                                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Quantity */}
            <section className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <h3 className="text-sm font-bold text-slate-500 dark:text-white/70 uppercase tracking-widest">{t('tickets.options.quantity')}</h3>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-xl font-bold dark:text-white"
                    >-</button>
                    <span className="text-2xl font-black text-slate-900 dark:text-white w-6 text-center">{qty}</span>
                    <button
                        onClick={() => setQty(qty + 1)}
                        className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-xl font-bold dark:text-white"
                    >+</button>
                </div>
            </section>

            {/* Purchase Bar */}
            <div className={`fixed bottom-0 left-0 right-0 p-8 ${glassClasses} border-t border-slate-200 dark:border-white/10 z-[60] bg-white/80 dark:bg-bg-bg-dark/80 backdrop-blur-xl`}>
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{t('tickets.checkout.total')}</p>
                        <div className="text-3xl font-black text-accent">${totalPrice}</div>
                    </div>
                    <button
                        onClick={() => navigate(`/tickets/checkout/${id}`)}
                        className="px-10 py-5 bg-accent text-white font-bold rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
                    >
                        {t('tickets.options.next')}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
