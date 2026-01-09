import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { glassClasses } from '@/styles/glass'

export default function ProfilePage() {
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
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('nav.my')}</h1>
            </div>

            {/* Profile Card */}
            <div className={`${glassClasses} p-8 rounded-[2.5rem] border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-center space-y-4`}>
                <div className="relative inline-block">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white dark:border-white/10 shadow-xl mx-auto"
                    />
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-accent rounded-full border-4 border-white dark:border-bg-dark" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Felix The Traveler</h2>
                    <p className="text-slate-500 dark:text-white/60 font-medium">felix@traveler.com</p>
                </div>
                <div className="pt-4 flex justify-center gap-4">
                    <button className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm">Edit Profile</button>
                    <button className="px-6 py-2 bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white rounded-full font-bold text-sm">Settings</button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className={`${glassClasses} p-6 rounded-3xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-center`}>
                    <div className="text-3xl font-black text-accent">12</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Countries</div>
                </div>
                <div className={`${glassClasses} p-6 rounded-3xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-center`}>
                    <div className="text-3xl font-black text-accent">45</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Trips</div>
                </div>
            </div>
        </div>
    )
}
