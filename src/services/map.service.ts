import { LatLng } from '@/types/taxi'

const OSRM_API_URL = 'https://router.project-osrm.org/route/v1/driving'

export async function fetchRoute(start: LatLng, end: LatLng): Promise<LatLng[]> {
    try {
        // OSRM expects: longitude,latitude
        const startStr = `${start.lng},${start.lat}`
        const endStr = `${end.lng},${end.lat}`

        const response = await fetch(`${OSRM_API_URL}/${startStr};${endStr}?overview=full&geometries=geojson`)
        const data = await response.json()

        if (!data.routes || data.routes.length === 0) {
            throw new Error('No route found')
        }

        const coordinates = data.routes[0].geometry.coordinates // [lng, lat]

        // Convert to [lat, lng] for Leaflet
        return coordinates.map((coord: number[]) => ({
            lat: coord[1],
            lng: coord[0]
        }))
    } catch (error) {
        console.error('Failed to fetch route:', error)
        return []
    }
}
