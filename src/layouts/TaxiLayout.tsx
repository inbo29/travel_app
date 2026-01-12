import { Outlet } from 'react-router-dom'
import Header from '@/ui/Header'
import { TaxiMap } from '@/infra/map/taxi'
import { useTaxiStore } from '@/store/taxiStore'

/**
 * TaxiLayout - For taxi flow pages
 * Full-screen TaxiMap is pure background (z-0).
 * Content is overlaid (z-10).
 * TaxiHome acts as the controller via Outlet.
 */
export default function TaxiLayout() {
    return (
        <TaxiLayoutContent />
    )
}

function TaxiLayoutContent() {
    const { ride, searchOrigin, searchDestination } = useTaxiStore()

    // Default center (Ulaanbaatar)
    const userLocation = { lat: 47.9186, lng: 106.9170 }

    return (
        <div className="fixed inset-0 overflow-hidden bg-slate-900">
            {/* Map Background - z-0 */}
            <div className="absolute inset-0 z-0 pointer-events-auto">
                <TaxiMap
                    userLocation={userLocation}
                    origin={ride?.origin || searchOrigin || undefined}
                    destination={ride?.destination || searchDestination || undefined}
                    driverLocation={ride?.currentLocation || ride?.driverLocation || undefined}
                    bearing={ride?.bearing}
                    route={ride?.routePath?.map(p => [p.lat, p.lng] as [number, number]) || []}
                    status={ride?.status || 'IDLE'}
                />
            </div>

            {/* Header Overlay - z-50 */}
            <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <Header />
                </div>
            </div>

            {/* Content Panel (Full Screen Overlay) - z-40 
                Allowed to capture events where defined, else pass through.
            */}
            <div className="fixed inset-0 z-40 pointer-events-none">
                <Outlet />
            </div>
        </div>
    )
}
