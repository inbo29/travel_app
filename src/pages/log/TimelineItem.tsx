import { TimelineItem } from '@/types/log'
import { glassClasses } from '@/styles/glass'

interface TimelineItemProps {
    item: TimelineItem
}

export function LogTimelineItem({ item }: TimelineItemProps) {
    const timeString = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const iconMap: Record<string, string> = {
        taxi: '🚕',
        ticket: '🎫',
        payment: '💳',
        place: '📍',
        note: '📝'
    }

    return (
        <div className="relative pl-8 pb-8 last:pb-0">
            {/* Connector Line */}
            <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-slate-200 dark:bg-white/10" />

            {/* Icon Node */}
            <div className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-lg z-10 
                ${item.type === 'payment' ? 'bg-orange-100 text-orange-500' :
                    item.type === 'taxi' ? 'bg-yellow-100 text-yellow-600' :
                        item.type === 'ticket' ? 'bg-purple-100 text-purple-600' :
                            'bg-white dark:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/20'
                }`}>
                {iconMap[item.type] || '•'}
            </div>

            <div className={`
                ${glassClasses} p-5 rounded-2xl border-white/40 dark:border-white/5 
                hover:scale-[1.01] transition-transform duration-200
                flex gap-4 items-start
            `}>
                <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{item.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400">{timeString}</span>
                    </div>

                    {item.description && (
                        <p className="text-sm text-slate-500 dark:text-white/60 line-clamp-2">{item.description}</p>
                    )}

                    {/* Metadata rendering based on type */}
                    {item.type === 'taxi' && item.metadata?.distanceKm && (
                        <div className="flex gap-3 mt-2">
                            <span className="text-[10px] bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-md font-bold text-slate-500 dark:text-white/50">
                                {item.metadata.distanceKm.toFixed(1)} km
                            </span>
                            {item.metadata.driverName && (
                                <span className="text-[10px] bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-md font-bold text-slate-500 dark:text-white/50">
                                    Driver: {item.metadata.driverName}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {item.amount && (
                    <div className="text-right">
                        <div className="font-black text-slate-900 dark:text-white">
                            {item.currency || '$'}{item.amount.toLocaleString()}
                        </div>
                        {item.source === 'auto' && (
                            <div className="text-[9px] text-accent font-bold uppercase tracking-wider mt-1">Auto</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
