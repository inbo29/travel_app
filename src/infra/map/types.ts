export type LatLng = {
    lat: number
    lng: number
}

export type MapState = {
    center: LatLng
    zoom: number
    origin?: LatLng
    destination?: LatLng
    route?: LatLng[]
    driverPosition?: LatLng
}

export const DEFAULT_CENTER: LatLng = {
    lat: 47.8864,
    lng: 106.9057,
}

export const DEFAULT_ZOOM = 13
