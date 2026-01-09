import { Outlet } from 'react-router-dom'
import Header from '@/ui/Header'
import { TaxiMap } from '@/infra/map/taxi'
import { useTaxiStore } from '@/store/taxiStore'
import { MapProvider, useMap } from '@/infra/map/MapProvider'

/**
 * TaxiLayout - For taxi flow pages
 * Full-screen TaxiMap
 * Fixed header
 * BottomSheet for controls (via Outlet)
 */
export default function TaxiLayout() {
    return (
        <MapProvider>
            <TaxiLayoutContent />
        </MapProvider>
    )
}

function TaxiLayoutContent() {
    const { ride } = useTaxiStore()
    const { state: mapState } = useMap()

    // Default center (Ulaanbaatar)
    const userLocation = { lat: 47.9186, lng: 106.9170 }

    return (
        <div className="fixed inset-0 overflow-hidden">
            {/* Map Background - z-index: 1 */}
            <div className="absolute inset-0 z-[1]">
                <TaxiMap
                    userLocation={userLocation}
                    origin={ride?.origin || mapState.origin}
                    destination={ride?.destination || mapState.destination}
                    driverLocation={ride?.currentLocation || mapState.driverPosition}
                    route={ride?.routePath?.map(p => [p.lat, p.lng] as [number, number]) || []}
                    status={ride?.status || 'IDLE'}
                />
            </div>

            {/* Header Overlay - z-index: 50 */}
            <div className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
                <Header />
            </div>

            {/* Content Panel (BottomSheet) - z-index: 40 */}
            <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-auto">
                <Outlet />
            </div>
        </div>
    )
}
