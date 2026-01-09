import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { glassClasses } from '@/styles/glass'

export default function ExchangePage() {
    const { t } = useI18n()
    const navigate = useNavigate()

    return (
        <div className="pt-24 pb-32 px-6 max-w-lg mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all shrink-0"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('nav.payme')}</h1>
            </div>

            {/* Content */}
            <div className={`${glassClasses} p-8 rounded-[2.5rem] border-slate-200 dark:border-white/10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-2xl space-y-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />

                <div className="relative">
                    <p className="text-white/80 font-medium">Total Balance</p>
                    <h2 className="text-4xl font-black mt-2">$2,450.50</h2>
                    <p className="text-white/60 text-sm mt-1">≈ ₮ 8,454,225</p>
                </div>

                <div className="flex gap-4 relative">
                    <button className="flex-1 py-3 bg-white text-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
                        <span>⬇️ Top Up</span>
                    </button>
                    <button className="flex-1 py-3 bg-white/20 text-white rounded-xl font-bold flex items-center justify-center gap-2 border border-white/30 backdrop-blur-md">
                        <span>🔄 Exchange</span>
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Recent Transactions</h3>
                {[1, 2, 3].map(i => (
                    <div key={i} className={`${glassClasses} p-4 rounded-2xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 flex items-center justify-between`}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-xl">☕</div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white">Coffee Shop</p>
                                <p className="text-xs text-slate-500 dark:text-white/50">Today, 10:23 AM</p>
                            </div>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">- $4.50</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
