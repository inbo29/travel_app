import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import { POILayer } from './POILayer'
import { SafetyZoneLayer } from './SafetyZoneLayer'
import { POI, SafetyZone, MapCenter } from '../types'
import 'leaflet/dist/leaflet.css'

// User location icon
const userIcon = L.divIcon({
    className: 'user-marker',
    html: `<div style="width: 20px; height: 20px; background: #3b82f6; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
})

interface ExploreMapProps {
    center: MapCenter
    pois?: POI[]
    safetyZones?: SafetyZone[]
    onPOISelect?: (poi: POI) => void
    showUserLocation?: boolean
}

function MapController({ center }: { center: MapCenter }) {
    const map = useMap()

    useEffect(() => {
        map.setView([center.lat, center.lng], 15, { animate: true })
    }, [center.lat, center.lng, map])

    return null
}

export function ExploreMap({
    center,
    pois = [],
    safetyZones = [],
    onPOISelect,
    showUserLocation = true
}: ExploreMapProps) {
    return (
        <MapContainer
            center={[center.lat, center.lng]}
            zoom={15}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ width: '100%', height: '100%' }}
            className="explore-map"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController center={center} />

            {/* User Location */}
            {showUserLocation && (
                <Marker position={[center.lat, center.lng]} icon={userIcon} />
            )}

            {/* POI Layer */}
            <POILayer pois={pois} onSelect={onPOISelect} />

            {/* Safety Zones */}
            <SafetyZoneLayer zones={safetyZones} />
        </MapContainer>
    )
}
