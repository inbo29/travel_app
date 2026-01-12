import { Outlet, useLocation } from 'react-router-dom'
import { Header, BottomNav } from '@/ui'
import { useTaxiSimulator } from '@/hooks/useTaxiSimulator'
import { MapProvider } from '@/infra/map/MapProvider'
import { MapView } from '@/infra/map/MapView'

export default function MainLayout() {
    return (
        <MapProvider>
            <MainLayoutContent />
        </MapProvider>
    )
}

function MainLayoutContent() {
    useTaxiSimulator() // Global Simulator
    const location = useLocation()

    // Determine if we should show the map. 
    // For now, let's say map is always there, but maybe hidden on specific text-heavy pages if needed.
    // The user request implies "MapLayer ... Always Maintain".
    const isMapVisible = true

    return (
        <div className="h-full w-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300 overflow-hidden relative flex flex-col">

            {/* Global Background / Map Layer (z-0) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {location.pathname.startsWith('/taxi') || location.pathname.startsWith('/map') ? (
                    <MapView />
                ) : (
                    <div className="absolute inset-0 bg-bg-light dark:bg-bg-dark">
                        {/* Abstract Background Pattern (Nature-inspired Gradient) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white/0 to-emerald-50/50 dark:from-indigo-950/20 dark:to-emerald-950/20" />
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
                        }}></div>
                    </div>
                )}
            </div>

            {/* Header Area (Fixed) */}
            <header className="flex-none z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <Header />
                </div>
            </header>

            {/* Scrollable Content Area */}
            <main className="flex-1 relative z-10 overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 overflow-y-auto no-scrollbar ${location.pathname.startsWith('/taxi') || location.pathname.startsWith('/map') ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                    <Outlet />
                </div>
            </main>

            {/* Bottom Navigation Area (Fixed) */}
            <footer className="flex-none z-50 pointer-events-auto">
                <BottomNav />
            </footer>
        </div>
    )
}
