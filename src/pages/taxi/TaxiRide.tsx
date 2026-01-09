import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useTaxiStore } from '@/store/taxiStore'
import { TaxiSafetyModal } from '@/components/taxi/TaxiSafetyModal'
import { TaxiStopModal } from '@/components/taxi/TaxiStopModal'

export default function TaxiRide() {
    return <TaxiRideContent />
}

function TaxiRideContent() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const { ride, setStatus, updateRideProgress } = useTaxiStore()

    const [showSafety, setShowSafety] = useState(false)
    const [showStop, setShowStop] = useState(false)

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
            case 'COMPLETED':
                navigate('/taxi/completion')
                break
            case 'PAYING':
                navigate('/taxi/payment')
                break
            default:
                break
        }
    }, [ride?.status, navigate])

    const handleStopRide = () => {
        updateRideProgress({
            status: 'COMPLETED',
            destination: ride?.currentLocation || ride?.origin,
            endTime: Date.now()
        })
        navigate('/taxi/completion')
    }

    if (!ride?.driver) return null

    return (
        <div className="h-full flex flex-col lg:flex-row pointer-events-none">

            {/* Left/Top: Transparent area over Global Map */}
            <div className="flex-1 relative overflow-hidden lg:h-full">
                {/* Status Overlays */}
                <div className="absolute top-12 left-6 right-6 lg:top-10 lg:left-10 flex items-center justify-between z-[1000] pointer-events-auto">
                    <div className={`${glassClasses} bg-white/90 dark:bg-bg-dark/80 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4`}>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_green]" />
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{t('taxi.ride.realtime')}</p>
                    </div>
                </div>
            </div>

            {/* Right/Bottom: Information Panel */}
            <div className={`
                ${glassClasses} lg:w-[450px] lg:h-full lg:rounded-none lg:border-l lg:border-t-0
                p-8 rounded-t-[4rem] border-t border-slate-200 dark:border-white/20 bg-white/95 dark:bg-bg-dark/95 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] 
                space-y-10 z-30 transition-all pointer-events-auto overflow-y-auto
            `}>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">{t('taxi.inProgress')}</h2>
                    <p className="text-accent font-bold uppercase tracking-widest text-[10px]">Arriving at {ride.destination?.lat.toFixed(4)}...</p>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-2 gap-6 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('taxi.estimatedFare')}</p>
                        <div className="text-4xl font-black text-accent">₮{ride.currentFare.toLocaleString()}</div>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('taxi.ride.distance')}</p>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">{ride.distanceKm.toFixed(1)} km</div>
                    </div>
                </div>

                {/* Driver Profile */}
                <div className="flex items-center justify-between p-6 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-accent/20 overflow-hidden border-2 border-accent/20 transition-transform hover:scale-110">
                            <img src={ride.driver.avatar} alt="Driver" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 dark:text-white text-lg">{ride.driver.name}</h4>
                            <div className="flex items-center gap-2">
                                <span className="text-accent">★</span>
                                <span className="text-xs font-black text-slate-600 dark:text-white/70">{ride.driver.rating}</span>
                                <span className="text-slate-300 mx-1">•</span>
                                <p className="text-xs font-bold text-slate-400">{ride.driver.carModel}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/10 flex items-center justify-center border border-slate-100 dark:border-white/10 shadow-sm hover:bg-slate-100 transition-colors">📞</button>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    <button
                        onClick={() => setShowStop(true)}
                        className="w-full py-6 rounded-[2rem] bg-slate-900 text-white font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                    >
                        ✋ {t('taxi.ride.stop')}
                    </button>
                    <button
                        onClick={() => setShowSafety(true)}
                        className="w-full py-5 rounded-[2rem] border-2 border-slate-200 dark:border-white/10 text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all"
                    >
                        🛡️ {t('taxi.ride.safety')}
                    </button>
                </div>
            </div>

            <TaxiSafetyModal isOpen={showSafety} onClose={() => setShowSafety(false)} />
            <TaxiStopModal isOpen={showStop} onClose={() => setShowStop(false)} onConfirm={handleStopRide} ride={ride} />
        </div>
    )
}
