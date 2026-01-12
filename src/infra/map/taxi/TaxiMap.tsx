import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import { DriverMarker } from './DriverMarker'
import { RouteLayer } from './RouteLayer'
import 'leaflet/dist/leaflet.css'
import { useTheme } from '@/context/ThemeContext'

// Icons
const originIcon = L.divIcon({
    className: 'origin-marker',
    html: `<div style="width: 16px; height: 16px; background: #22c55e; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
})

const destinationIcon = L.divIcon({
    className: 'destination-marker',
    html: `<div style="font-size: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">📍</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
})

interface TaxiMapProps {
    userLocation: { lat: number; lng: number }
    origin?: { lat: number; lng: number }
    destination?: { lat: number; lng: number }
    driverLocation?: { lat: number; lng: number }
    bearing?: number
    route?: [number, number][]
    status: string // Accepts any TaxiStatus
}

function MapController({
    userLocation,
    origin,
    destination,
    driverLocation,
    status
}: Omit<TaxiMapProps, 'route' | 'bearing'>) {
    const map = useMap()

    useEffect(() => {
        if (!map) return

        if (status === 'IDLE' || status === 'SEARCHING') {
            if (origin && destination) {
                const bounds = L.latLngBounds([[origin.lat, origin.lng], [destination.lat, destination.lng]])
                map.flyToBounds(bounds, { padding: [100, 100], duration: 1.5 })
            } else if (origin) {
                map.flyTo([origin.lat, origin.lng], 16, { duration: 1.5 })
            } else if (destination) {
                map.flyTo([destination.lat, destination.lng], 16, { duration: 1.5 })
            } else {
                map.flyTo([userLocation.lat, userLocation.lng], 15, { duration: 1 })
            }
        } else if (status === 'MATCHED' || status === 'MATCH_ACCEPTED' || status === 'DRIVER_ARRIVING') {
            if (driverLocation && origin) {
                const bounds = L.latLngBounds([
                    [driverLocation.lat, driverLocation.lng],
                    [origin.lat, origin.lng]
                ])
                map.flyToBounds(bounds, { padding: [120, 120], duration: 1.5 })
            }
        } else if (status === 'IN_RIDE') {
            if (driverLocation && destination) {
                const bounds = L.latLngBounds([
                    [driverLocation.lat, driverLocation.lng],
                    [destination.lat, destination.lng]
                ])
                map.flyToBounds(bounds, { padding: [120, 120], duration: 1.5 })
            }
        }
    }, [status, driverLocation?.lat, driverLocation?.lng, origin?.lat, origin?.lng, destination?.lat, destination?.lng])

    return null
}



const TILES = {
    light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
}

export function TaxiMap({
    userLocation,
    origin,
    destination,
    driverLocation,
    bearing = 0,
    route = [],
    status
}: TaxiMapProps) {
    const { theme } = useTheme()
    const tileUrl = theme === 'dark' ? TILES.dark : TILES.light

    return (
        <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={15}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ width: '100%', height: '100%' }}
            className="taxi-map"
        >
            <TileLayer
                key={theme}
                attribution='&copy; OpenStreetMap'
                url={tileUrl}
            />

            <MapController
                userLocation={userLocation}
                origin={origin}
                destination={destination}
                driverLocation={driverLocation}
                status={status}
            />

            {/* Route */}
            {route.length > 1 && <RouteLayer points={route} />}

            {/* Origin marker */}
            {origin && status !== 'IDLE' && (
                <Marker position={[origin.lat, origin.lng]} icon={originIcon} />
            )}

            {/* Destination marker */}
            {destination && (
                <Marker position={[destination.lat, destination.lng]} icon={destinationIcon} />
            )}

            {/* Driver marker */}
            {driverLocation && (status === 'DRIVER_ARRIVING' || status === 'IN_RIDE') && (
                <DriverMarker lat={driverLocation.lat} lng={driverLocation.lng} rotation={bearing} />
            )}
        </MapContainer>
    )
}
