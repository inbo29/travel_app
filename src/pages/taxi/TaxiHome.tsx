import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useTaxiStore } from '@/store/taxiStore'
import { requestTaxi } from '@/services/taxi.service'
import { useTaxiSimulator } from '@/hooks/useTaxiSimulator'

export default function TaxiHome() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const { setRide } = useTaxiStore()

    const [destination, setDestination] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [vehicleType, setVehicleType] = useState<'standard' | 'comfort' | 'premium'>('standard')
    const [isSearching, setIsSearching] = useState(false)
    const [results, setResults] = useState<{ name: string, dist: string }[]>([])

    const fares = {
        standard: 12.5,
        comfort: 18.0,
        premium: 35.0
    }

    // Mock Autocomplete
    useEffect(() => {
        if (!searchQuery) {
            setResults([])
            return
        }
        const timer = setTimeout(() => {
            setResults([
                { name: 'State Opera & Ballet Theatre', dist: '1.2km' },
                { name: 'Sukhbaatar Square', dist: '2.4km' },
                { name: 'Zaisan Memorial', dist: '5.8km' },
                { name: 'Chinggis Khaan International Airport', dist: '24km' }
            ].filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }, 300)
        return () => clearTimeout(timer)
    }, [searchQuery])

    const handleCallTaxi = async () => {
        if (!destination) return

        try {
            const ride = await requestTaxi(
                { lat: 47.9186, lng: 106.9170 }, // Current (Mock)
                { lat: 47.92, lng: 106.93 }      // Dest (Mock)
            )
            setRide(ride)
            navigate('/taxi/matching')
        } catch (error) {
            console.error('Failed to request taxi', error)
        }
    }

    return (
        <div className="pt-24 pb-40 px-6 max-w-7xl mx-auto h-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-10 items-start">

                {/* Left Side: Map & Search (PC View) */}
                <div className="space-y-6">
                    <div className="flex items-center gap-6 mb-4">
                        <button onClick={() => navigate('/home')} className="w-12 h-12 rounded-2xl bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('taxi.title')}</h1>
                    </div>

                    {/* Advanced Map Mock */}
                    <div className={`aspect-video lg:aspect-auto lg:h-[60vh] rounded-[3rem] ${glassClasses} border-slate-200 dark:border-white/10 overflow-hidden relative shadow-2xl bg-slate-100 dark:bg-slate-800`}>
                        <div className="absolute inset-0 opacity-40 dark:opacity-20">
                            <div className="w-full h-full bg-[radial-gradient(circle,theme(colors.slate.300)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        </div>
                        {/* Map UI Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center animate-ping" />
                            <div className="absolute inset-0 w-12 h-12 bg-accent rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                                <span className="text-white text-xl">📍</span>
                            </div>
                        </div>

                        {/* Top Search Bar (Floating over map) */}
                        <div className="absolute top-6 left-6 right-6 lg:left-10 lg:right-10 z-20">
                            <div className={`${glassClasses} bg-white/90 dark:bg-bg-dark/80 p-2 rounded-3xl border-slate-200 dark:border-white/20 shadow-2xl`}>
                                <div className="flex items-center gap-4 px-4 py-2">
                                    <span className="text-accent text-xl">🏁</span>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t('taxi.destinationPlaceholder')}
                                        className="flex-1 bg-transparent border-none outline-none font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 text-lg"
                                    />
                                    {searchQuery && (
                                        <button onClick={() => setSearchQuery('')} className="text-slate-400">✕</button>
                                    )}
                                </div>

                                {results.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/5 max-h-60 overflow-y-auto">
                                        {results.map((res, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setDestination(res.name)
                                                    setSearchQuery(res.name)
                                                    setResults([])
                                                }}
                                                className="w-full p-4 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-between transition-colors text-left"
                                            >
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">{res.name}</p>
                                                    <p className="text-xs text-slate-400">Ulaanbaatar, Mongolia</p>
                                                </div>
                                                <span className="text-xs font-black text-accent">{res.dist}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Ride Details (PC View) or Bottom Sheet (Mobile View) */}
                <div className={`${glassClasses} p-10 rounded-[4rem] border-slate-200 dark:border-white/20 bg-white/80 dark:bg-bg-dark/50 shadow-[0_30px_60px_rgba(0,0,0,0.1)] space-y-10 lg:sticky lg:top-24`}>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group">
                            <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">📍</div>
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('taxi.origin')}</p>
                                <p className="font-black text-slate-900 dark:text-white">Gobi Hotel (Current)</p>
                            </div>
                        </div>
                        <div className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all ${destination ? 'border-accent bg-accent/5' : 'border-dashed border-slate-200 dark:border-white/10 shadow-inner'}`}>
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${destination ? 'bg-accent text-white scale-110' : 'bg-slate-200 dark:bg-white/10 text-slate-400'}`}>🏁</div>
                            <div className="flex-1">
                                <p className={`text-[10px] font-black uppercase tracking-widest ${destination ? 'text-accent' : 'text-slate-400'}`}>{t('taxi.destination')}</p>
                                <p className={`font-black ${destination ? 'text-slate-900 dark:text-white text-lg' : 'text-slate-300 dark:text-white/10'}`}>
                                    {destination || "Select destination..."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] pl-2">Select Vehicle</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {(['standard', 'comfort', 'premium'] as const).map(type => (
                                <button
                                    key={type}
                                    onClick={() => setVehicleType(type)}
                                    className={`
                                        p-6 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-3
                                        ${vehicleType === type
                                            ? 'border-accent bg-accent/[0.05] shadow-xl scale-[1.05] z-10'
                                            : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
                                        }
                                    `}
                                >
                                    <span className="text-3xl">{type === 'standard' ? '🚕' : type === 'comfort' ? '🚐' : '🚔'}</span>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase truncate w-full">{t(`taxi.types.${type}`)}</p>
                                        <p className="text-accent font-black text-lg">${fares[type]}</p>
                                        {/* Market Rate Hint */}
                                        <p className="text-[9px] text-slate-400 mt-1">Avg ₮1,500/km</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleCallTaxi}
                        disabled={!destination}
                        className={`
                            w-full py-7 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 transition-all
                            ${destination
                                ? 'bg-accent text-white shadow-2xl shadow-accent/40 hover:scale-[1.02] active:scale-[0.98]'
                                : 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed'
                            }
                        `}
                    >
                        {t('taxi.callButton')}
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
