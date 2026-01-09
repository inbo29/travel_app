import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useTaxiStore } from '@/store/taxiStore'

export default function TaxiMatching() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const { ride, reset } = useTaxiStore()
    // const [matchingStep, setMatchingStep] = useState(0) // Logic moved to store

    useEffect(() => {
        if (!ride || ride.status === 'IDLE') {
            navigate('/taxi')
            return
        }

        // Reactive Navigation
        if (ride.status === 'IN_RIDE') {
            navigate('/taxi/ride')
        }
    }, [ride?.status, navigate])

    const handleCancel = () => {
        reset()
        navigate('/taxi')
    }

    return (
        <div className="fixed inset-0 bg-bg-light dark:bg-bg-dark z-[100] overflow-hidden">
            {/* Immersive Map Background */}
            <div className="absolute inset-0 grayscale opacity-40 dark:opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle,theme(colors.slate.300)_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative h-full flex flex-col pt-24 pb-12 px-6 max-w-2xl mx-auto">
                {/* Status Indicator */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                    <div className="relative">
                        <div className="w-48 h-48 rounded-full border-4 border-accent/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                            <div className="absolute -top-2 left-1/2 -ml-2 w-4 h-4 bg-accent rounded-full shadow-lg shadow-accent/50" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-32 h-32 rounded-full ${glassClasses} border-white/20 flex items-center justify-center text-4xl shadow-2xl`}>
                                🚕
                            </div>
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight animate-pulse">
                            {ride?.status === 'SEARCHING' ? t('taxi.searching') : t('taxi.found')}
                        </h2>
                        <p className="text-slate-500 dark:text-white/40 font-bold uppercase tracking-widest text-xs">
                            {t('taxi.matching.title')}
                        </p>
                    </div>
                </div>

                {/* Driver Card Found (Bottom Slide Up) */}
                <div className={`
                    ${glassClasses} p-8 rounded-[3rem] border-slate-200 dark:border-white/20 bg-white/90 dark:bg-bg-bg-dark/80 shadow-2xl space-y-6
                    transition-all duration-700
                    ${ride?.status === 'MATCHED' || ride?.status === 'DRIVER_ARRIVING' ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                `}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-accent/20 overflow-hidden border-2 border-accent/30">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Batu" alt="Driver" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">{ride?.driver?.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-accent text-xs">★</span>
                                    <span className="text-sm font-bold text-slate-600 dark:text-white/70">{ride?.driver?.rating}</span>
                                    <span className="text-slate-400 dark:text-white/30 text-[10px] font-bold uppercase tracking-widest">• {ride?.driver?.carModel}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-accent uppercase tracking-widest">{t('taxi.matching.eta', { time: 3 })}</p>
                            <p className="text-xl font-black text-slate-900 dark:text-white">{ride?.driver?.plateNumber}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleCancel}
                        className="w-full py-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/40 font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all uppercase tracking-widest text-xs"
                    >
                        Cancel Request
                    </button>
                </div>
            </div>
        </div>
    )
}
