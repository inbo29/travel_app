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
        <div className="relative min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark transition-colors duration-300 overflow-hidden">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 bg-pattern-dark opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

            <div className="relative z-10 pt-20 max-w-md w-full text-center px-6 space-y-10 animate-fade-in-up">
                {/* Icon */}
                <div className="relative inline-block group">
                    <div className="w-36 h-36 mx-auto rounded-[2.5rem] bg-gradient-to-br from-accent/20 to-accent/5 backdrop-blur-xl border border-white/20 dark:border-white/5 flex items-center justify-center text-7xl shadow-2xl shadow-accent/10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                        {displayIcon}
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg animate-pulse ring-4 ring-white/50 dark:ring-black/50">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        {t(`placeholder.${category}.title`, t('placeholder.comingSoon'))}
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
                        {t(`placeholder.${category}.description`, t('placeholder.description'))}
                    </p>
                </div>

                {/* Coming Soon Badge */}
                <div className="inline-flex items-center gap-3 px-8 py-3.5 bg-accent/10 border-2 border-accent/20 rounded-full shadow-lg shadow-accent/5">
                    <span className="w-3 h-3 rounded-full bg-accent animate-pulse"></span>
                    <span className="text-accent font-black text-xs uppercase tracking-[0.2em]">
                        {t('placeholder.comingSoonBadge')}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 text-slate-700 dark:text-white/80 font-black rounded-2xl hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm transition-all active:scale-95"
                    >
                        {t('placeholder.goBack')}
                    </button>
                    <button
                        onClick={() => navigate('/home')}
                        className="w-full sm:w-auto px-10 py-4 bg-accent text-white font-black rounded-2xl hover:bg-accent/90 shadow-xl shadow-accent/20 transition-all active:scale-95"
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
