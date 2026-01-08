import { useNavigate } from 'react-router-dom'
import { Guide } from '@/types/guide'
import { useI18n } from '@/hooks/useI18n'

interface GuideCardProps {
    guide: Guide
}

export const GuideCard = ({ guide }: GuideCardProps) => {
    const navigate = useNavigate()
    const { t } = useI18n()

    return (
        <div
            onClick={() => navigate(`/guides/${guide.id}`)}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-white/15"
        >
            <div className="flex items-start gap-5">
                <div className="relative">
                    <img
                        src={guide.avatar}
                        alt={guide.name}
                        className="w-20 h-20 rounded-2xl object-cover border border-white/20 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#0f172a]">
                        <span className="text-[10px]">✅</span>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-white font-bold text-lg">{guide.name}</h3>
                        <div className="text-primary font-black text-lg">
                            ${guide.pricePerHour}
                            <span className="text-white/40 text-[10px] font-medium ml-1">/ hour</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-white/60 text-xs">⭐ {guide.rating}</span>
                        <span className="text-white/20">|</span>
                        <span className="text-white/60 text-xs">📍 {guide.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {guide.languages.map(lang => (
                            <span key={lang} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[10px] text-white/80">
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-5 pt-5 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                    {guide.specialties.map(spec => (
                        <span key={spec} className="bg-primary/10 text-primary px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                            {spec}
                        </span>
                    ))}
                </div>
            </div>

            <button className="w-full mt-5 bg-white/5 hover:bg-primary text-white py-2.5 rounded-xl text-sm font-bold transition-all border border-white/10 hover:border-primary group-hover:bg-primary group-hover:border-primary">
                Book Guide
            </button>
        </div>
    )
}
