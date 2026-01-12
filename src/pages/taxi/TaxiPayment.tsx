import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useTaxiStore } from '@/store/taxiStore'
import { useI18n } from '@/hooks/useI18n'
import { PaymentMethodSelector } from '@/infra/payment/PaymentMethodSelector'
import { PaymentSummary } from '@/infra/payment/PaymentSummary'
import { PaymentProvider, usePayment } from '@/infra/payment/PaymentProvider'
import { useEffect, useState } from 'react'

export default function TaxiPayment() {
    const { ride } = useTaxiStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!ride || ride.status === 'IDLE') {
            navigate('/taxi')
            return
        }

        if (ride.status !== 'PAYING') {
            // Redirect to appropriate step
            switch (ride.status) {
                case 'SEARCHING':
                case 'MATCHED':
                case 'MATCH_ACCEPTED':
                case 'DRIVER_ARRIVING':
                    navigate('/taxi/matching')
                    break
                case 'IN_RIDE':
                    navigate('/taxi/ride')
                    break
                case 'COMPLETED':
                    navigate('/taxi/completion')
                    break
                default:
                    break
            }
        }
    }, [ride?.status, navigate])

    if (!ride || ride.status !== 'PAYING') return null

    return (
        <PaymentProvider initialTotal={ride.currentFare}>
            <TaxiPaymentContent />
        </PaymentProvider>
    )
}

export function TaxiPaymentContent() {
    const { ride, addToHistory, reset } = useTaxiStore()
    const { method } = usePayment()
    const navigate = useNavigate()
    const { t } = useI18n()

    if (!ride) {
        navigate('/taxi')
        return null
    }

    const finalizePayment = () => {
        // Finalize
        addToHistory({ ...ride, status: 'COMPLETED', endTime: Date.now() })
        reset()
        navigate('/taxi/history')
    }

    return (
        <div className="h-full flex items-center justify-center px-6 pb-24 overflow-y-auto pointer-events-none">
            <div className={`${glassClasses} w-full max-w-lg p-8 md:p-10 rounded-[3.5rem] space-y-8 border border-white/20 shadow-2xl pointer-events-auto`}>
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">Payment</h2>
                    <p className="text-slate-500 dark:text-white/60 font-medium text-sm italic">Securely pay for your ride</p>
                </div>

                {/* Summary */}
                <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-[2rem] border border-slate-100 dark:border-white/10">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-white/40 font-black uppercase text-[10px] tracking-widest">Total Amount</span>
                        <span className="text-3xl font-black text-accent">₮{ride.currentFare.toLocaleString()}</span>
                    </div>
                </div>

                {/* Method Selector */}
                <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest pl-2">Select Method</h3>
                    <PaymentMethodSelector />
                </div>

                <div className="space-y-4">
                    <button
                        onClick={finalizePayment}
                        className="w-full py-6 rounded-[2.5rem] bg-accent text-white font-black text-xl shadow-xl shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Pay ₮{ride.currentFare.toLocaleString()} with {method}
                    </button>

                    <button
                        onClick={() => navigate('/taxi/completion')}
                        className="w-full py-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
                    >
                        Back to Summary
                    </button>
                </div>
            </div>
        </div>
    )
}
