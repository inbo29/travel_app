import { useParams, useNavigate } from 'react-router-dom'
import { useLogStore } from '@/store/logStore'
import { useState, useMemo, useEffect } from 'react'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { LogTimelineItem } from './TimelineItem'
import MapReplay from './MapReplay'
import JourneySummary from './JourneySummary'

export default function JourneyDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useI18n()
    const { journeys } = useLogStore()

    const journey = useMemo(() => journeys.find(j => j.id === id), [journeys, id])
    const [activeTab, setActiveTab] = useState<'timeline' | 'map' | 'photos' | 'summary'>('timeline')
    const [selectedDayIndex, setSelectedDayIndex] = useState(0)

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!journey) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="text-4xl">🚫</div>
                    <h2 className="text-xl font-bold">Journey Not Found</h2>
                    <button onClick={() => navigate('/travel-log')} className="text-accent font-bold hover:underline">Go Back</button>
                </div>
            </div>
        )
    }

    const currentDay = journey.days[selectedDayIndex]

    // Photos Aggregation (Mock + Logged)
    const allPhotos = useMemo(() => {
        return journey.days.flatMap(d => d.items.flatMap(i => i.photos || []))
    }, [journey])

    return (
        <div className="min-h-screen pb-20 bg-slate-50 dark:bg-bg-dark">
            {/* Header (Cover Image) */}
            <div className="relative h-64 md:h-80">
                <img src={`${import.meta.env.BASE_URL}${journey.coverImage}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                <div className="absolute top-6 left-6 z-10 w-full pr-12 flex justify-between items-center">
                    <button onClick={() => navigate('/travel-log')} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                        ←
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                    <h1 className="text-4xl md:text-5xl font-black mb-2">{journey.title}</h1>
                    <div className="flex flex-wrap gap-4 text-sm font-bold opacity-90">
                        <span className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                            {new Date(journey.startDate).toLocaleDateString()} — {journey.endDate ? new Date(journey.endDate).toLocaleDateString() : 'Ongoing'}
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                            💰 ₮{journey.totalSpend.toLocaleString()}
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                            👣 {Math.round(journey.totalDistance)} km
                        </span>
                    </div>
                </div>
            </div>

            {/* View Tabs */}
            <div className="sticky top-[72px] lg:top-[88px] z-30 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 transition-all">
                <div className="flex justify-center p-2 max-w-lg mx-auto overflow-x-auto no-scrollbar">
                    {(['timeline', 'map', 'photos', 'summary'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 px-4 text-sm font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap
                                ${activeTab === tab ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}
                            `}
                        >
                            {t(`log.tabs.${tab}`)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                {activeTab === 'timeline' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Day Selector */}
                        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                            {journey.days.map((day, idx) => (
                                <button
                                    key={day.date}
                                    onClick={() => setSelectedDayIndex(idx)}
                                    className={`
                                        flex-none px-6 py-4 rounded-2xl border-2 text-center min-w-[100px] transition-all
                                        ${selectedDayIndex === idx
                                            ? 'border-accent bg-accent/5 shadow-xl scale-[1.02]'
                                            : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 opacity-60 hover:opacity-100'}
                                    `}
                                >
                                    <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedDayIndex === idx ? 'text-accent' : 'text-slate-400'}`}>
                                        Day {idx + 1}
                                    </div>
                                    <div className="font-bold text-slate-900 dark:text-white whitespace-nowrap">
                                        {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Timeline Content */}
                        {currentDay ? (
                            <div className="relative pt-4">
                                {currentDay.items.map(item => (
                                    <LogTimelineItem key={item.id} item={item} />
                                ))}

                                {currentDay.items.length === 0 && (
                                    <div className="text-center py-20 text-slate-400 italic">
                                        No activities recorded for this day.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-slate-400 italic">
                                No days recorded yet. Start your journey!
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'map' && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <MapReplay items={journey.days.flatMap(d => d.items)} />
                        <p className="text-center text-xs text-slate-400 mt-4 uppercase tracking-widest">
                            Showing route for all {journey.days.length} days
                        </p>
                    </div>
                )}

                {activeTab === 'photos' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {allPhotos.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {allPhotos.map((photo, i) => (
                                    <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5">
                                        <img src={`${import.meta.env.BASE_URL}${photo}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={`${glassClasses} h-[300px] rounded-[3rem] flex flex-col items-center justify-center text-slate-400 space-y-4 border-dashed border-2 border-slate-300 dark:border-white/10`}>
                                <div className="text-4xl opacity-50">📷</div>
                                <div>No photos captured yet</div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'summary' && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <JourneySummary journey={journey} />
                    </div>
                )}
            </div>
        </div>
    )
}
