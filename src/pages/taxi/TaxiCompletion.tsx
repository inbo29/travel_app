import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useTaxiStore } from '@/store/taxiStore'
import { PaymentProcess } from '@/infra/payment'

export default function TaxiCompletion() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const { driver, fare, origin, destination, resetRide, addHistory } = useTaxiStore()

    const [step, setStep] = useState<'PAYMENT' | 'RATING'>('PAYMENT')
    const [rating, setRating] = useState(0)

    const handlePaymentComplete = (method: string) => {
        setStep('RATING')
    }

    const handleComplete = () => {
        addHistory({
            id: `TX-${Date.now()}`,
            date: new Date().toLocaleDateString(),
            origin,
            destination,
            fare,
            driverName: driver?.name,
            status: 'Completed'
        })
        resetRide()
        navigate('/taxi/history')
    }

    if (!driver) return null

    return (
        <div className="pt-24 pb-40 px-6 max-w-2xl mx-auto space-y-10 min-h-screen">
            {/* Arrival Header */}
            <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-accent text-white flex items-center justify-center text-5xl mx-auto shadow-2xl shadow-accent/40 animate-bounce">
                    🏁
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">You've Arrived!</h1>
                    <p className="text-slate-500 dark:text-white/40 font-bold uppercase tracking-widest text-[10px]">Trip Summary</p>
                </div>
            </div>

            {step === 'PAYMENT' ? (
                <PaymentProcess
                    amount={fare}
                    title={t('taxi.payment.total')}
                    onComplete={handlePaymentComplete}
                    onCancel={() => navigate('/home')}
                    items={[
                        { label: t('taxi.origin'), value: origin },
                        { label: t('taxi.destination'), value: destination },
                        { label: 'Driver', value: driver.name }
                    ]}
                />
            ) : (
                /* Rating Card */
                <div className={`${glassClasses} p-10 rounded-[3rem] border-slate-200 dark:border-white/20 bg-white/80 dark:bg-bg-bg-dark/50 shadow-2xl space-y-10 text-center`}>
                    <div className="space-y-4">
                        <div className="w-24 h-24 rounded-3xl bg-accent/20 mx-auto overflow-hidden border-4 border-accent/20 p-1">
                            <img src={driver.photo} alt="Driver" className="w-full h-full object-cover rounded-2xl" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t('taxi.review.title')}</h3>
                            <p className="text-sm font-bold text-slate-400">{driver.name}</p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-5xl transition-all duration-300 ${rating >= star ? 'scale-125 grayscale-0' : 'scale-100 grayscale opacity-20'}`}
                            >
                                ⭐
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4 pt-6">
                        <button
                            onClick={handleComplete}
                            className={`w-full py-6 font-black text-xl rounded-[2rem] transition-all ${rating > 0 ? 'bg-accent text-white shadow-2xl shadow-accent/30' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}
                        >
                            {t('taxi.review.submit')}
                        </button>
                        <button
                            onClick={handleComplete}
                            className="text-slate-400 dark:text-white/30 text-xs font-black uppercase tracking-widest hover:text-accent transition-colors"
                        >
                            {t('taxi.review.skip')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
