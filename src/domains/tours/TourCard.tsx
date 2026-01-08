import { useNavigate } from 'react-router-dom'
import { Tour } from '@/types/tour'
import { getFallbackImage } from '@/utils/assets'
import { useI18n } from '@/hooks/useI18n'

interface TourCardProps {
    tour: Tour
}

export const TourCard = ({ tour }: TourCardProps) => {
    const navigate = useNavigate()
    const { t } = useI18n()

    return (
        <div
            onClick={() => navigate(`/tours/${tour.id}`)}
            className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-white/15"
        >
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={getFallbackImage(tour.category)}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-medium border border-white/20">
                    ⭐ {tour.rating}
                </div>
                <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider">
                    {tour.category}
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">{tour.title}</h3>
                </div>

                <div className="flex items-center text-white/60 text-sm mb-4">
                    <span className="mr-3">📍 {tour.location}</span>
                    <span>⏱️ {tour.duration}</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div>
                        <span className="text-white/60 text-xs block">{t('tickets.checkout.total')}</span>
                        <span className="text-primary text-xl font-bold">${tour.price}</span>
                        <span className="text-white/60 text-xs ml-1">/ {t('mock.person')}</span>
                    </div>
                    <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors">
                        {t('sections.seeMore')}
                    </button>
                </div>
            </div>
        </div>
    )
}
