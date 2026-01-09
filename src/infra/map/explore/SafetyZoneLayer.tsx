import { Circle, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { SafetyZone } from '../types'

const SAFETY_ICONS: Record<string, string> = {
    embassy: '🏛️',
    hospital: '🏥',
    police: '👮',
    safe_area: '✅',
}

const createSafetyIcon = (type: string) => L.divIcon({
    className: 'safety-marker',
    html: `<div style="font-size: 20px; background: #22c55e; padding: 8px; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${SAFETY_ICONS[type] || '✅'}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
})

interface SafetyZoneLayerProps {
    zones: SafetyZone[]
}

export function SafetyZoneLayer({ zones }: SafetyZoneLayerProps) {
    return (
        <>
            {zones.map(zone => (
                <div key={zone.id}>
                    {zone.radius && (
                        <Circle
                            center={[zone.lat, zone.lng]}
                            radius={zone.radius}
                            pathOptions={{
                                color: '#22c55e',
                                fillColor: '#22c55e',
                                fillOpacity: 0.1,
                                weight: 2,
                            }}
                        />
                    )}
                    <Marker
                        position={[zone.lat, zone.lng]}
                        icon={createSafetyIcon(zone.type)}
                    >
                        <Popup>
                            <div className="text-center">
                                <p className="font-bold text-green-600">{zone.name}</p>
                                <p className="text-xs text-slate-500 uppercase">{zone.type.replace('_', ' ')}</p>
                            </div>
                        </Popup>
                    </Marker>
                </div>
            ))}
        </>
    )
}
