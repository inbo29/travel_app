import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { getMarketRates } from '@/services/market.service'
import { MarketCategory, MarketItem, MarketRatesResponse } from '@/types/market'
import { glassClasses } from '@/styles/glass'

const USD_RATE = 3450

export default function MarketRates() {
    const { t } = useI18n()
    const navigate = useNavigate()
    const [currency, setCurrency] = useState<'MNT' | 'USD'>('MNT')
    const [activeTab, setActiveTab] = useState<MarketCategory>('transport')
    const [data, setData] = useState<MarketRatesResponse | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const res = await getMarketRates()
            setData(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const formatPrice = (price: number) => {
        if (currency === 'USD') {
            return `$${(price / USD_RATE).toFixed(2)}`
        }
        return `₮${price.toLocaleString()}`
    }

    const filteredItems = data?.items.filter(item => item.category === activeTab) || []

    const categories: { id: MarketCategory; icon: string }[] = [
        { id: 'transport', icon: '🚕' },
        { id: 'food', icon: '🍜' },
        { id: 'accommodation', icon: '🏨' },
        { id: 'dailyGoods', icon: '🛍️' },
    ]

    return (
        <div className="relative min-h-screen pb-24 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 bg-pattern-dark opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

            <main className="relative z-10 pt-20 md:pt-24 max-w-7xl mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                    {/* Intro Card */}
                    <div className="p-8 md:p-10 rounded-[2.5rem] bg-accent text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-transform group-hover:scale-110 duration-700" />
                        <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
                            {t('marketPage.subtitle')}
                        </h1>
                        <div className="flex items-center gap-3 text-white/90 text-sm font-semibold">
                            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                📍 {data?.meta.location || 'Ulaanbaatar'}
                            </span>
                            <span className="opacity-50">•</span>
                            <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                📅 {data?.meta.updatedAt ? new Date(data.meta.updatedAt).toLocaleDateString() : '...'}
                            </span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between px-2">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-text-light dark:text-text-dark">
                                Categories
                            </h2>
                            <p className="text-xs text-sub-light dark:text-sub-dark mt-1 font-medium italic opacity-70">
                                Local prices for smart travelers
                            </p>
                        </div>
                        <button
                            onClick={() => setCurrency(c => c === 'MNT' ? 'USD' : 'MNT')}
                            className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 ${currency === 'USD'
                                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white/70 hover:bg-slate-300 dark:hover:bg-white/20'
                                }`}
                        >
                            {currency} Mode
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar overflow-visible">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`
                                    relative flex flex-col items-center gap-2 min-w-[5.5rem] p-5 rounded-3xl transition-all duration-500 overflow-visible
                                    ${activeTab === cat.id
                                        ? 'bg-white dark:bg-white/10 shadow-xl border border-accent/20 scale-105'
                                        : 'bg-transparent opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 grayscale hover:grayscale-0'
                                    }
                                `}
                            >
                                <span className="text-3xl">{cat.icon}</span>
                                <span className="text-[11px] font-black uppercase tracking-widest text-text-light dark:text-text-dark">
                                    {t(`marketPage.categories.${cat.id}`)}
                                </span>

                                {activeTab === cat.id && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-accent shadow-sm shadow-accent/50 animate-scale-in" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* List */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-24">
                                <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="text-sub-light dark:text-sub-dark font-bold">Loading rates...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up">
                                {filteredItems.map(item => (
                                    <div key={item.id} className={`${glassClasses} p-7 rounded-[2.5rem] bg-white/70 dark:bg-white/5 border border-white/20 dark:border-white/5 flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group`}>
                                        <div className="space-y-1">
                                            <p className="font-bold text-text-light dark:text-text-dark text-lg group-hover:text-accent transition-colors">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-sub-light dark:text-sub-dark font-semibold tracking-wide uppercase opacity-60">
                                                {item.unit ? `per ${item.unit}` : ''}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-xl text-accent">
                                                {formatPrice(item.priceRange.min)}
                                                {item.priceRange.min !== item.priceRange.max && ` - ${formatPrice(item.priceRange.max)}`}
                                            </p>
                                            <p className="text-[11px] text-sub-light dark:text-sub-dark font-mono mt-1 font-bold opacity-60">
                                                ≈ {currency === 'MNT' ? formatPrice(item.priceRange.min / USD_RATE).replace('₮', '$') : `₮${item.priceRange.min.toLocaleString()}`}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Disclaimer */}
                    <div className="p-8 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-white/20 text-center space-y-4 bg-slate-50/50 dark:bg-white/[0.02]">
                        <p className="text-xs text-sub-light dark:text-sub-dark font-semibold leading-relaxed px-4 opacity-80">
                            ⚠️ {t('marketPage.disclaimer')}
                        </p>
                        <div className="flex items-center justify-center gap-3 text-[10px] text-sub-light/60 dark:text-sub-dark/60 uppercase tracking-[0.2em] font-black">
                            <span>Source: {data?.meta.source || 'Local Market Stats'}</span>
                        </div>

                        <button
                            onClick={() => navigate('/exchange')}
                            className="w-full mt-4 py-4 rounded-[1.5rem] bg-accent/5 dark:bg-accent/10 hover:bg-accent text-accent hover:text-white text-sm font-black transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-accent/40 group"
                        >
                            <span className="scale-125 group-hover:rotate-12 transition-transform">💳</span>
                            <span>{t('marketPage.convert')}</span>
                            <svg className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="h-16" />
                </div>
            </main>
        </div>
    )
}
