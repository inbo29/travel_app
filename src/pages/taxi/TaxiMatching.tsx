import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useTaxiStore } from '@/store/taxiStore'

export default function TaxiMatching() {
    return <TaxiMatchingContent />
}

export function TaxiMatchingContent() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const { ride, reset, setStatus } = useTaxiStore()

    // Note: useTaxiSimulator is running globally in MainLayout. No need to invoke it here.
    // Map control is also global.

    // Reactive Navigation (Step Restoration)
    useEffect(() => {
        if (!ride || ride.status === 'IDLE') {
            navigate('/taxi')
            return
        }

        switch (ride.status) {
            case 'IN_RIDE':
                navigate('/taxi/ride')
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

    const handleAccept = () => {
        setStatus('MATCH_ACCEPTED')
        // Global MapController should switch focus to Driver -> User path
    }

    const handleReject = () => {
        setStatus('SEARCHING')
    }

    const handleCancel = () => {
        reset()
        navigate('/taxi')
    }

    // Determine visibility of the Driver Card
    const showDriverCard = ride?.status === 'MATCHED' || ride?.status === 'MATCH_ACCEPTED' || ride?.status === 'DRIVER_ARRIVING'

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Transparent overlay over global map */}

            {/* Radar Overlay for Searching (CENTER) */}
            {ride?.status === 'SEARCHING' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-96 h-96 rounded-full border-4 border-accent/30 animate-ping" />
                    <div className="absolute w-64 h-64 rounded-full border-4 border-accent/50 animate-[ping_3s_linear_infinite]" />
                </div>
            )}

            <div className="relative h-full flex flex-col pt-24 pb-12 px-6 max-w-2xl mx-auto pointer-events-none">
                {/* Status Indicator (TOP) */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                    <div className="text-center space-y-4 pointer-events-auto">
                        <div className={`${glassClasses} inline-block px-8 py-4 rounded-full bg-black/80 text-white backdrop-blur-xl border-white/10`}>
                            <h2 className="text-2xl font-black tracking-tight animate-pulse flex items-center gap-3">
                                {ride?.status === 'SEARCHING' && (
                                    <>
                                        <span className="animate-spin">⏳</span>
                                        {t('taxi.searching')}
                                    </>
                                )}
                                {ride?.status === 'MATCHED' && (
                                    <>
                                        <span>🎉</span>
                                        {t('taxi.matchFound') || 'Match Found!'}
                                    </>
                                )}
                                {(ride?.status === 'MATCH_ACCEPTED' || ride?.status === 'DRIVER_ARRIVING') && (
                                    <>
                                        <span>🚕</span>
                                        {t('taxi.driverArriving') || 'Driver is coming...'}
                                    </>
                                )}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Driver Card Found (Bottom Slide Up) */}
                <div className={`
                    pointer-events-auto
                    ${glassClasses} p-8 rounded-[3rem] border-slate-200 dark:border-white/20 bg-white/90 dark:bg-bg-dark/95 shadow-2xl space-y-6
                    transition-all duration-500 transform
                    ${showDriverCard ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 hidden'}
                `}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-accent/20 overflow-hidden border-2 border-accent/30">
                                <img src={ride?.driver?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Batu"} alt="Driver" className="w-full h-full object-cover" />
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
                            <p className="text-[10px] font-black text-accent uppercase tracking-widest">ETA 3 min</p>
                            <p className="text-xl font-black text-slate-900 dark:text-white">{ride?.driver?.plateNumber}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {ride?.status === 'MATCHED' ? (
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleReject}
                                className="py-4 rounded-2xl bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/60 font-black hover:bg-slate-200 dark:hover:bg-white/20 transition-all uppercase tracking-widest text-xs"
                            >
                                {t('taxi.reject') || 'Reject'}
                            </button>
                            <button
                                onClick={handleAccept}
                                className="py-4 rounded-2xl bg-accent text-white font-black hover:scale-105 transition-all shadow-lg shadow-accent/30 uppercase tracking-widest text-xs"
                            >
                                {t('taxi.accept') || 'Accept Ride'}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-accent font-bold animate-pulse">Driver is on the way!</p>
                        </div>
                    )}

                    <button
                        onClick={handleCancel}
                        className="w-full py-2 text-slate-400 dark:text-white/30 font-bold hover:text-red-500 transition-all text-[10px] uppercase tracking-widest"
                    >
                        Cancel Request
                    </button>
                </div>
            </div>
        </div>
    )
}
