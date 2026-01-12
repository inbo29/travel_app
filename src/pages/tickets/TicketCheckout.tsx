import { useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { PaymentProcess } from '@/infra/payment'

export default function TicketCheckout() {
    const { t } = useI18n()
    const { id } = useParams()
    const navigate = useNavigate()

    const handlePaymentComplete = (method: string) => {
        navigate(`/tickets/success/${id}`)
    }

    return (
        <div className="pt-8 pb-40 px-6 max-w-2xl mx-auto space-y-12">
            {/* Local Header Removed (Managed by MainLayout) */}
            <div className="flex items-center gap-6">
                <div>
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
