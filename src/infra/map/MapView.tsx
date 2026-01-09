import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap as useLeafletMap } from 'react-leaflet'
import { LatLngExpression, Icon, divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTheme } from '@/context/ThemeContext'
import { useMap } from './MapProvider'
import { useTaxiStore } from '@/store/taxiStore'

// Tile providers
const TILES = {
    light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
}

// Custom Icons
const startIcon = divIcon({
    html: '<div style="font-size: 32px; filter: drop-shadow(0 4px 4px rgba(0,0,0,0.3));">🟢</div>',
    className: 'bg-transparent',
    iconSize: [32, 32],
    iconAnchor: [16, 30],
})

const endIcon = divIcon({
    html: '<div style="font-size: 32px; filter: drop-shadow(0 4px 4px rgba(0,0,0,0.3));">🔴</div>',
    className: 'bg-transparent',
    iconSize: [32, 32],
    iconAnchor: [16, 30],
})

const carIcon = divIcon({
    html: '<div style="font-size: 40px; filter: drop-shadow(0 4px 4px rgba(0,0,0,0.3)); transform: scaleX(-1);">🚕</div>',
    className: 'bg-transparent',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
})

const userIcon = divIcon({
    html: `
        <div class="relative flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-blue-500 rounded-full animate-ping opacity-40"></div>
            <div class="relative w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
    `,
    className: 'bg-transparent',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
})

interface MapViewProps {
    className?: string
}

// --- Ghost Vehicles (Roaming Taxis) ---
const GhostVehicles = ({ center }: { center: { lat: number, lng: number } }) => {
    const [offsets, setOffsets] = useState<{ id: number, dLat: number, dLng: number }[]>([
        { id: 1, dLat: 0.003, dLng: 0.002 },
        { id: 2, dLat: -0.002, dLng: 0.004 },
        { id: 3, dLat: 0.005, dLng: -0.001 },
        { id: 4, dLat: -0.004, dLng: -0.003 },
        { id: 5, dLat: 0.001, dLng: 0.006 },
    ])

    useEffect(() => {
        const interval = setInterval(() => {
            setOffsets(prev => prev.map(o => ({
                ...o,
                dLat: o.dLat + (Math.random() - 0.5) * 0.0005,
                dLng: o.dLng + (Math.random() - 0.5) * 0.0005,
            })))
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {offsets.map(o => (
                <Marker key={o.id} position={[center.lat + o.dLat, center.lng + o.dLng]} icon={carIcon} opacity={0.4}>
                    <Popup>Available Taxi</Popup>
                </Marker>
            ))}
        </>
    )
}

const MapController = () => {
    const map = useLeafletMap()
    const { state } = useMap()
    const { ride } = useTaxiStore()
    const [hasInitialized, setHasInitialized] = useState(false)

    // 1. Handle Map Resize
    useEffect(() => {
        setTimeout(() => map.invalidateSize(), 100)
    }, [map])

    // 2. Initial Focus on User Location
    useEffect(() => {
        if ((!ride || ride.status === 'IDLE') && !hasInitialized) {
            map.flyTo([state.center.lat, state.center.lng], 15, { duration: 1.5 })
            setHasInitialized(true)
        }
    }, [ride?.status, hasInitialized, map, state.center])

    // 3. Focus on Search Results
    useEffect(() => {
        if (!ride || ride.status === 'IDLE') {
            if (state.destination) {
                map.flyTo([state.destination.lat, state.destination.lng], 16, { duration: 1.5 })
            } else if (state.origin) {
                map.flyTo([state.origin.lat, state.origin.lng], 16, { duration: 1.5 })
            }
        }
    }, [state.destination, state.origin, map, ride?.status])

    // 4. Taxi Status Focusing Logic
    useEffect(() => {
        if (!ride) return

        switch (ride.status) {
            case 'SEARCHING':
            case 'MATCHED':
                // Focus on user
                map.flyTo([ride.origin.lat, ride.origin.lng], 16, { duration: 1 })
                break
            case 'MATCH_ACCEPTED':
            case 'DRIVER_ARRIVING':
                if (ride.driverLocation) {
                    // Try to show both driver and user
                    const bounds: [[number, number], [number, number]] = [
                        [ride.origin.lat, ride.origin.lng],
                        [ride.driverLocation.lat, ride.driverLocation.lng]
                    ]
                    map.flyToBounds(bounds, { padding: [100, 100], duration: 1.5 })
                }
                break
            case 'IN_RIDE':
                if (ride.currentLocation) {
                    map.setView([ride.currentLocation.lat, ride.currentLocation.lng], 17) // Follow closely
                }
                break
            case 'COMPLETED':
                if (ride.destination) {
                    map.flyTo([ride.destination.lat, ride.destination.lng], 15, { duration: 1 })
                }
                break
        }
    }, [ride?.status, ride?.currentLocation, ride?.driverLocation, map])

    return null
}

export const MapView = ({ className = 'w-full h-full' }: MapViewProps) => {
    const { state } = useMap()
    const { theme } = useTheme()
    const { ride } = useTaxiStore()

    const tileUrl = theme === 'dark' ? TILES.dark : TILES.light
    const center: LatLngExpression = [state.center.lat, state.center.lng]

    return (
        <MapContainer
            center={center}
            zoom={state.zoom}
            scrollWheelZoom={true}
            zoomControl={false} // Clean look
            className={`absolute inset-0 z-0 pointer-events-auto ${className}`}
            style={{ height: '100%', width: '100%' }}
        >
            <MapController />
            <TileLayer
                attribution='&copy; OpenStreetMap'
                url={tileUrl}
            />

            {/* User Current Location (Only when Idle & No Origin set in state?)
                Actually, state.origin is what we search.
             */}
            {(!ride || ride.status === 'IDLE') && !state.origin && (
                <Marker position={[state.center.lat, state.center.lng]} icon={userIcon} />
            )}

            {/* Ghost Vehicles (Only when idle) */}
            {(!ride || ride.status === 'IDLE') && <GhostVehicles center={state.center} />}

            {/* --- Global Map Elements derived from Store --- */}

            {/* 1. User Position (Origin) */}
            {ride?.origin && (
                <Marker position={[ride.origin.lat, ride.origin.lng]} icon={startIcon}>
                    <Popup>📍 Pickup</Popup>
                </Marker>
            )}

            {/* 2. Destination */}
            {ride?.destination && (
                <Marker position={[ride.destination.lat, ride.destination.lng]} icon={endIcon}>
                    <Popup>🏁 Destination</Popup>
                </Marker>
            )}

            {/* 3. Driver/Vehicle */}
            {/* Show driver if Matched, Arriving, or In Ride */}
            {ride?.driver && (ride.driverLocation || ride.currentLocation) && (
                <Marker
                    position={[
                        (ride.currentLocation?.lat || ride.driverLocation?.lat || 0),
                        (ride.currentLocation?.lng || ride.driverLocation?.lng || 0)
                    ]}
                    icon={carIcon}
                >
                    <Popup>🚕 {ride.driver.name}</Popup>
                </Marker>
            )}

            {/* 4. Route Polyline */}
            {ride?.routePath && ride.routePath.length > 0 && (
                <Polyline positions={ride.routePath.map(p => [p.lat, p.lng])} color="#22C55E" weight={6} opacity={0.9} />
            )}

            {/* 5. General Search Markers (from MapProvider state, e.g. when searching destination) */}
            {(!ride || ride.status === 'IDLE') && state.destination && (
                <Marker position={[state.destination.lat, state.destination.lng]} icon={endIcon} />
            )}

        </MapContainer>
    )
}

export default MapView
