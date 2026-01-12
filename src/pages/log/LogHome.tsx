import { useNavigate } from 'react-router-dom'
import { useLogStore } from '@/store/logStore'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useEffect } from 'react'
import { MOCK_JOURNEYS } from '@/mocks/log/journeys.mock'
import MainLayout from '@/layouts/MainLayout'

export default function LogHome() {
    const navigate = useNavigate()
    const { t } = useI18n()
    const { journeys, activeJourneyId } = useLogStore()

    // Initialize MOCK DATA if store is empty
    useEffect(() => {
        if (journeys.length === 0) {
            useLogStore.setState({ journeys: MOCK_JOURNEYS, activeJourneyId: 'j_ub_2024' })
        }
    }, [journeys, journeys.length])

    return (
        <div className="pt-8 pb-32 px-6 max-w-5xl mx-auto space-y-8">
            {/* Redundant Title Removed (now in Header) */}

            {journeys.length === 0 ? (
                <div className={`${glassClasses} p-12 rounded-[3rem] text-center space-y-4 border-dashed border-2 border-slate-300 dark:border-white/10`}>
                    <div className="text-6xl mb-4">📔</div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t('log.empty.title')}</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">
                        {t('log.empty.desc')}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {journeys.map(journey => (
                        <div
                            key={journey.id}
                            onClick={() => navigate(`/travel-log/${journey.id}`)}
                            className={`group relative h-[360px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                        >
                            <img src={`${import.meta.env.BASE_URL}${journey.coverImage}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                                {journey.status === 'active' && (
                                    <span className="px-3 py-1 rounded-full bg-accent text-white text-[10px] font-black uppercase tracking-widest animate-pulse">
                                        {t('log.status.active')}
                                    </span>
                                )}
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                                <h3 className="text-2xl font-black leading-tight">{journey.title}</h3>
                                <div className="flex items-center gap-3 text-xs font-bold opacity-80 uppercase tracking-wider">
                                    <span>{new Date(journey.startDate).toLocaleDateString()}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/50" />
                                    <span>{Math.round(journey.totalDistance)} km</span>
                                </div>
                                <div className="text-xs opacity-60 font-medium line-clamp-1">
                                    {journey.destination?.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
