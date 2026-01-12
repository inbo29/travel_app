import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'

const BookingSuccess = () => {
    const navigate = useNavigate()
    const { t } = useI18n()

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center pt-8 pb-32 px-6">
            <div className="max-w-md w-full text-center">
                <div className="relative w-32 h-32 mx-auto mb-10">
                    <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full animate-pulse" />
                    <div className="relative w-full h-full bg-primary rounded-full flex items-center justify-center text-6xl shadow-2xl shadow-primary/40 border-4 border-white/20">
                        ✨
                    </div>
                </div>

                <h1 className="text-4xl font-black text-white mb-4">You're All Set!</h1>
                <p className="text-white/60 text-lg mb-12">
                    Your booking has been confirmed. You'll receive a confirmation email and a message from your guide shortly.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-white/40 text-sm">Booking ID</span>
                        <span className="text-white font-mono">TRP-98234-X</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-white/40 text-sm">Status</span>
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase">Confirmed</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/home')}
                        className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95"
                    >
                        Return Home
                    </button>
                    <button
                        onClick={() => navigate('/my/tickets')} // Assuming this shows bookings too
                        className="w-full bg-white/5 text-white py-4 rounded-2xl font-bold text-lg transition-all border border-white/10 hover:bg-white/10"
                    >
                        View My Bookings
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingSuccess
