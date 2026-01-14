import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'

interface CategorySideMenuProps {
    isOpen: boolean
    onClose: () => void
}

interface CategoryItem {
    key: string
    icon: string
    path?: string
    children?: { key: string; label: string; path: string }[]
}

const CATEGORIES: CategoryItem[] = [
    {
        key: 'payme',
        icon: '💳',
        children: [
            { key: 'payment', label: 'category.payme.payment', path: '/exchange' },
            { key: 'taxfree', label: 'category.payme.taxfree', path: '/exchange/taxfree' },
            { key: 'topup', label: 'category.payme.topup', path: '/exchange/topup' },
            { key: 'card', label: 'category.payme.card', path: '/exchange/card' },
            { key: 'history', label: 'category.payme.history', path: '/exchange/history' },
        ]
    },
    {
        key: 'transport',
        icon: '🚌',
        children: [
            { key: 'bus', label: 'category.transport.bus', path: '/transport/bus' },
            { key: 'train', label: 'category.transport.train', path: '/transport/train' },
            { key: 'flight', label: 'category.transport.flight', path: '/transport/flight' },
        ]
    },
    { key: 'taxi', icon: '🚕', path: '/taxi' },
    {
        key: 'travel',
        icon: '✈️',
        children: [
            { key: 'family', label: 'category.travel.family', path: '/travel/family' },
            { key: 'cruise', label: 'category.travel.cruise', path: '/travel/cruise' },
            { key: 'healing', label: 'category.travel.healing', path: '/travel/healing' },
            { key: 'activity', label: 'category.travel.activity', path: '/travel/activity' },
            { key: 'tour', label: 'category.travel.tour', path: '/guides/tours' },
        ]
    },
    {
        key: 'accommodation',
        icon: '🏨',
        children: [
            { key: 'hotel', label: 'category.accommodation.hotel', path: '/accommodation/hotel' },
            { key: 'motel', label: 'category.accommodation.motel', path: '/accommodation/motel' },
            { key: 'airbnb', label: 'category.accommodation.airbnb', path: '/accommodation/airbnb' },
        ]
    },
    {
        key: 'tickets',
        icon: '🎫',
        children: [
            { key: 'performance', label: 'category.tickets.performance', path: '/tickets/performance' },
            { key: 'concert', label: 'category.tickets.concert', path: '/tickets/concert' },
            { key: 'museum', label: 'category.tickets.museum', path: '/tickets/museum' },
            { key: 'opera', label: 'category.tickets.opera', path: '/tickets/opera' },
            { key: 'admission', label: 'category.tickets.admission', path: '/tickets' },
        ]
    },
    {
        key: 'guide',
        icon: '🧭',
        children: [
            { key: 'guide', label: 'category.guide.guide', path: '/guides/guides' },
            { key: 'interpreter', label: 'category.guide.interpreter', path: '/guides/interpreter' },
        ]
    },
    {
        key: 'localProduct',
        icon: '🛍️',
        children: [
            { key: 'souvenir', label: 'category.localProduct.souvenir', path: '/local-mart?cat=souvenir' },
            { key: 'food', label: 'category.localProduct.food', path: '/local-mart?cat=food' },
            { key: 'clothing', label: 'category.localProduct.clothing', path: '/local-mart?cat=clothing' },
        ]
    },
    {
        key: 'service',
        icon: '🔌',
        children: [
            { key: 'charger', label: 'category.service.charger', path: '/service/charger' },
            { key: 'rental', label: 'category.service.rental', path: '/service/rental' },
            { key: 'scooter', label: 'category.service.scooter', path: '/service/scooter' },
        ]
    },
    {
        key: 'market',
        icon: '📊',
        children: [
            { key: 'exchange', label: 'category.market.exchange', path: '/market-rates' },
            { key: 'price', label: 'category.market.price', path: '/market-rates?tab=price' },
            { key: 'transport', label: 'category.market.transport', path: '/market-rates?tab=transport' },
            { key: 'calculator', label: 'category.market.calculator', path: '/market-rates?tab=calc' },
        ]
    },
    {
        key: 'travelLog',
        icon: '📔',
        children: [
            { key: 'auto', label: 'category.travelLog.auto', path: '/travel-log' },
            { key: 'manual', label: 'category.travelLog.manual', path: '/travel-log?mode=manual' },
            { key: 'ai', label: 'category.travelLog.ai', path: '/travel-log?mode=ai' },
            { key: 'export', label: 'category.travelLog.export', path: '/travel-log?mode=export' },
        ]
    },
    { key: 'map', icon: '🗺️', path: '/map' },
    {
        key: 'insurance',
        icon: '🛡️',
        children: [
            { key: 'domestic', label: 'category.insurance.domestic', path: '/insurance/domestic' },
            { key: 'international', label: 'category.insurance.international', path: '/insurance/international' },
            { key: 'essential', label: 'category.insurance.essential', path: '/insurance/essential' },
        ]
    },
    {
        key: 'translate',
        icon: '🌐',
        children: [
            { key: 'text', label: 'category.translate.text', path: '/translate/text' },
            { key: 'voice', label: 'category.translate.voice', path: '/translate/voice' },
            { key: 'conversation', label: 'category.translate.conversation', path: '/translate/conversation' },
            { key: 'ocr', label: 'category.translate.ocr', path: '/translate/ocr' },
        ]
    },
]

export default function CategorySideMenu({ isOpen, onClose }: CategorySideMenuProps) {
    const { t } = useI18n()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    const handleNavigate = (path: string) => {
        navigate(path)
        onClose()
    }

    const toggleCategory = (key: string) => {
        setExpandedCategory(prev => prev === key ? null : key)
    }

    const filteredCategories = searchQuery
        ? CATEGORIES.filter(cat =>
            t(`category.${cat.key}.title`).toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.children?.some(child => t(child.label).toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : CATEGORIES

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Side Panel */}
            <div
                className={`fixed top-0 left-0 z-[101] h-full w-[85%] max-w-[360px] bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {t('category.title')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Search */}
                <div className="p-4">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder={t('category.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                    </div>
                </div>

                {/* Category List */}
                <div className="flex-1 overflow-y-auto max-h-[calc(100vh-140px)] overscroll-contain">
                    <div className="px-2 pb-24">
                        {filteredCategories.map((category) => (
                            <div key={category.key} className="mb-1">
                                {/* Category Header */}
                                <button
                                    onClick={() => category.path
                                        ? handleNavigate(category.path)
                                        : toggleCategory(category.key)
                                    }
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{category.icon}</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">
                                            {t(`category.${category.key}.title`)}
                                        </span>
                                    </div>
                                    {category.children && (
                                        <svg
                                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedCategory === category.key ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </button>

                                {/* Subcategories */}
                                {category.children && expandedCategory === category.key && (
                                    <div className="ml-10 mt-1 mb-2 space-y-1">
                                        {category.children.map((child) => (
                                            <button
                                                key={child.key}
                                                onClick={() => handleNavigate(child.path)}
                                                className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                                            >
                                                {t(child.label)}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
