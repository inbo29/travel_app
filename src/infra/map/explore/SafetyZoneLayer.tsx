import { Circle, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { SafetyZone } from '../types'

const SAFETY_ICONS: Record<string, string> = {
    embassy: '🏛️',
    hospital: '🏥',
    police: '👮',
    safe_area: '✅',
    danger: '⚠️'
}

const createSafetyIcon = (type: string) => {
    const isDanger = type === 'danger'
    const bgColor = isDanger ? '#ef4444' : '#22c55e'

    return L.divIcon({
        className: 'safety-marker',
        html: `<div style="font-size: 20px; background: ${bgColor}; padding: 8px; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">${SAFETY_ICONS[type] || '✅'}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    })
}

interface SafetyZoneLayerProps {
    zones: SafetyZone[]
}

export function SafetyZoneLayer({ zones }: SafetyZoneLayerProps) {
    return (
        <>
            {zones.map(zone => {
                const isDanger = zone.type === 'danger'
                const color = isDanger ? '#ef4444' : '#22c55e'

                return (
                    <div key={zone.id}>
                        {zone.radius && (
                            <Circle
                                center={[zone.lat, zone.lng]}
                                radius={zone.radius}
                                pathOptions={{
                                    color: color,
                                    fillColor: color,
                                    fillOpacity: 0.15,
                                    weight: 2,
                                    dashArray: isDanger ? '10, 10' : undefined
                                }}
                            />
                        )}
                        <Marker
                            position={[zone.lat, zone.lng]}
                            icon={createSafetyIcon(zone.type)}
                        >
                            <Popup>
                                <div className="text-center p-2">
                                    <p className={`font-bold ${isDanger ? 'text-red-500' : 'text-green-600'}`}>{zone.name}</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">{zone.type.replace('_', ' ')}</p>
                                </div>
                            </Popup>
                        </Marker>
                    </div>
                )
            })}
        </>
    )
}
