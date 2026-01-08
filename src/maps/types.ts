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
