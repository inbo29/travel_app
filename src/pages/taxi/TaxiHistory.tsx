import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { MOCK_HISTORY } from '@/mocks/taxi/history.mock'
import { useTaxiStore } from '@/store/taxiStore'

export default function TaxiHistory() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const { history: storeHistory } = useTaxiStore()

    // Create a unified history list
    const history = [
        ...storeHistory.map(r => ({
            id: r.id,
            date: r.endTime ? new Date(r.endTime).toLocaleString() : 'Just now',
            origin: 'My Location',
            destination: `Lat: ${r.destination?.lat.toFixed(2)}, Lng: ${r.destination?.lng.toFixed(2)}`,
            distance: `${r.distanceKm.toFixed(1)}km`,
            fare: r.currentFare,
            driver: r.driver?.name || 'Unknown',
            status: 'PAID'
        })),
        ...MOCK_HISTORY
    ]

    return (
        <div className="h-full overflow-y-auto pt-24 pb-48 px-6 pointer-events-auto custom-scrollbar">
            <div className="max-w-2xl mx-auto space-y-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/taxi')}
                            className="w-12 h-12 rounded-2xl bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{t('taxi.history.title')}</h1>
                    </div>
                    <button onClick={() => navigate('/taxi')} className={`${glassClasses} px-6 py-2 rounded-full border-slate-200 dark:border-white/10 text-accent font-black text-sm`}>
                        + New Ride
                    </button>
                </div>

                {history.length === 0 ? (
                    <div className={`${glassClasses} p-20 rounded-[3rem] text-center border-dashed border-2 border-slate-200 dark:border-white/10`}>
                        <p className="text-slate-400 dark:text-white/20 font-bold uppercase tracking-widest text-xs">
                            {t('taxi.history.empty')}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((ride, i) => (
                            <div
                                key={ride.id}
                                className={`${glassClasses} p-6 rounded-[2.5rem] border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex items-center justify-between group hover:border-accent transition-all`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-3xl">🚕</div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white truncate max-w-[150px]">{ride.destination}</h3>
                                        <p className="text-xs font-bold text-slate-500 dark:text-white/30">{ride.date} • {ride.driver}</p>
                                        <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase mt-1 inline-block">
                                            {ride.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-accent">₮{ride.fare.toLocaleString()}</p>
                                    <svg className="w-6 h-6 ml-auto mt-2 text-slate-200 dark:text-white/10 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
