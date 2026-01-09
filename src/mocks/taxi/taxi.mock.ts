import { TaxiRide, Driver } from '@/types/taxi'

export const mockDriver: Driver = {
    id: 'driver-001',
    name: 'Bat-Erdene',
    rating: 4.9,
    carModel: 'Toyota Prius 30',
    plateNumber: '1234 UBA',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bat',
    phoneNumber: '+976 9911-2233'
}

export const baseRideMock: TaxiRide = {
    id: 'ride-mock-001',
    userId: 'user-001',
    status: 'IDLE',
    origin: { lat: 47.9186, lng: 106.9170 }, // Sukhbaatar Square
    distanceKm: 0,
    durationMin: 0,
    currentFare: 0,
    estimatedFare: 15000,
    currentLocation: { lat: 47.9186, lng: 106.9170 }
}
