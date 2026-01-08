import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useTaxiStore } from '@/store/taxiStore'

export default function TaxiRide() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const { status, setStatus, driver, destination, fare, origin } = useTaxiStore()

    const [progress, setProgress] = useState(0)
    const [currentFare, setCurrentFare] = useState(0)
    const [distanceLeft, setDistanceLeft] = useState(4.2)
    const [elapsedTime, setElapsedTime] = useState(0)

    useEffect(() => {
        if (status === 'IDLE' || !driver) {
            navigate('/taxi')
            return
        }

        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + 0.5
                if (next >= 100) {
                    clearInterval(interval)
                    setStatus('COMPLETED')
                    navigate('/taxi/completion')
                    return 100
                }
                return next
            })

            setCurrentFare(prev => +(prev + (fare / 200)).toFixed(2))
            setDistanceLeft(prev => +(prev - (4.2 / 200)).toFixed(2))
            setElapsedTime(prev => prev + 1)
        }, 500)

        return () => clearInterval(interval)
    }, [status])

    if (!driver) return null

    return (
        <div className="pt-24 lg:pt-0 h-screen bg-slate-100 dark:bg-bg-bg-dark flex flex-col lg:flex-row">

            {/* Left/Top: Map Visualization */}
            <div className="flex-1 relative overflow-hidden bg-slate-200 dark:bg-slate-800 lg:h-full">
                <div className="absolute inset-0 grayscale-0 opacity-100 transition-opacity">
                    <div className="w-full h-full bg-[radial-gradient(circle,theme(colors.slate.300)_1.5px,transparent_1.5px)] bg-[size:40px_40px]" />
                </div>

                {/* Simulated Trajectory */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none p-20" viewBox="0 0 1000 1000">
                    <path
                        d="M 100 800 C 200 600, 400 400, 800 200"
                        fill="none"
                        stroke="rgba(34, 197, 94, 0.4)"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 100 800 C 200 600, 400 400, 800 200"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray="1000"
                        strokeDashoffset={1000 - (progress * 10)}
                    />
                    {/* Vehicle Marker */}
                    <g transform={`translate(${100 + progress * 7}, ${800 - progress * 6})`}>
                        <circle r="25" fill="#22C55E" className="animate-pulse opacity-20" />
                        <circle r="12" fill="#22C55E" stroke="white" strokeWidth="4" />
                    </g>

                    {/* Start/End Pins */}
                    <circle cx="100" cy="800" r="10" fill="white" stroke="#22C55E" strokeWidth="4" />
                    <circle cx="800" cy="200" r="10" fill="white" stroke="#F43F5E" strokeWidth="4" />
                </svg>

                {/* Status Overlays */}
                <div className="absolute top-12 left-6 right-6 lg:top-10 lg:left-10 flex items-center justify-between z-20">
                    <div className={`${glassClasses} bg-white/90 dark:bg-bg-bg-dark/80 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4`}>
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" />
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{t('taxi.ride.realtime')}</p>
                    </div>
                </div>
            </div>

            {/* Right/Bottom: Information Panel */}
            <div className={`
                ${glassClasses} lg:w-[450px] lg:h-full lg:rounded-none lg:border-l lg:border-t-0
                p-8 rounded-t-[4rem] border-t border-slate-200 dark:border-white/20 bg-white/95 dark:bg-bg-bg-dark/95 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] 
                space-y-10 z-30 transition-all
            `}>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">{t('taxi.inProgress')}</h2>
                    <p className="text-accent font-bold uppercase tracking-widest text-[10px]">Arriving at {destination}</p>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-2 gap-6 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('taxi.estimatedFare')}</p>
                        <div className="text-4xl font-black text-accent">${currentFare.toFixed(2)}</div>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('taxi.ride.distance')}</p>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">{Math.max(0, distanceLeft).toFixed(1)} km</div>
                    </div>
                </div>

                {/* Driver Profile */}
                <div className="flex items-center justify-between p-6 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-accent/20 overflow-hidden border-2 border-accent/20 transition-transform hover:scale-110">
                            <img src={driver.photo} alt="Driver" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 dark:text-white text-lg">{driver.name}</h4>
                            <div className="flex items-center gap-2">
                                <span className="text-accent">★</span>
                                <span className="text-xs font-black text-slate-600 dark:text-white/70">{driver.rating}</span>
                                <span className="text-slate-300 mx-1">•</span>
                                <p className="text-xs font-bold text-slate-400">{driver.car}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/10 flex items-center justify-center border border-slate-100 dark:border-white/10 shadow-sm hover:bg-slate-100 transition-colors">�</button>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    <button className="w-full py-6 rounded-[2rem] bg-slate-900 text-white font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                        ✋ {t('taxi.ride.stop')}
                    </button>
                    <button className="w-full py-5 rounded-[2rem] border-2 border-slate-200 dark:border-white/10 text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">
                        🛡️ {t('taxi.ride.safety')}
                    </button>
                </div>
            </div>
        </div>
    )
}
