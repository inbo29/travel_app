import { Journey } from '@/types/log'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'

export default function JourneySummary({ journey }: { journey: Journey }) {
    const { t } = useI18n()

    // Calculate stats
    const taxiCount = journey.days.reduce((acc, day) => acc + day.items.filter(i => i.type === 'taxi').length, 0)
    const ticketCount = journey.days.reduce((acc, day) => acc + day.items.filter(i => i.type === 'ticket').length, 0)
    const placeCount = journey.days.reduce((acc, day) => acc + day.items.filter(i => i.type === 'place').length, 0)

    const topLocations = journey.days
        .flatMap(d => d.items)
        .filter(i => i.location)
        .slice(0, 5) // Top 5 highlights

    return (
        <div className="space-y-8 pb-20">
            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-3">
                <div className={`${glassClasses} p-4 rounded-3xl bg-white/50 dark:bg-white/5 border border-white/20 text-center space-y-1`}>
                    <div className="text-2xl">🚕</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{taxiCount}</div>
                    <div className="text-[8px] text-slate-500 font-bold tracking-widest uppercase">{t('log.summary.rides')}</div>
                </div>
                <div className={`${glassClasses} p-4 rounded-3xl bg-white/50 dark:bg-white/5 border border-white/20 text-center space-y-1`}>
                    <div className="text-2xl">🎫</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{ticketCount}</div>
                    <div className="text-[8px] text-slate-500 font-bold tracking-widest uppercase">{t('log.summary.tickets')}</div>
                </div>
                <div className={`${glassClasses} p-4 rounded-3xl bg-white/50 dark:bg-white/5 border border-white/20 text-center space-y-1`}>
                    <div className="text-2xl">📍</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{placeCount}</div>
                    <div className="text-[8px] text-slate-500 font-bold tracking-widest uppercase">{t('log.summary.places')}</div>
                </div>
            </div>

            {/* Financial Summary */}
            <div className={`${glassClasses} p-8 rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">{t('log.summary.spend')}</p>
                            <h2 className="text-5xl font-black">₮{journey.totalSpend.toLocaleString()}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">{t('log.summary.duration')}</p>
                            <p className="text-xl font-bold">{journey.days.length} Days</p>
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="flex justify-between items-center text-sm font-medium opacity-80">
                        <span>{t('log.summary.distance')}</span>
                        <span>{journey.totalDistance.toFixed(1)} km</span>
                    </div>
                </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">{t('log.summary.highlights')}</h3>
                <div className="space-y-3">
                    {topLocations.map(item => (
                        <div key={item.id} className={`${glassClasses} flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white`}>
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-xl">
                                📍
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                <p className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                    {topLocations.length === 0 && (
                        <p className="text-slate-400 italic text-sm">No highlights yet.</p>
                    )}
                </div>
            </div>

            {/* Export Actions */}
            <div className="pt-4 space-y-3">
                <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black shadow-xl">
                    Download PDF Report
                </button>
                <button className="w-full py-4 bg-transparent border-2 border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 rounded-2xl font-bold">
                    Share Link
                </button>
            </div>
        </div>
    )
}
