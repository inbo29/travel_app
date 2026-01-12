import { useNavigate, useLocation } from 'react-router-dom'
import { MOCK_TOURS } from '@/types/tour'
import { MOCK_GUIDES } from '@/types/guide'
import { getFallbackImage } from '@/utils/assets'
import { useI18n } from '@/hooks/useI18n'

const BookingSummary = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { t } = useI18n()

    const { type, tourId, guideId, serviceType } = location.state || {}

    const tour = tourId ? MOCK_TOURS.find(t => t.id === tourId) : null
    const guide = guideId ? MOCK_GUIDES.find(g => g.id === guideId) : null

    const title = tour ? tour.title : (guide ? `${guide.name}` : 'Booking Summary')
    const price = tour ? tour.price : (guide ? guide.pricePerHour * 4 : 0) // Dummy 4 hours for guide
    const image = tour ? getFallbackImage(tour.category) : (guide ? guide.avatar : '')

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pt-8 pb-32 px-6">
            <div className="max-w-xl mx-auto">
                <header className="mb-10">
                    {/* Redundant back button and title removed/managed by Header */}
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Review Booking</h1>
                </header>

                <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl mb-8">
                    <div className="p-8">
                        <div className="flex gap-6 mb-8">
                            <img src={image} className="w-24 h-24 rounded-[24px] object-cover border border-white/10" />
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
                                <p className="text-white/40 text-sm">📍 {tour?.location || guide?.location}</p>
                                {serviceType && <span className="inline-block mt-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase">{serviceType}</span>}
                            </div>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-white/10">
                            <div className="flex justify-between items-center text-white/60">
                                <span>Date</span>
                                <span className="text-white font-medium">Oct 24, 2026</span>
                            </div>
                            <div className="flex justify-between items-center text-white/60">
                                <span>Duration</span>
                                <span className="text-white font-medium">{tour?.duration || '4 Hours'}</span>
                            </div>
                            <div className="flex justify-between items-center text-white/60">
                                <span>Travelers</span>
                                <span className="text-white font-medium">2 Adults</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-8 border-t border-white/10">
                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between text-white/40 text-sm">
                                <span>Base Price</span>
                                <span>${price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-white/40 text-sm">
                                <span>Service Fee</span>
                                <span>$10.00</span>
                            </div>
                            <div className="flex justify-between text-white text-xl font-black pt-3 border-t border-white/5">
                                <span>Total Amount</span>
                                <span className="text-primary">${(price + 10).toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/booking/success')}
                            className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-2xl font-black text-xl transition-all transform active:scale-95 shadow-lg shadow-primary/30"
                        >
                            Confirm & Pay
                        </button>
                    </div>
                </div>

                <p className="text-center text-white/20 text-xs">
                    By confirming, you agree to our Terms of Service and Cancellation Policy.
                </p>
            </div>
        </div>
    )
}

export default BookingSummary
