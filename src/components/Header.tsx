import { ThemeToggle } from '@/components/ThemeToggle'

export default function Header() {

    return (
        <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-black/30 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl tracking-tight text-white drop-shadow-md">
                        Trap
                    </span>
                </div>

                {/* Center: Search (Desktop only) */}
                <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                    <input
                        type="text"
                        placeholder="Search for trips, guides..."
                        className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-accent/50 outline-none text-white placeholder-white/60"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {/* Mobile Search Icon */}
                    <button className="md:hidden p-2 text-white/80 hover:bg-white/10 rounded-full">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Notification */}
                    <button className="p-2 text-white/80 hover:bg-white/10 rounded-full relative">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500/90 rounded-full border border-white/20" />
                    </button>

                    {/* Profile */}
                    <button className="w-8 h-8 rounded-full bg-white/20 overflow-hidden ring-2 ring-transparent hover:ring-accent/50 transition-all">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
                    </button>
                </div>
            </div>
        </header>
    )
}
