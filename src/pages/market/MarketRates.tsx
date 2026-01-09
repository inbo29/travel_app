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
        <div className="min-h-screen pb-24 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
                <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10">
                        <svg className="w-6 h-6 text-text-light dark:text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold text-text-light dark:text-text-dark">{t('marketPage.title')}</h1>
                    <div className="w-10" />
                </div>
            </div>

            <div className="pt-24 px-6 max-w-md mx-auto space-y-8">
                {/* Intro Card */}
                <div className="p-6 rounded-3xl bg-accent text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                    <h2 className="text-2xl font-black mb-2">{t('marketPage.subtitle')}</h2>
                    <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                        <span>📍 {data?.meta.location || 'Ulaanbaatar'}</span>
                        <span>•</span>
                        <span>{t('marketPage.updated', { date: data?.meta.updatedAt ? new Date(data.meta.updatedAt).toLocaleDateString() : '...' })}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-text-light dark:text-text-dark text-lg">Categories</h3>
                    <button
                        onClick={() => setCurrency(c => c === 'MNT' ? 'USD' : 'MNT')}
                        className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${currency === 'USD'
                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                            }`}
                    >
                        {currency} Mode
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`
                                flex flex-col items-center gap-2 min-w-[4.5rem] p-4 rounded-2xl transition-all
                                ${activeTab === cat.id
                                    ? 'bg-white dark:bg-white/10 shadow-lg scale-105 border border-accent/20'
                                    : 'bg-transparent opacity-50 hover:opacity-100 grayscale hover:grayscale-0'
                                }
                            `}
                        >
                            <span className="text-2xl">{cat.icon}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-text-light dark:text-text-dark">
                                {t(`marketPage.categories.${cat.id}`)}
                            </span>
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-12 text-sub-light dark:text-sub-dark animate-pulse">Loading rates...</div>
                    ) : (
                        <div className="space-y-4 animate-fade-in-up">
                            {filteredItems.map(item => (
                                <div key={item.id} className={`${glassClasses} p-5 rounded-3xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/5 flex items-center justify-between`}>
                                    <div>
                                        <p className="font-bold text-text-light dark:text-text-dark">{item.name}</p>
                                        <p className="text-xs text-sub-light dark:text-sub-dark mt-1 capitalize">{item.unit ? `per ${item.unit}` : ''}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-lg text-accent">
                                            {formatPrice(item.priceRange.min)}
                                            {item.priceRange.min !== item.priceRange.max && ` - ${formatPrice(item.priceRange.max)}`}
                                        </p>
                                        <p className="text-[10px] text-sub-light dark:text-sub-dark font-mono mt-1 opacity-60">
                                            ≈ {currency === 'MNT' ? formatPrice(item.priceRange.min / USD_RATE).replace('₮', '$') : `₮${item.priceRange.min.toLocaleString()}`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Disclaimer */}
                <div className="p-6 rounded-3xl border border-dashed border-slate-300 dark:border-white/10 text-center space-y-3">
                    <p className="text-xs text-sub-light dark:text-sub-dark font-medium leading-relaxed">
                        ⚠️ {t('marketPage.disclaimer')}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-sub-light/50 dark:text-sub-dark/50 uppercase tracking-widest font-bold">
                        <span>{t('marketPage.source')}: {data?.meta.source}</span>
                    </div>

                    <button
                        onClick={() => navigate('/exchange')}
                        className="w-full mt-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-bold text-text-light dark:text-text-dark transition-colors flex items-center justify-center gap-2"
                    >
                        <span>💳 {t('marketPage.convert')}</span>
                        <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="h-12" />
            </div>
        </div>
    )
}
