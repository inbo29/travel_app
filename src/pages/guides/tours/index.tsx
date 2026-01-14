import { useState } from 'react'
import { MOCK_TOURS } from '@/types/tour'
import { TourCard } from '@/domains/tours'
import { useI18n } from '@/hooks/useI18n'

const CATEGORIES = ['all', 'history', 'nature', 'food', 'adventure']

const TourList = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const { t } = useI18n()

    const filteredTours = selectedCategory === 'all'
        ? MOCK_TOURS
        : MOCK_TOURS.filter(t => t.category.toLowerCase() === selectedCategory)

    return (
        <div className="relative min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 bg-pattern-dark opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

            <main className="relative z-10 pt-20 md:pt-24 max-w-7xl mx-auto px-4 md:px-6 pb-32">
                <div className="space-y-10 animate-fade-in">
                    {/* Header: Title & Description */}
                    <header className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Explore Tours
                        </h1>
                        <p className="text-slate-500 dark:text-white/50 font-medium italic">
                            {t('home.subtitle')}
                        </p>
                    </header>

                    {/* Filter Bar */}
                    <div className="sticky top-16 z-20 py-4 -mx-4 px-4 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md space-y-4">
                        <div className="flex gap-3 overflow-x-auto no-scrollbar">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`
                                        px-6 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all border whitespace-nowrap
                                        ${selectedCategory === cat
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg'
                                            : 'bg-transparent border-slate-200 dark:border-white/20 text-slate-500 dark:text-white/50 hover:border-slate-400 dark:hover:border-white/50'
                                        }
                                    `}
                                >
                                    {t(`tour.category.${cat}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tour Grid */}
                    <section className="space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredTours.map(tour => (
                                <TourCard key={tour.id} tour={tour} />
                            ))}
                        </div>

                        {filteredTours.length === 0 && (
                            <div className="text-center py-32 space-y-6 bg-slate-50/50 dark:bg-white/[0.02] rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10">
                                <div className="text-8xl animate-bounce grayscale opacity-30">🔍</div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">No tours found</h3>
                                    <p className="text-slate-500 dark:text-white/40">Try selecting a different category</p>
                                </div>
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {filteredTours.length > 0 && (
                            <div className="flex items-center justify-center gap-2 pt-12">
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 opacity-50 cursor-not-allowed">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                {[1, 2, 3].map(page => (
                                    <button
                                        key={page}
                                        className={`w-10 h-10 rounded-xl font-black text-sm transition-all
                                            ${page === 1
                                                ? 'bg-accent text-white shadow-md'
                                                : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-white/10'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    )
}

export default TourList
