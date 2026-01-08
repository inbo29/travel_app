import { useNavigate, useLocation } from 'react-router-dom'
import { MOCK_GUIDES } from '@/types/guide'
import { useI18n } from '@/hooks/useI18n'

const InterpreterService = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { t } = useI18n()

    const guideId = location.state?.guideId
    const guide = MOCK_GUIDES.find(g => g.id === guideId)

    const services = [
        {
            id: 'on-site',
            title: 'On-site Interpretation',
            description: 'Physical presence for meetings, events, and tours.',
            icon: '🤝'
        },
        {
            id: 'online',
            title: 'Online Interpretation',
            description: 'Real-time video or audio translation.',
            icon: '💻'
        },
        {
            id: 'document',
            title: 'Document Translation',
            description: 'Certified translation for official papers.',
            icon: '📄'
        }
    ]

    return (
        <div className="min-h-screen bg-[#0f172a] pt-32 pb-32 px-6">
            <div className="max-w-xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-3xl font-black text-white mb-4">How can we help you communicate?</h1>
                    <p className="text-white/40">Select a service type to start your custom booking experience.</p>
                </header>

                <div className="space-y-4">
                    {services.map(service => (
                        <button
                            key={service.id}
                            onClick={() => navigate('/booking/summary', {
                                state: {
                                    guideId,
                                    serviceType: service.id,
                                    type: 'guide'
                                }
                            })}
                            className="w-full bg-white/5 border border-white/10 p-6 rounded-[32px] text-left hover:bg-white/10 hover:border-primary/50 transition-all group flex items-center gap-6"
                        >
                            <div className="text-4xl group-hover:scale-110 transition-transform">{service.icon}</div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg">{service.title}</h3>
                                <p className="text-white/40 text-sm">{service.description}</p>
                            </div>
                            <div className="text-white/20 text-2xl">→</div>
                        </button>
                    ))}
                </div>

                {guide && (
                    <div className="mt-12 bg-white/5 rounded-3xl p-6 border border-white/10 flex items-center gap-4">
                        <img src={guide.avatar} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                            <p className="text-white/40 text-xs">Selected Guide</p>
                            <p className="text-white font-bold">{guide.name}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InterpreterService
