import { useNavigate } from 'react-router-dom'
import { MapView } from '@/infra/map/MapView'
import { useI18n } from '@/hooks/useI18n'

export default function MapPage() {
    const { t } = useI18n()
    const navigate = useNavigate()

    return (
        <div className="h-screen w-full relative">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-[1000] p-6 pt-12 pointer-events-none">
                <div className="flex items-center justify-between pointer-events-auto">
                    <button
                        onClick={() => navigate('/home')}
                        className="w-12 h-12 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur shadow-lg flex items-center justify-center text-xl"
                    >
                        🔙
                    </button>
                    <div className="bg-white/90 dark:bg-black/50 backdrop-blur px-6 py-3 rounded-full shadow-lg">
                        <h1 className="font-bold text-lg">{t('nav.map')}</h1>
                    </div>
                    <div className="w-12" />
                </div>
            </div>

            <MapView showUser showMarketPois className="w-full h-full" />

            {/* Legend / Overlay */}
            <div className="absolute bottom-24 left-6 right-6 z-[1000] pointer-events-none">
                <div className="bg-white/90 dark:bg-black/80 backdrop-blur p-4 rounded-3xl shadow-xl pointer-events-auto border border-black/5 dark:border-white/10">
                    <h3 className="font-bold mb-2 text-sm">{t('marketPage.title')}</h3>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="opacity-70">Fair Price Zone</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
