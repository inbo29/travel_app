export default function Home() {
    return (
        <main className="pt-14 pb-24 md:pb-10 bg-bg-light dark:bg-bg-dark min-h-screen transition-colors duration-300">

            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
                {/* Desktop Layout Grid: Left (Main) | Right (Dashboard) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* LEFT COLUMN (Mobile: Stacked, Desktop: Col-span-8) */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* HERO CARD - Strong Visual */}
                        <section className="relative h-64 md:h-[400px] rounded-3xl overflow-hidden group">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1533035353722-62db69c21d46?q=80&w=2574&auto=format&fit=crop")' }} // Mongolia landscape placeholder
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold bg-accent/20 text-accent backdrop-blur-sm rounded-full">
                                    #TrendingNow
                                </span>
                                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                                    Escape to the <br /> Great Mongolian Steppe
                                </h1>
                                <p className="text-slate-200 text-sm md:text-base mb-6 max-w-lg hidden md:block">
                                    Experience the nomadic lifestyle and endless horizons. A journey you will never forget.
                                </p>
                                <button className="w-full md:w-auto px-8 py-3 bg-accent text-slate-900 font-bold rounded-xl hover:bg-green-400 transition-colors">
                                    Start Journey
                                </button>
                            </div>
                        </section>

                        {/* FEATURED TRIP (Desktop only prominence, Mobile distinct) */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-text-light dark:text-text-dark">Featured Trip</h2>
                                <button className="text-xs text-accent font-semibold hover:underline">View All</button>
                            </div>

                            <div className="bg-white dark:bg-card-dark rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row h-auto md:h-64">
                                <div className="h-48 md:h-full w-full md:w-5/12 bg-slate-200 dark:bg-slate-700 relative">
                                    <img src="https://images.unsplash.com/photo-1542385106-c405908b9829?q=80&w=2670&auto=format&fit=crop" alt="Featured" className="w-full h-full object-cover" />
                                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium border border-white/20">
                                        Editor's Pick
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-yellow-400 text-sm">★★★★★</span>
                                            <span className="text-sub-light dark:text-sub-dark text-xs">4.9 (128 reviews)</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                                            Hidden Valley Trek
                                        </h3>
                                        <p className="text-sub-light dark:text-sub-dark text-sm line-clamp-2 mb-4">
                                            Discover the hidden gems of mountain valleys with our expert local guides. Full board included.
                                        </p>
                                        <div className="flex gap-2">
                                            {['Nature', 'Guided', '3 Days'].map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wide font-bold rounded-md">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <span className="text-caption text-sub-light dark:text-sub-dark text-xs block">From</span>
                                            <span className="text-xl font-bold text-text-light dark:text-text-dark">$450</span>
                                        </div>
                                        <button className="bg-slate-900 dark:bg-slate-700 text-white dark:text-white px-6 py-2 rounded-xl font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* RIGHT COLUMN (Dashboard Style - Sticky on Desktop) */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* QUICK ACTIONS GRID */}
                        {/* Mobile: 4 items grid. Desktop: Dashboard Panel */}
                        <div>
                            <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4 px-1">Quick Access</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { name: 'Taxi', icon: '🚕', color: 'bg-yellow-500/10 text-yellow-500' },
                                    { name: 'Tickets', icon: '🎟️', color: 'bg-indigo-500/10 text-indigo-500' },
                                    { name: 'Rates', icon: '📈', color: 'bg-rose-500/10 text-rose-500' },
                                    { name: 'Store', icon: '🛍️', color: 'bg-emerald-500/10 text-emerald-500' }
                                ].map((item, idx) => (
                                    <button
                                        key={item.name}
                                        className={`
                        ${idx === 0 || idx === 3 ? 'h-32' : 'h-24'} 
                        ${item.color} 
                        rounded-2xl flex flex-col items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all
                        border border-transparent hover:border-current/20
                      `}
                                    >
                                        <span className="text-3xl">{item.icon}</span>
                                        <span className="font-semibold text-sm">{item.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* MINI WIDGET: Exchange Rate (Example) */}
                        <div className="bg-card-light dark:bg-card-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-sm font-semibold text-sub-light dark:text-sub-dark">Exchange Rate</h3>
                                <span className="text-xs text-green-500 font-mono">+0.5%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs">🇺🇸</div>
                                    <span className="font-bold text-lg dark:text-white">1 USD</span>
                                </div>
                                <span className="text-slate-400">≈</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg dark:text-white">3,450 MNT</span>
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-xs">🇲🇳</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* BOTTOM SECTION: Recommended (Full width) */}
                <section className="mt-10">
                    <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Recommended for you</h2>

                    {/* Mobile: Vertical List, Desktop: Grid/Flex */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-card-light dark:bg-card-dark rounded-2xl p-3 border border-slate-200 dark:border-slate-800 hover:border-accent/50 transition-colors group cursor-pointer flex md:block gap-4">
                                <div className="w-24 h-24 md:w-full md:h-40 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden relative shrink-0">
                                    <img src={`https://source.unsplash.com/random/400x300?nature,${i}`} alt="Trip" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <span>★</span> 4.8
                                    </div>
                                </div>

                                <div className="flex-1 py-1 md:pt-3">
                                    <p className="text-xs text-accent font-bold uppercase tracking-wider mb-1">Adventure</p>
                                    <h4 className="font-bold text-text-light dark:text-text-dark text-sm md:text-base leading-tight mb-1">
                                        Scenic Route #{i}
                                    </h4>
                                    <p className="text-xs text-sub-light dark:text-sub-dark mb-2">
                                        2 days · Beginner
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    )
}
