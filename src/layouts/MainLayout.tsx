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
        <div className="h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300 overflow-hidden relative">

            {/* Global Map Layer (z-0) */}
            {/* Global Map Layer (z-0) */}
            {/* Map should be hidden on Home page to avoid "Map Context" confusion */}
            {(location.pathname !== '/home' && location.pathname !== '/') && (
                <div className="absolute inset-0 z-0">
                    <MapView />
                </div>
            )}

            {/* Application Overlay Structure */}
            <div className="flex-none z-10 pointer-events-none">
                <Header />
            </div>

            <main className="flex-1 relative z-10 pointer-events-none">
                {/* 
                   Pages must be "pointer-events-auto" for their interactive parts.
                   The container is "none" to let clicks pass through to the map.
                */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <Outlet />
                </div>
            </main>

            <div className="flex-none z-10 pointer-events-auto">
                <BottomNav />
            </div>
        </div>
    )
}
