export default function Home() {
    const glassPanel = "bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"

    return (
        <main className="pt-20 pb-24 md:pb-10 min-h-screen text-white">

            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Hero & Featured (Col-span-7) */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* 1. HERO SECTION - Transparent, Text directly on background */}
                        <section className="py-10 md:py-20">
                            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-accent/20 text-accent backdrop-blur-sm rounded-full border border-accent/20">
                                #Mongolia2025
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
                                Everything floats <br /> on nature.
                            </h1>
                            <p className="text-lg text-white/90 mb-8 max-w-lg drop-shadow-md">
                                Experience the vast steppes and crystal clear lakes through transparent calmness.
                            </p>
                            <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-accent text-accent font-bold rounded-xl hover:bg-accent hover:text-white transition-all">
                                Start Journey
                            </button>
                        </section>

                        {/* 3. FEATURED CONTENT - Glass Card */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 drop-shadow-md">Editor's Pick</h2>
                            <div className={`${glassPanel} overflow-hidden group`}>
                                <div className="relative h-64 md:h-80 w-full">
                                    {/* Image underneath glass effect */}
                                    <img
                                        src="https://images.unsplash.com/photo-1542385106-c405908b9829?q=80&w=2670&auto=format&fit=crop"
                                        alt="Featured"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                                        Recommended
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-2xl font-bold mb-2">Hidden Valley Trek</h3>
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-3 text-sm text-white/80">
                                                <span>3 Days</span>
                                                <span>•</span>
                                                <span>Guided</span>
                                            </div>
                                            <button className="bg-accent/90 text-white px-5 py-2 rounded-lg font-bold text-sm backdrop-blur-sm hover:bg-accent transition-colors">
                                                Book $450
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* RIGHT COLUMN: Quick Action Hub (Col-span-5) - Floating Control Center */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* 2. QUICK ACTION HUB */}
                        <div className={`${glassPanel} p-6`}>
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent"></span>
                                Quick Access
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                {[
                                    { name: 'Taxi', icon: '🚕', desc: 'Book a ride' },
                                    { name: 'Tickets', icon: '🎟️', desc: 'Events & Travel' },
                                    { name: 'Exchange', icon: '💱', desc: 'Currency Rates' },
                                    { name: 'Translator', icon: '🗣️', desc: 'Voice & Text' },
                                    { name: 'Map', icon: '🗺️', desc: 'Safety Zones' },
                                    { name: 'Travel Log', icon: '📔', desc: 'My Journey' },
                                ].map((item, idx) => (
                                    <button
                                        key={item.name}
                                        className={`
                        flex flex-col items-start justify-center p-4 rounded-xl
                        bg-white/5 hover:bg-white/10 transition-all border border-white/5
                        text-left group relative overflow-hidden
                        ${idx === 0 ? 'col-span-2 flex-row items-center gap-4' : ''}
                      `}
                                    >
                                        <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{item.icon}</div>
                                        <div>
                                            <span className="font-bold block text-sm">{item.name}</span>
                                            <span className="text-xs text-white/50">{item.desc}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 4. SECONDARY SECTION - Nearby */}
                        <div>
                            <h2 className="text-lg font-bold mb-4 drop-shadow-md">Nearby You</h2>
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`${glassPanel} p-3 flex items-center gap-4 hover:bg-white/15 transition-colors cursor-pointer`}>
                                        <div className="w-16 h-16 rounded-lg bg-gray-500 overflow-hidden shrink-0">
                                            <img src={`https://source.unsplash.com/random/200x200?mongolia,${i}`} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold truncate">Nomad Home Stay #{i}</h4>
                                            <p className="text-xs text-white/60">2.5km away • Cultural</p>
                                        </div>
                                        <div className="text-accent font-bold text-sm">$25</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}
