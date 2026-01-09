import { Outlet } from 'react-router-dom'
import { Header, BottomNav } from '@/ui'
import { MapProvider } from '@/infra/map/MapProvider'
import { MapView } from '@/infra/map/MapView'

export default function MapLayout() {
    return (
        <div className="h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300 overflow-hidden relative">

            {/* Map Context Provider wraps everything in the main area */}
            <div className="flex-1 relative flex flex-col">
                <MapProvider>
                    {/* 1. Header (Overlay on Top of Map?) 
                       User's structure implies Header is outside MapProvider in standard layout, 
                       but "MapLayout" description had Header ABOVE the map div.
                       Let's stick to the visible structure:
                       Header
                       Map Area
                       BottomNav
                   */}

                    {/* Actually, if we want the map to act as background for the whole screen including behind Header?
                       The user said "Header -> Map -> BottomNav".
                       So Map is SANDWICHED.
                   */}

                    {/* Layout Construction */}
                    <div className="flex flex-col h-full relative">
                        {/* Header */}
                        <div className="flex-none z-30 pointer-events-none">
                            {/* Keep Header interactive? User said "pointer-events: auto" for specific layers.
                                 Header usually contains interactive buttons.
                                 Let's wrap Header in a div that allows clicks.
                             */}
                            <div className="pointer-events-auto">
                                <Header />
                            </div>
                        </div>

                        {/* Map & Outlet Area */}
                        <div className="flex-1 relative overflow-hidden">
                            {/* The Map (Background) */}
                            <div className="absolute inset-0 pointer-events-auto map-container">
                                <MapView />
                            </div>

                            {/* The UI Layer (Foreground) */}
                            <div className="absolute inset-0 z-10 pointer-events-none map-ui-layer">
                                <Outlet />
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
