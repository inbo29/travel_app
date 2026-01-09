import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useTaxiStore } from '@/store/taxiStore'
import { useI18n } from '@/hooks/useI18n'

export default function TaxiCompletion() {
    const { ride, addToHistory, reset, setStatus } = useTaxiStore()
    const navigate = useNavigate()
    const { t } = useI18n()

    useEffect(() => {
        if (!ride || ride.status === 'IDLE') {
            navigate('/taxi')
            return
        }

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
            case 'PAYING':
                navigate('/taxi/payment')
                break
            default:
                break
        }
    }, [ride?.status, navigate])

    if (!ride) return null

    const handlePayment = () => {
        setStatus('PAYING')
        navigate('/taxi/payment')
    }

    return (
        <div className="h-full flex items-center justify-center px-6 pb-20 overflow-y-auto pointer-events-none">
            <div className={`${glassClasses} p-10 rounded-[4rem] text-center space-y-8 border-2 border-green-500/20 shadow-2xl relative overflow-hidden pointer-events-auto`}>
                <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />

                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto text-5xl shadow-xl shadow-green-500/30 animate-bounce">
                    🎉
                </div>

                <div className="space-y-2 relative z-10">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">Ride Completed!</h2>
                    <p className="text-slate-500 dark:text-white/60 font-bold">Hope you had a safe trip.</p>
                </div>

                <div className="py-8 border-y-2 border-dashed border-slate-200 dark:border-white/10 space-y-6 relative z-10">
                    <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Total Fare</p>
                        <p className="text-5xl font-black text-accent">₮{ride.currentFare.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Distance</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">{ride.distanceKm.toFixed(1)} km</p>
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Time</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">{Math.ceil(ride.durationMin)} min</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full py-6 rounded-[2.5rem] bg-accent text-white font-black text-xl shadow-xl shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10"
                >
                    Pay & Finish
                </button>
            </div>
        </div>
    )
}
