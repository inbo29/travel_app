// Shared Map Types
export interface MapCenter {
    lat: number
    lng: number
}

export type LatLng = MapCenter

export const DEFAULT_CENTER: MapCenter = { lat: 47.9186, lng: 106.9170 }
export const DEFAULT_ZOOM = 15

export interface MapState {
    center: MapCenter
    zoom: number
    origin?: MapCenter
    destination?: MapCenter
    driverPosition?: MapCenter
    route?: MapCenter[]
}

export interface POI {
    id: string
    name: string
    category: 'restaurant' | 'cafe' | 'museum' | 'attraction' | 'hotel' | 'shop' | 'shopping'
    lat: number
    lng: number
    rating?: number
    icon: string
    address?: string
}

export interface SafetyZone {
    id: string
    name: string
    type: 'embassy' | 'hospital' | 'police' | 'safe_area' | 'danger'
    lat: number
    lng: number
    radius?: number // meters
    icon: string
}
