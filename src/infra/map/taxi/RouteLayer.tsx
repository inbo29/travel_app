import { Polyline } from 'react-leaflet'

interface RouteLayerProps {
    points: [number, number][] // Array of [lat, lng]
    color?: string
    weight?: number
    dashed?: boolean
}

export function RouteLayer({
    points,
    color = '#22c55e',
    weight = 4,
    dashed = false
}: RouteLayerProps) {
    if (points.length < 2) return null

    return (
        <Polyline
            positions={points}
            pathOptions={{
                color,
                weight,
                opacity: 0.8,
                dashArray: dashed ? '10, 10' : undefined,
            }}
        />
    )
}
