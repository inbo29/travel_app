import { useLocation } from 'react-router-dom'
import { ExploreMap } from './explore/ExploreMap'
import { TaxiMap } from './taxi/TaxiMap'
import { useTaxiStore } from '@/store/taxiStore'
import { useExploreMapStore } from '@/store/exploreMapStore'

export const MapView = () => {
    const location = useLocation()
    const { ride, searchOrigin, searchDestination } = useTaxiStore()
    const { getFilteredPOIs, getSafetyZones, selectPOI } = useExploreMapStore()
    const isTaxiPath = location.pathname.startsWith('/taxi')

    // Default center (Ulaanbaatar)
    const center = { lat: 47.9186, lng: 106.9170 }

    if (isTaxiPath) {
        return (
            <TaxiMap
                userLocation={center}
                origin={ride?.origin || searchOrigin || undefined}
                destination={ride?.destination || searchDestination || undefined}
                driverLocation={ride?.currentLocation || ride?.driverLocation || undefined}
                bearing={ride?.bearing}
                route={ride?.routePath?.map(p => [p.lat, p.lng] as [number, number]) || []}
                status={ride?.status || 'IDLE'}
            />
        )
    }

    // Default Explore View
    return (
        <ExploreMap
            center={center}
            pois={getFilteredPOIs()}
            safetyZones={getSafetyZones()}
            onPOISelect={selectPOI}
        />
    )
}

export default MapView

