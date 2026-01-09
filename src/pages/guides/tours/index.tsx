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
        <div className="min-h-screen bg-transparent pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        {t('tour.title').split(' adventures')[0]} <span className="text-primary">New Adventures</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl">
                        {t('home.subtitle')}
                    </p>
                </header>

                {/* Filter Bar */}
                <div className="flex overflow-x-auto pb-4 mb-8 no-scrollbar gap-3">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${selectedCategory === cat
                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                                }`}
                        >
                            {t(`tour.category.${cat}`)}
                        </button>
                    ))}
                </div>

                {/* Tour Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTours.map(tour => (
                        <TourCard key={tour.id} tour={tour} />
                    ))}
                </div>

                {filteredTours.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl text-white font-bold">No tours found</h3>
                        <p className="text-white/40">Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TourList
