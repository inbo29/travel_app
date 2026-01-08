import { useState } from 'react'
import { MOCK_GUIDES } from '@/types/guide'
import { GuideCard } from '@/domains/guides'
import { useI18n } from '@/hooks/useI18n'

const LANGUAGES = ['All', 'English', 'Japanese', 'Korean', 'Spanish']

const GuideList = () => {
    const [selectedLang, setSelectedLang] = useState('All')
    const { t } = useI18n()

    const filteredGuides = selectedLang === 'All'
        ? MOCK_GUIDES
        : MOCK_GUIDES.filter(g => g.languages.includes(selectedLang))

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Find Your <span className="text-primary">Perfect Guide</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl">
                        Connect with local experts who speak your language and share your interests for a truly authentic experience.
                    </p>
                </header>

                {/* Filter Bar */}
                <div className="flex overflow-x-auto pb-4 mb-8 no-scrollbar gap-3">
                    {LANGUAGES.map(lang => (
                        <button
                            key={lang}
                            onClick={() => setSelectedLang(lang)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${selectedLang === lang
                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                                }`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>

                {/* Guide Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredGuides.map(guide => (
                        <GuideCard key={guide.id} guide={guide} />
                    ))}
                </div>

                {filteredGuides.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🤷</div>
                        <h3 className="text-xl text-white font-bold">No guides found</h3>
                        <p className="text-white/40">Try selecting a different language</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GuideList
