import { TimelineItem } from '@/types/log'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'

interface TimelineItemProps {
    item: TimelineItem
}

export function LogTimelineItem({ item }: TimelineItemProps) {
    const { t } = useI18n()
    const timeString = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const typeConfigs: Record<string, { icon: string; color: string; bg: string }> = {
        taxi: { icon: '🚕', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
        ticket: { icon: '🎫', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        payment: { icon: '💳', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
        place: { icon: '📍', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
        note: { icon: '📝', color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-900/30' }
    }

    const config = typeConfigs[item.type] || typeConfigs.note

    return (
        <div className="relative pl-8 pb-8 last:pb-0">
            {/* Connector Line */}
            <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-slate-200 dark:bg-white/10" />

            {/* Icon Node */}
            <div className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-lg z-10 ${config.bg} ${config.color} border border-white/20`}>
                {config.icon}
            </div>

            <div className={`
                ${glassClasses} p-5 rounded-2xl border-white/40 dark:border-white/5 
                hover:scale-[1.01] transition-transform duration-200
                flex gap-4 items-start relative overflow-hidden group
            `}>
                {/* Type Indicator Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.bg.split(' ')[0]}`} />

                <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                            <p className={`text-[10px] font-black uppercase tracking-widest ${config.color}`}>
                                {t(`log.type.${item.type}`)}
                            </p>
                            <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{item.title}</h4>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg">
                            {timeString}
                        </span>
                    </div>

                    {item.description && (
                        <p className="text-sm text-slate-500 dark:text-white/60 line-clamp-2">{item.description}</p>
                    )}

                    {/* Metadata rendering based on type */}
                    {item.type === 'taxi' && item.metadata?.distanceKm && (
                        <div className="flex gap-2 mt-2">
                            <span className="text-[9px] bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                                {item.metadata.distanceKm.toFixed(1)} km
                            </span>
                            {item.metadata.driverName && (
                                <span className="text-[9px] bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-md font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider">
                                    {item.metadata.driverName}
                                </span>
                            )}
                        </div>
                    )}

                    {item.type === 'ticket' && item.metadata?.category && (
                        <div className="flex gap-2 mt-2">
                            <span className="text-[9px] bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                                {t(`tickets.categories.${item.metadata.category}`)}
                            </span>
                        </div>
                    )}
                </div>

                {item.amount && (
                    <div className="text-right shrink-0">
                        <div className="font-black text-slate-900 dark:text-white text-lg">
                            {item.amount.toLocaleString()}<span className="text-[10px] ml-0.5 text-slate-400">{item.currency || '$'}</span>
                        </div>
                        {item.source === 'auto' && (
                            <div className="text-[8px] text-accent font-black uppercase tracking-[0.2em] mt-1 bg-accent/10 px-1.5 py-0.5 rounded-full inline-block">Auto</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
