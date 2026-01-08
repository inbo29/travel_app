import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'

export default function TicketCheckout() {
    const { t } = useI18n()
    const { id } = useParams()
    const navigate = useNavigate()
    const [selectedMethod, setSelectedMethod] = useState('payme')

    const PAYMENT_METHODS = [
        { id: 'payme', icon: '💳', recommended: true },
        { id: 'card', icon: '🏦' },
        { id: 'apple', icon: '' },
        { id: 'samsung', icon: '📱' }
    ]

    return (
        <div className="pt-24 pb-40 px-6 max-w-2xl mx-auto space-y-12">
            {/* Header */}
            <div className="flex items-center gap-6">
                <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('tickets.checkout.title')}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="h-1 w-8 bg-accent rounded-full" />
                        <div className="h-1 w-8 bg-accent rounded-full" />
                        <div className="h-1 w-8 bg-accent rounded-full" />
                        <p className="text-[10px] font-bold text-slate-500 dark:text-white/40 ml-2 uppercase">Step 3 of 3</p>
                    </div>
                </div>
            </div>

            {/* Selection Summary */}
            <section className={`${glassClasses} p-6 rounded-[2.5rem] bg-accent/[0.03] border-accent/20 space-y-4`}>
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-accent uppercase tracking-[0.2em]">Selected Ticket</h3>
                    <button onClick={() => navigate(-1)} className="text-[10px] font-bold text-slate-400 underline uppercase">Edit</button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-3xl">🎫</div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Forest Music Festival</h4>
                        <p className="text-xs text-slate-500 dark:text-white/50 font-medium">Oct 12, 19:00 • VIP Access (x1)</p>
                    </div>
                </div>
            </section>

            {/* Payment Methods */}
            <section className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t('tickets.checkout.payment')}</h3>
                <div className="grid grid-cols-1 gap-3">
                    {PAYMENT_METHODS.map(method => (
                        <button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`
                                flex items-center justify-between p-5 rounded-[2rem] transition-all border-2
                                ${selectedMethod === method.id
                                    ? 'border-accent bg-accent/[0.05] dark:bg-accent/[0.1] shadow-xl shadow-accent/5'
                                    : `${glassClasses} border-slate-200 dark:border-white/10 hover:border-white/20`
                                }
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${selectedMethod === method.id ? 'bg-accent text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white'}`}>
                                    {method.icon}
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-900 dark:text-white">{t(`tickets.checkout.methods.${method.id}`)}</h4>
                                    {method.recommended && (
                                        <span className="text-[9px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase">
                                            {t('tickets.checkout.recommended')}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod === method.id ? 'border-accent bg-accent' : 'border-slate-300 dark:border-white/20'}`}>
                                {selectedMethod === method.id && (
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Price Details */}
            <section className="space-y-4 pt-12 border-t border-slate-200 dark:border-white/10">
                <div className="flex justify-between text-slate-500 dark:text-white/40 font-bold text-sm">
                    <span>Subtotal (1 item)</span>
                    <span className="text-slate-900 dark:text-white">$120.00</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-white/40 font-bold text-sm">
                    <span>Service Fee</span>
                    <span>$0.00</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                    <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">{t('tickets.checkout.total')}</div>
                    <div className="text-4xl font-black text-accent">$120.00</div>
                </div>
            </section>

            {/* Complete Button */}
            <button
                onClick={() => navigate(`/tickets/success/${id}`)}
                className="w-full py-6 bg-accent text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 mt-8"
            >
                {t('tickets.checkout.complete')}
            </button>

            <p className="text-center text-[11px] text-slate-400 font-medium px-8">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy. Demo mode, no charges will be made.
            </p>
        </div>
    )
}
