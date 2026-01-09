import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'

export default function MapPage() {
    const { t } = useI18n()
    const navigate = useNavigate()

    return (
        <div className="h-screen w-full relative">
            {/* UI content - Map is provided by ExploreMapLayout background */}

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
