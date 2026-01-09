import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { POI } from '../types'

// POI Icons by category
const POI_ICONS: Record<string, string> = {
    restaurant: '🍽️',
    cafe: '☕',
    museum: '🏛️',
    attraction: '📍',
    hotel: '🏨',
    shop: '🛍️',
}

const createPOIIcon = (category: string) => L.divIcon({
    className: 'poi-marker',
    html: `<div style="font-size: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${POI_ICONS[category] || '📍'}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
})

interface POILayerProps {
    pois: POI[]
    onSelect?: (poi: POI) => void
}

export function POILayer({ pois, onSelect }: POILayerProps) {
    return (
        <>
            {pois.map(poi => (
                <Marker
                    key={poi.id}
                    position={[poi.lat, poi.lng]}
                    icon={createPOIIcon(poi.category)}
                    eventHandlers={{
                        click: () => onSelect?.(poi)
                    }}
                >
                    <Popup>
                        <div className="text-center">
                            <p className="font-bold">{poi.name}</p>
                            {poi.rating && <p className="text-sm text-amber-500">⭐ {poi.rating}</p>}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}
