import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'

interface ComingSoonProps {
    category: string
    icon?: string
}

const CATEGORY_ICONS: Record<string, string> = {
    // Transport
    bus: '🚌',
    train: '🚆',
    flight: '✈️',
    // Travel
    family: '👨‍👩‍👧‍👦',
    cruise: '🚢',
    healing: '🧘',
    activity: '🏄',
    // Accommodation
    hotel: '🏨',
    motel: '🏠',
    airbnb: '🏡',
    // Service
    charger: '🔋',
    rental: '🚗',
    scooter: '🛴',
    // Insurance
    domestic: '🛡️',
    international: '🌍',
    essential: '⚕️',
    // Generic
    default: '🚀'
}

export default function ComingSoon({ category, icon }: ComingSoonProps) {
    const { t } = useI18n()
    const navigate = useNavigate()

    const displayIcon = icon || CATEGORY_ICONS[category] || CATEGORY_ICONS.default

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Icon */}
                <div className="relative inline-block">
                    <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-6xl shadow-2xl shadow-accent/10">
                        {displayIcon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-pulse">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        {t(`placeholder.${category}.title`, t('placeholder.comingSoon'))}
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                        {t(`placeholder.${category}.description`, t('placeholder.description'))}
                    </p>
                </div>

                {/* Coming Soon Badge */}
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent/20 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                        {t('placeholder.comingSoonBadge')}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        {t('placeholder.goBack')}
                    </button>
                    <button
                        onClick={() => navigate('/home')}
                        className="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-colors"
                    >
                        {t('placeholder.goHome')}
                    </button>
                </div>

                {/* Notification CTA (disabled for now) */}
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                    <button
                        disabled
                        className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-400 font-medium rounded-xl cursor-not-allowed flex items-center gap-2 mx-auto"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {t('placeholder.notifyMe')}
                    </button>
                    <p className="text-xs text-slate-400 mt-2">
                        {t('placeholder.notifyMeHint')}
                    </p>
                </div>
            </div>
        </div>
    )
}
