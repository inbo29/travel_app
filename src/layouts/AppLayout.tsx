import { Outlet } from 'react-router-dom'
import { Header, BottomNav } from '@/ui'

export default function AppLayout() {
    return (
        <div className="h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300 overflow-hidden relative">
            {/* Header - Fixed Height Area (approx 64px) */}
            <div className="flex-none z-30 relative">
                <Header />
            </div>

            {/* Main Content - Scrollable Area */}
            <main className="flex-1 relative z-10 overflow-hidden">
                <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <Outlet />
                </div>
            </main>

            {/* Bottom Nav - Fixed Height Area */}
            <div className="flex-none z-30 relative">
                <BottomNav />
            </div>
        </div>
    )
}
