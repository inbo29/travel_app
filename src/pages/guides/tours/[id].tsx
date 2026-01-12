import { useParams, useNavigate } from 'react-router-dom'
import { MOCK_TOURS } from '@/types/tour'
import { getFallbackImage } from '@/utils/assets'
import { useI18n } from '@/hooks/useI18n'

const TourDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useI18n()

    const tour = MOCK_TOURS.find(t => t.id === id)

    if (!tour) {
        return <div className="pt-32 text-center text-white">Tour not found</div>
    }

    return (
        <div className="min-h-screen bg-transparent pb-32">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full">
                <img
                    src={getFallbackImage(tour.category)}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />

                {/* Local Back Button Removed (Managed by Header) */}

                <div className="absolute bottom-8 left-6 right-6 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                            {tour.category}
                        </span>
                        <span className="text-white/80 text-sm">⭐ {tour.rating} (120+ reviews)</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                        {tour.title}
                    </h1>
                    <p className="text-white/60 mt-2 flex items-center gap-2">
                        📍 {tour.location} • ⏱️ {tour.duration}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                        <p className="text-white/70 leading-relaxed text-lg">
                            {tour.description}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Itinerary</h2>
                        <div className="space-y-6">
                            {tour.itinerary.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                            {index + 1}
                                        </div>
                                        {index !== tour.itinerary.length - 1 && (
                                            <div className="w-0.5 h-full bg-white/10 my-2" />
                                        )}
                                    </div>
                                    <div className="pb-4">
                                        <p className="text-white font-medium text-lg">{item}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-white mb-4">Included</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <li className="text-white/60 flex items-center gap-2">✅ Professional Guide</li>
                            <li className="text-white/60 flex items-center gap-2">✅ Entrance Fees</li>
                            <li className="text-white/60 flex items-center gap-2">✅ Local Transportation</li>
                            <li className="text-white/60 flex items-center gap-2">✅ Bottled Water</li>
                        </ul>
                    </section>
                </div>

                {/* Right Sidebar - Sticky Booking */}
                <div className="relative">
                    <div className="lg:sticky lg:top-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <span className="text-white/60 text-sm block">Total Price</span>
                                <span className="text-3xl font-black text-white">${tour.price}</span>
                                <span className="text-white/60 text-sm ml-1">/ person</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <span className="text-white/40 text-xs block uppercase mb-1 font-bold">Languages</span>
                                <p className="text-white font-medium">{tour.languages.join(', ')}</p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <span className="text-white/40 text-xs block uppercase mb-1 font-bold">Max Group Size</span>
                                <p className="text-white font-medium">12 People</p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/booking/summary', { state: { tourId: tour.id, type: 'tour' } })}
                            className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95 shadow-lg shadow-primary/30"
                        >
                            Book Now
                        </button>
                        <p className="text-center text-white/40 text-xs mt-4">
                            Free cancellation up to 24 hours before the tour
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetail
