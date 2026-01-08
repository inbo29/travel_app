import { useNavigate } from 'react-router-dom'
import { glassClasses } from '@/styles/glass'
import { useI18n } from '@/hooks/useI18n'

const QUICK_ACCESS_ITEMS: { key: string, icon: string, highlighted?: boolean, path?: string }[] = [
    { key: 'taxi', icon: '🚕', highlighted: true },
    { key: 'guide', icon: '🧭', highlighted: true },
    { key: 'payme', icon: '💳', highlighted: true, path: '/exchange' },
    { key: 'tickets', icon: '🎫', path: '/tickets' },
    { key: 'translate', icon: '🌐', path: '/translator' },
    { key: 'market', icon: '📊' },
    { key: 'map', icon: '🗺️', path: '/map' },
    { key: 'travelLog', icon: '📔' },
]

export default function HomeMain() {
    const { t } = useI18n()
    const navigate = useNavigate()

    return (
        <div className="space-y-20">
            {/* 1. HERO & QUICK ACCESS (PC Split / Mobile Stack) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Hero Section */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="relative inline-block">
                        <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-wider uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                            {t('home.tag')}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                            <span className="block opacity-90">{t('home.title')}</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">{t('home.titleAccent')}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-white/60 max-w-xl leading-relaxed font-medium">
                            {t('home.subtitle')}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-accent text-white font-bold rounded-2xl hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98] transition-all duration-300">
                            {t('home.start')}
                        </button>
                        <button className={`${glassClasses} px-8 py-4 font-bold rounded-2xl hover:bg-black/5 dark:hover:bg-white/10`}>
                            {t('home.explore')}
                        </button>
                    </div>
                </div>

                {/* Quick Access Group (PC: Floating Grid, Mobile: Distinct Section) */}
                <div className="lg:col-span-5 relative">
                    {/* Decorative Blur Background for PC */}
                    <div className="hidden lg:block absolute -inset-4 bg-accent/10 blur-3xl rounded-full -z-10 animate-pulse"></div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-3 lg:col-span-2 mb-2">
                            <h3 className="text-sm font-bold text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-slate-200 dark:bg-white/10"></span>
                                {t('sections.quickAccess')}
                            </h3>
                        </div>

                        {QUICK_ACCESS_ITEMS.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => item.path && navigate(item.path)}
                                className={`
                                    ${glassClasses}
                                    group relative flex flex-col items-center justify-center gap-3 p-5 rounded-[2rem] h-[180px] text-center
                                    hover:translate-y-[-4px] transition-all duration-300
                                    ${item.highlighted
                                        ? 'border-accent/50 bg-accent/[0.05] dark:bg-accent/[0.1] shadow-[0_0_20px_rgba(34,197,94,0.1)] dark:shadow-[0_0_20px_rgba(34,197,94,0.05)]'
                                        : 'border-white/10 dark:border-white/5 bg-white/5'
                                    }
                                `}
                            >
                                <div className={`w-14 h-14 flex items-center justify-center text-4xl bg-black/[0.03] dark:bg-white/[0.05] rounded-2xl group-hover:scale-110 transition-all duration-500 ${item.highlighted ? 'text-accent bg-accent/10' : ''}`}>
                                    {item.icon}
                                </div>
                                <div className="space-y-1">
                                    <h4 className={`font-bold leading-tight flex items-center justify-center gap-2 ${item.highlighted ? 'text-accent' : 'text-slate-900 dark:text-white'}`}>
                                        {t(`quick.${item.key}.title`)}
                                        {item.highlighted && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>}
                                    </h4>
                                    <p className="text-[11px] font-semibold text-slate-500 dark:text-white/40 leading-tight px-1">
                                        {t(`quick.${item.key}.subtitle`)}
                                    </p>
                                </div>

                                {/* Highly requested: Centered Arrow on hover */}
                                <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <svg className={`w-5 h-5 ${item.highlighted ? 'text-accent' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>

                                {item.highlighted && (
                                    <div className="absolute inset-0 rounded-[2rem] border-2 border-accent/20 pointer-events-none group-hover:border-accent/40 transition-colors"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. EDITOR'S PICK */}
            <section className="">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('sections.editorsPick')}</h2>
                        <p className="text-slate-500 dark:text-white/50 font-medium mt-1">Hand-picked experiences for you</p>
                    </div>
                    <button className="text-accent font-bold text-sm hover:underline decoration-2 underline-offset-4">{t('sections.viewAll')}</button>
                </div>

                <div className={`${glassClasses} rounded-[2.5rem] overflow-hidden group border-white/20 dark:border-white/5 shadow-2xl shadow-black/5`}>
                    <div className="relative h-[400px] md:h-[500px] w-full cursor-pointer">
                        <img
                            src={`${import.meta.env.BASE_URL}nature/nt2.png`}
                            alt="Featured"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                        <div className="absolute top-8 left-8">
                            <span className={`${glassClasses} block px-4 py-2 rounded-xl text-xs font-bold text-white border-white/20 uppercase tracking-widest`}>
                                {t('mock.highlyRecommended')}
                            </span>
                        </div>

                        <div className="absolute bottom-10 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-3">
                                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                    {t('mock.trekTitle')}
                                </h3>
                                <div className="flex items-center gap-4 text-white/70 font-semibold text-sm">
                                    {t('mock.trekFeatures')}
                                </div>
                            </div>
                            <button className="bg-accent text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-accent/20 whitespace-nowrap">
                                {t('mock.bookNow')} — $450
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SECONDARY SECTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Recommended For You */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('sections.recommended')}</h2>
                        <button className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('sections.seeMore')}</button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {[1, 2].map(i => (
                            <div key={i} className={`${glassClasses} group rounded-3xl p-4 flex items-center gap-5 hover:bg-white dark:hover:bg-white/10 cursor-pointer transition-all duration-300`}>
                                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                                    <img src={`${import.meta.env.BASE_URL}nature/nt3.png`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 uppercase tracking-wider">{t('mock.cultural')}</span>
                                    </div>
                                    <h4 className="font-bold text-lg truncate text-slate-900 dark:text-white">{t('mock.altaiTitle')}</h4>
                                    <p className="text-sm text-slate-500 dark:text-white/40 font-medium">{t('mock.altaiFeatures')}</p>
                                </div>
                                <div className="text-right px-2 min-w-[70px]">
                                    <div className="text-accent font-black text-lg">$1,200</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">{t('mock.person')}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Nearby You */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('sections.nearby')}</h2>
                        <button className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('sections.seeMore')}</button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {[1, 2].map(i => (
                            <div key={i} className={`${glassClasses} group rounded-3xl p-4 flex items-center gap-5 hover:bg-white dark:hover:bg-white/10 cursor-pointer transition-all duration-300`}>
                                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                                    <img src={`${import.meta.env.BASE_URL}city/ct1.png`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold text-blue-500 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 uppercase tracking-wider">{t('mock.localStay')}</span>
                                    </div>
                                    <h4 className="font-bold text-lg truncate text-slate-900 dark:text-white">{t('mock.nomadTitle')} #{i}</h4>
                                    <p className="text-sm text-slate-500 dark:text-white/40 font-medium">{t('mock.nomadFeatures')}</p>
                                </div>
                                <div className="text-right px-2 min-w-[70px]">
                                    <div className="text-accent font-black text-lg">$25</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">{t('mock.night')}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
