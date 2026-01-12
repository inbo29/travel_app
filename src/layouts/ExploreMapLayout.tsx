import { Outlet } from 'react-router-dom'
import Header from '@/ui/Header'
import BottomNav from '@/ui/BottomNav'
import { MapProvider } from '@/infra/map/MapProvider'
import { ExploreMap } from '@/infra/map/explore'
import { TaxiFloatingIndicator } from '@/components/TaxiFloatingIndicator'

export default function ExploreMapLayout() {
    return (
        <div className="h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300 overflow-hidden relative">
            <div className="flex-1 relative flex flex-col">
                <MapProvider>
                    <div className="flex flex-col h-full relative">
                        {/* Header */}
                        <div className="flex-none z-30 pointer-events-none">
                            <div className="pointer-events-auto">
                                <Header />
                            </div>
                        </div>

                        {/* Map & Outlet Area */}
                        <div className="flex-1 relative overflow-hidden">
                            {/* The Map (Background) */}
                            <div className="absolute inset-0 pointer-events-auto map-container">
                                <ExploreMap />
                            </div>

                            {/* The UI Layer (Foreground) */}
                            <div className="absolute inset-0 z-10 pointer-events-none map-ui-layer">
                                <Outlet />
                            </div>

                            {/* Floating Indicators */}
                            <div className="absolute bottom-24 right-4 z-40 pointer-events-auto">
                                <TaxiFloatingIndicator />
                            </div>
                        </div>

                        {/* BottomNav */}
                        <div className="flex-none z-30 pointer-events-auto">
                            <BottomNav />
                        </div>
                    </div>
                </MapProvider>
            </div>
        </div>
    )
}
