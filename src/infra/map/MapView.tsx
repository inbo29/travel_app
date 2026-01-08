import { MapContainer, TileLayer, Marker, Popup, useMap as useLeafletMap } from 'react-leaflet'
import { LatLngExpression, Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTheme } from '@/context/ThemeContext'
import { useMap } from './MapProvider'

// Tile providers for Light and Dark modes
const TILES = {
    light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
}

// Fix for default marker icon issue in Leaflet + bundlers
const defaultIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

interface MapViewProps {
    showUser?: boolean
    showDestination?: boolean
    showTaxi?: boolean
    className?: string
}

export const MapView = ({
    showUser = true,
    showDestination = false,
    showTaxi = false,
    className = 'w-full h-full',
}: MapViewProps) => {
    const { state } = useMap()
    const { theme } = useTheme()

    const tileUrl = theme === 'dark' ? TILES.dark : TILES.light
    const center: LatLngExpression = [state.center.lat, state.center.lng]

    return (
        <MapContainer
            center={center}
            zoom={state.zoom}
            scrollWheelZoom={true}
            className={className}
            style={{ height: '100%', width: '100%', borderRadius: '1.5rem' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={tileUrl}
            />

            {showUser && state.origin && (
                <Marker position={[state.origin.lat, state.origin.lng]} icon={defaultIcon}>
                    <Popup>📍 Your Location</Popup>
                </Marker>
            )}

            {showDestination && state.destination && (
                <Marker position={[state.destination.lat, state.destination.lng]} icon={defaultIcon}>
                    <Popup>🏁 Destination</Popup>
                </Marker>
            )}

            {showTaxi && state.driverPosition && (
                <Marker position={[state.driverPosition.lat, state.driverPosition.lng]} icon={defaultIcon}>
                    <Popup>🚕 Driver</Popup>
                </Marker>
            )}
        </MapContainer>
    )
}

export default MapView
