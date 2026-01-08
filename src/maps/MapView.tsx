import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useMap } from './MapProvider'
import { useTheme } from '@/context/ThemeContext'
import { mapStyles } from './mapStyles'

export const MapView = () => {
    const { state } = useMap()
    const { theme } = useTheme()

    // Using a public or placeholder token for demo if env is missing
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiYW50aWdyYXZpdHktZGVtbyIsImEiOiJjbTVveXN6ZzQwMG5tMmtzYmZ2YmZ2YmZ2In0.placeholder'

    return (
        <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={{
                latitude: state.center.lat,
                longitude: state.center.lng,
                zoom: state.zoom,
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle={mapStyles[theme as 'light' | 'dark'] || mapStyles.dark}
        >
            {state.origin && (
                <Marker
                    latitude={state.origin.lat}
                    longitude={state.origin.lng}
                    anchor="bottom"
                >
                    <div className="text-3xl filter drop-shadow-lg">📍</div>
                </Marker>
            )}

            {state.destination && (
                <Marker
                    latitude={state.destination.lat}
                    longitude={state.destination.lng}
                    anchor="bottom"
                >
                    <div className="text-3xl filter drop-shadow-lg">🏁</div>
                </Marker>
            )}

            {state.driverPosition && (
                <Marker
                    latitude={state.driverPosition.lat}
                    longitude={state.driverPosition.lng}
                    anchor="center"
                >
                    <div className="text-3xl filter drop-shadow-lg animate-pulse">🚕</div>
                </Marker>
            )}
        </Map>
    )
}
