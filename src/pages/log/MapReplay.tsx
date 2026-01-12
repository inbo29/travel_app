import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { TimelineItem } from '@/types/log'
import { useTheme } from '@/context/ThemeContext'

// Fix default icon issues
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl: iconMarker,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

interface MapReplayProps {
    items: TimelineItem[]
}

const taxiIcon = L.divIcon({
    className: 'taxi-replay-icon',
    html: '<div style="font-size: 24px;">🚕</div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
})

function MapController({ items }: { items: TimelineItem[] }) {
    const map = useMap()

    useEffect(() => {
        if (items.length === 0) return

        const bounds = L.latLngBounds([])
        let hasPoints = false

        items.forEach(item => {
            if (item.type === 'taxi' && item.metadata?.routePolyline) {
                (item.metadata.routePolyline as { lat: number, lng: number }[]).forEach(p => {
                    bounds.extend([p.lat, p.lng])
                    hasPoints = true
                })
            }
            if (item.location) {
                bounds.extend([item.location.lat, item.location.lng])
                hasPoints = true
            }
        })

        if (hasPoints) {
            map.fitBounds(bounds, { padding: [50, 50] })
        }
    }, [items, map])

    return null
}

export default function MapReplay({ items }: MapReplayProps) {
    const { theme } = useTheme()
    const tileUrl = theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    // Filter only items with location or path
    const mapItems = items.filter(i => i.location || (i.type === 'taxi' && i.metadata?.routePolyline))

    return (
        <div className="h-[500px] w-full rounded-[3rem] overflow-hidden border-2 border-slate-200 dark:border-white/10 shadow-2xl relative">
            <MapContainer
                center={[47.9186, 106.9170]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    key={theme}
                    attribution='&copy; OpenStreetMap'
                    url={tileUrl}
                />
                <MapController items={mapItems} />

                {mapItems.map(item => {
                    if (item.type === 'taxi' && item.metadata?.routePolyline) {
                        return (
                            <Polyline
                                key={item.id}
                                positions={item.metadata.routePolyline.map((p: any) => [p.lat, p.lng])}
                                color={theme === 'dark' ? '#fbbf24' : '#d97706'}
                                weight={4}
                                opacity={0.8}
                                dashArray="10, 10"
                            />
                        )
                    }
                    return null
                })}

                {mapItems.map(item => (
                    item.location && (
                        <Marker
                            key={`marker-${item.id}`}
                            position={[item.location.lat, item.location.lng]}
                        >
                            <Popup>
                                <div className="text-slate-900 font-bold">
                                    {item.title}
                                    {item.amount && <div className="text-accent">{item.currency}{item.amount}</div>}
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>

            {/* Overlay Controls (Placeholder for Playback) */}
            <div className="absolute bottom-6 left-6 right-6 pointer-events-none flex justify-center">
                {/* Play Button could go here */}
            </div>
        </div>
    )
}
