import { ThemeToggle } from '@/components/ThemeToggle'

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/70 dark:bg-bg-dark/50 backdrop-blur-xl border-b border-black/[0.03] dark:border-white/[0.03] transition-all duration-300">
            <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between gap-4">
                {/* Left: Logo */}
                <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-2xl tracking-tighter text-slate-900 dark:text-white">
                        Trap
                    </span>
                </div>

                {/* Center: Search (PC/Mobile unified but responsive) */}
                <div className="flex-1 max-w-xl relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-slate-400 dark:text-white/40 group-focus-within:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Trip / Guide / Place"
                        className="w-full bg-black/[0.03] dark:bg-white/[0.05] backdrop-blur-md border border-black/5 dark:border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-accent/30 focus:bg-white/90 dark:focus:bg-white/10 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 transition-all font-medium"
                    />
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <ThemeToggle />

                    <button className="hidden sm:flex p-2.5 text-slate-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors relative">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white dark:border-bg-dark" />
                    </button>

                    <button className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/10 overflow-hidden ring-2 ring-transparent hover:ring-accent/50 transition-all group p-0.5">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover rounded-[10px]" />
                    </button>
                </div>
            </div>
        </header>
    )
}
