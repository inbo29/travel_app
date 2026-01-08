import { useParams, useNavigate } from 'react-router-dom'
import { MOCK_GUIDES } from '@/types/guide'
import { useI18n } from '@/hooks/useI18n'

const GuideDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useI18n()

    const guide = MOCK_GUIDES.find(g => g.id === id)

    if (!guide) {
        return <div className="pt-32 text-center text-white">Guide not found</div>
    }

    return (
        <div className="min-h-screen bg-transparent pt-32 pb-32 px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                {/* Left Sidebar - Profile Info */}
                <div className="lg:w-1/3">
                    <div className="sticky top-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-10 overflow-hidden shadow-2xl">
                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />

                        <div className="relative z-10">
                            <div className="relative w-40 h-40 mx-auto mb-8">
                                <img
                                    src={guide.avatar}
                                    alt={guide.name}
                                    className="w-full h-full rounded-[32px] object-cover border-4 border-white/10 shadow-2xl"
                                />
                                <div className="absolute -bottom-3 -right-3 bg-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border-2 border-[#0f172a] shadow-lg">
                                    Verified Expert
                                </div>
                            </div>

                            <div className="text-center mb-10">
                                <h1 className="text-3xl font-black text-white mb-2">{guide.name}</h1>
                                <p className="text-white/60 text-sm">📍 {guide.location}</p>
                                <div className="flex items-center justify-center gap-2 mt-3">
                                    <span className="text-yellow-400">★★★★★</span>
                                    <span className="text-white font-bold">{guide.rating}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-10">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                                    <span className="text-[10px] text-white/40 block mb-1">TOURS</span>
                                    <span className="text-white font-black">120+</span>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                                    <span className="text-[10px] text-white/40 block mb-1">EXP.</span>
                                    <span className="text-white font-black">5y</span>
                                </div>
                                <div className="bg-primary/20 border border-primary/20 rounded-2xl p-3 text-center">
                                    <span className="text-[10px] text-primary block mb-1">RATE</span>
                                    <span className="text-primary font-black">${guide.pricePerHour}</span>
                                </div>
                            </div>

                            <button className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95 shadow-xl mb-3">
                                Message & Hire
                            </button>
                            <p className="text-center text-white/40 text-[10px]">Average response time: 5 mins</p>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="lg:w-2/3 space-y-12">
                    <section>
                        <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                            <span className="w-8 h-1 bg-primary rounded-full"></span>
                            About Me
                        </h2>
                        <p className="text-white/70 leading-relaxed text-xl">
                            {guide.bio}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                            <span className="w-8 h-1 bg-primary rounded-full"></span>
                            Languages
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {guide.languages.map(lang => (
                                <div key={lang} className="bg-white/10 border border-white/20 px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-3">
                                    <span className="text-xl">🌐</span>
                                    {lang}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                            <span className="w-8 h-1 bg-primary rounded-full"></span>
                            Services Offered
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🚶‍♂️</div>
                                <h3 className="text-white font-bold text-lg mb-2">Tour Guiding</h3>
                                <p className="text-white/40 text-sm">Personalized tours covering history, culture, and hidden local spots.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🗣️</div>
                                <h3 className="text-white font-bold text-lg mb-2">Interpretation</h3>
                                <p className="text-white/40 text-sm">Professional translation for business meetings, medical visits, or shopping.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">💼</div>
                                <h3 className="text-white font-bold text-lg mb-2">Business Assistant</h3>
                                <p className="text-white/40 text-sm">Full coordination for your business trip, including bookings and logistics.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🚗</div>
                                <h3 className="text-white font-bold text-lg mb-2">Custom Companion</h3>
                                <p className="text-white/40 text-sm">Flexible accompaniment for any activity you have in mind.</p>
                            </div>
                        </div>
                    </section>

                    <section className="pt-12">
                        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-2xl font-black text-white mb-2">Ready to explore?</h3>
                                <p className="text-white/60">Book {guide.name.split(' ')[0]} for your next adventure.</p>
                            </div>
                            <button
                                onClick={() => navigate('/interpreter/service', { state: { guideId: guide.id } })}
                                className="bg-primary hover:bg-primary-hover text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-primary/30"
                            >
                                Hire This Guide
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default GuideDetail
