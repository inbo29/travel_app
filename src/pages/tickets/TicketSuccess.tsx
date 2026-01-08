import { useNavigate, useParams } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'

export default function TicketSuccess() {
    const { t } = useI18n()
    const { id } = useParams()
    const navigate = useNavigate()

    return (
        <div className="pt-24 pb-40 px-6 max-w-2xl mx-auto text-center space-y-12">
            {/* Header Success */}
            <div className="space-y-6">
                <div className="w-24 h-24 rounded-full bg-accent/20 border-4 border-accent flex items-center justify-center text-5xl mx-auto animate-bounce">
                    ✅
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white">{t('tickets.success.title')}</h1>
                    <p className="text-slate-500 dark:text-white/60 font-medium">Your tickets have been sent to your email.</p>
                </div>
            </div>

            {/* QR Card */}
            <div className={`${glassClasses} rounded-[3rem] p-10 space-y-8 border-slate-200 dark:border-white/20 bg-white dark:bg-bg-bg-dark/50 shadow-2xl relative overflow-hidden group`}>
                <div className="absolute top-0 left-0 w-full h-2 bg-accent/50" />

                <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">Forest Music Festival</h3>
                    <p className="text-accent font-bold uppercase tracking-widest text-sm">🗓️ Oct 12, 2024 • 19:00</p>
                </div>

                {/* QR Placeholder */}
                <div className="bg-white p-6 rounded-3xl w-48 h-48 mx-auto flex items-center justify-center relative shadow-inner border border-slate-100">
                    <div className="grid grid-cols-4 gap-2 opacity-10 blur-[1px]">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="w-full h-full bg-black rounded-sm" />
                        ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        🔳
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-slate-100 dark:border-white/10 pt-8 text-left">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">Type</p>
                        <p className="font-bold text-slate-900 dark:text-white">VIP Access</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">Qty</p>
                        <p className="font-bold text-slate-900 dark:text-white">1 Person</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">Venue</p>
                        <p className="font-bold text-slate-900 dark:text-white">Central Park, NY</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">Ref No.</p>
                        <p className="font-bold text-accent">#TKT-{id?.slice(-4).toUpperCase() || '7789'}</p>
                    </div>
                </div>
            </div>

            {/* Final Actions */}
            <div className="space-y-4">
                <button className="w-full py-5 bg-[#000] text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl">
                    <span></span>
                    {t('tickets.success.wallet')}
                </button>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => navigate('/my/tickets')}
                        className={`${glassClasses} py-5 font-bold text-slate-900 dark:text-white rounded-2xl border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm`}
                    >
                        {t('tickets.success.viewMy')}
                    </button>
                    <button
                        onClick={() => navigate('/home')}
                        className={`${glassClasses} py-5 font-bold text-slate-900 dark:text-white rounded-2xl border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm`}
                    >
                        {t('nav.home')}
                    </button>
                </div>
            </div>

            <p className="text-slate-400 dark:text-white/30 text-xs font-medium">
                Need help? <button className="text-accent underline">Contact Support</button>
            </p>
        </div>
    )
}
