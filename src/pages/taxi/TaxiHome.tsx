import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'
import { useTaxiStore } from '@/store/taxiStore'
import { requestTaxi } from '@/services/taxi.service'
import { useMap } from '@/infra/map/MapProvider'
import { MOCK_PLACES } from '@/mocks/taxi/places.mock'
import { useRef } from 'react'
import { TaxiMatchingContent } from './TaxiMatching'
import { TaxiRideContent } from './TaxiRide'
import { TaxiPaymentContent } from './TaxiPayment'
import TaxiCompletion from './TaxiCompletion'

export default function TaxiHome() {
    const { ride } = useTaxiStore()

    // TAXI STATE MACHINE CONTROLLER
    // Route is shell, UI is State.
    if (ride?.status === 'SEARCHING' || ride?.status === 'MATCHED' || ride?.status === 'MATCH_ACCEPTED' || ride?.status === 'DRIVER_ARRIVING') {
        return <TaxiMatchingContent />
    }
    if (ride?.status === 'IN_RIDE') {
        return <TaxiRideContent />
    }
    if (ride?.status === 'PAYING') {
        return <TaxiPaymentContent />
    }
    if (ride?.status === 'COMPLETED') {
        return <TaxiCompletion />
    }

    return <TaxiHomeContent />
}

export function TaxiHomeContent() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const { ride, setRide, searchOrigin, searchDestination, setSearchOrigin, setSearchDestination } = useTaxiStore()
    // No MapProvider dependency

    // Local UI state for Search Input
    const [searchQuery, setSearchQuery] = useState('')
    const [searchMode, setSearchMode] = useState<'origin' | 'destination'>('destination')
    const [vehicleType, setVehicleType] = useState<'standard' | 'comfort' | 'premium'>('standard')
    const [results, setResults] = useState(MOCK_PLACES)

    // State-based redirect logic is now handled by the parent TaxiHome component returning the correct view.
    // We can remove the navigate logic here or keep it as backup, but the parent switcher is primary.
    // For safety, if we are in "HomeContent" but state says otherwise, we let the parent re-render.
    // But since TaxiHomeContent is a child of TaxiHome, it will be unmounted when TaxiHome switches.
    // So we don't need effects here!

    // Initial Focus


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
        const filtered = MOCK_PLACES.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.address.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setResults(filtered)
    }, [searchQuery])

    const handleSelectPlace = (place: typeof MOCK_PLACES[0]) => {
        const selected = { name: place.name, lat: place.lat, lng: place.lng }
        if (searchMode === 'origin') {
            setSearchOrigin(selected)
        } else {
            setSearchDestination(selected)
        }
        setSearchQuery('')
        setResults([])
    }

    const handleCallTaxi = async () => {
        if (!searchDestination) return
        if (!searchOrigin) return

        try {
            const ride = await requestTaxi(
                { lat: searchOrigin!.lat, lng: searchOrigin!.lng },
                { lat: searchDestination!.lat, lng: searchDestination!.lng }
            )
            setRide(ride)
            // Parent will auto-switch to Matching View
        } catch (error) {
            console.error('Failed to request taxi', error)
        }
    }

    return (
        <div className="pt-4 pb-20 px-4 lg:px-6 max-w-7xl mx-auto h-full flex flex-col pointer-events-none overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-6 lg:gap-10 items-start h-full">

                {/* Left Side: Search Bar (Floating over map) */}
                <div className="space-y-6 flex flex-col pointer-events-none">
                    <div className="flex items-center justify-between mb-4 flex-none pointer-events-auto">
                        <div className="flex items-center gap-6">
                            <button onClick={() => navigate('/home')} className="w-12 h-12 rounded-2xl bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('taxi.title')}</h1>
                        </div>

                        {/* History Button */}
                        <button
                            onClick={() => navigate('/taxi/history')}
                            className={`${glassClasses} bg-white/5 dark:bg-white/10 px-4 py-2 rounded-xl text-sm font-bold text-slate-900 dark:text-white hover:bg-white/20`}
                        >
                            History
                        </button>
                    </div>

                    {/* Search Input Area - Positioned relatively in the grid but visually floating */}
                    <div className="relative z-[1000] pointer-events-auto">
                        <div className={`${glassClasses} bg-white/90 dark:bg-bg-dark/80 p-2 rounded-3xl border-slate-200 dark:border-white/20 shadow-2xl overflow-hidden`}>
                            <div className="flex items-center gap-4 px-4 py-2">
                                <span className="text-accent text-xl">{searchMode === 'origin' ? '📍' : '🏁'}</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={searchMode === 'origin' ? t('taxi.originPlaceholder') : t('taxi.destinationPlaceholder')}
                                    className="flex-1 bg-transparent border-none outline-none font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 text-lg"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="text-slate-400">✕</button>
                                )}
                            </div>

                            {searchQuery && results.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/5 max-h-60 overflow-y-auto">
                                    {results.map((res) => (
                                        <button
                                            key={res.id}
                                            onClick={() => handleSelectPlace(res)}
                                            className="w-full p-4 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-between transition-colors text-left"
                                        >
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{res.name}</p>
                                                <p className="text-xs text-slate-400">{res.address}</p>
                                            </div>
                                            <span className="text-xs font-black text-accent">{res.dist}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Ride Panel - Pointer Events Auto to allow interaction */}
                <div className={`${glassClasses} p-10 rounded-[4rem] border-slate-200 dark:border-white/20 bg-white/80 dark:bg-bg-dark/50 shadow-[0_30px_60px_rgba(0,0,0,0.1)] space-y-10 lg:sticky lg:top-4 pointer-events-auto`}>
                    <div className="space-y-6">
                        <button
                            onClick={() => { setSearchMode('origin'); setSearchQuery(''); }}
                            className={`w-full text-left flex items-center gap-4 p-5 rounded-3xl border-2 transition-all ${searchMode === 'origin' ? 'border-accent bg-accent/5' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10'}`}
                        >
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform ${searchMode === 'origin' ? 'bg-accent text-white scale-110 shadow-lg' : 'bg-accent/20 text-accent'}`}>📍</div>
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('taxi.origin')}</p>
                                <p className={`font-black ${searchMode === 'origin' ? 'text-accent' : 'text-slate-900 dark:text-white'}`}>{searchOrigin?.name || 'Set Origin'}</p>
                            </div>
                        </button>
                        <button
                            onClick={() => { setSearchMode('destination'); setSearchQuery(''); }}
                            className={`w-full text-left flex items-center gap-4 p-5 rounded-3xl border-2 transition-all ${searchDestination ? (searchMode === 'destination' ? 'border-accent bg-accent/5' : 'border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5') : 'border-dashed border-slate-200 dark:border-white/10 shadow-inner'}`}
                        >
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${searchDestination ? (searchMode === 'destination' ? 'bg-accent text-white scale-110 shadow-lg' : 'bg-slate-200 dark:bg-white/10 text-slate-400') : 'bg-slate-200 dark:bg-white/10 text-slate-400'}`}>🏁</div>
                            <div className="flex-1">
                                <p className={`text-[10px] font-black uppercase tracking-widest ${searchDestination ? 'text-accent' : 'text-slate-400'}`}>{t('taxi.destination')}</p>
                                <p className={`font-black ${searchDestination ? (searchMode === 'destination' ? 'text-accent text-lg' : 'text-slate-900 dark:text-white text-lg') : 'text-slate-300 dark:text-white/10'}`}>
                                    {searchDestination?.name || t('taxi.destinationPlaceholder')}
                                </p>
                            </div>
                        </button>
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
                        disabled={!searchDestination}
                        className={`
                            w-full py-7 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 transition-all
                            ${searchDestination
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
