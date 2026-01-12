import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/hooks/useI18n'
import { glassClasses } from '@/styles/glass'

const MOCK_MART_ITEMS = [
    {
        id: 'mart-1',
        name: 'Organic Pine Nuts',
        price: 45000,
        unit: '500g',
        image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=400&q=80',
        category: 'Food'
    },
    {
        id: 'mart-2',
        name: 'Handmade Cashmere Socks',
        price: 25000,
        unit: 'Pair',
        image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=400&q=80',
        category: 'Apparel'
    },
    {
        id: 'mart-3',
        name: 'Dried Curd (Aaruul)',
        price: 15000,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?auto=format&fit=crop&w=400&q=80',
        category: 'Food'
    }
]

export default function LocalMart() {
    const { t } = useI18n()
    const navigate = useNavigate()

    return (
        <div className="min-h-screen pb-24 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10">
                        <svg className="w-6 h-6 text-text-light dark:text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold text-text-light dark:text-text-dark">Local Mart</h1>
                    <div className="w-10" />
                </div>
            </div>

            <div className="pt-24 px-6 max-w-4xl mx-auto space-y-8">
                {/* Hero */}
                <div className="p-8 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="relative z-10 space-y-2">
                        <h2 className="text-3xl font-black">Local Specialties</h2>
                        <p className="text-white/70 font-medium">Discover authentic products from local artisans and producers.</p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_MART_ITEMS.map(item => (
                        <div key={item.id} className={`${glassClasses} rounded-[2.5rem] overflow-hidden bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/5 group`}>
                            <div className="h-48 overflow-hidden">
                                <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark mt-2">{item.name}</h3>
                                    <p className="text-xs text-sub-light dark:text-sub-dark font-medium">{item.unit}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">₮{item.price.toLocaleString()}</span>
                                    <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold active:scale-95 transition-all">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
