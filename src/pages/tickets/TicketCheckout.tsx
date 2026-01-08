import { useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import PaymentProcess from '@/components/payment/PaymentProcess'

export default function TicketCheckout() {
    const { t } = useI18n()
    const { id } = useParams()
    const navigate = useNavigate()

    const handlePaymentComplete = (method: string) => {
        navigate(`/tickets/success/${id}`)
    }

    return (
        <div className="pt-24 pb-40 px-6 max-w-2xl mx-auto space-y-12">
            {/* Header */}
            <div className="flex items-center gap-6">
                <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('tickets.checkout.title')}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="h-1 w-8 bg-accent rounded-full" />
                        <div className="h-1 w-8 bg-accent rounded-full" />
                        <div className="h-1 w-8 bg-accent rounded-full" />
                        <p className="text-[10px] font-black text-slate-500 dark:text-white/40 ml-2 uppercase tracking-widest">Step 3 of 3</p>
                    </div>
                </div>
            </div>

            <PaymentProcess
                amount={120.00}
                title={t('tickets.checkout.total')}
                onComplete={handlePaymentComplete}
                onCancel={() => navigate(-1)}
                items={[
                    { label: 'Event', value: 'Forest Music Festival' },
                    { label: 'Ticket', value: 'VIP Access (x1)' },
                    { label: 'Date', value: 'Oct 12, 19:00' }
                ]}
            />

            <p className="text-center text-[11px] text-slate-400 font-medium px-8 pt-4">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy. Demo mode, no charges will be made.
            </p>
        </div>
    )
}
