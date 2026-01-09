import { LatLng } from '@/types/taxi'

export function calculateDistance(p1: LatLng, p2: LatLng): number {
    const R = 6371e3 // metres
    const φ1 = p1.lat * Math.PI / 180
    const φ2 = p2.lat * Math.PI / 180
    const Δφ = (p2.lat - p1.lat) * Math.PI / 180
    const Δλ = (p2.lng - p1.lng) * Math.PI / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
}

export function calculateBearing(start: LatLng, end: LatLng): number {
    const startLat = start.lat * Math.PI / 180
    const startLng = start.lng * Math.PI / 180
    const endLat = end.lat * Math.PI / 180
    const endLng = end.lng * Math.PI / 180

    const y = Math.sin(endLng - startLng) * Math.cos(endLat)
    const x = Math.cos(startLat) * Math.sin(endLat) -
        Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng)

    const θ = Math.atan2(y, x)
    const brng = (θ * 180 / Math.PI + 360) % 360
    return brng
}
