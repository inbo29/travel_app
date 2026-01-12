import { Journey } from '@/types/log'

export const MOCK_JOURNEYS: Journey[] = [
    {
        id: 'j_bali_2023',
        title: 'Bali Adventure 🌴',
        status: 'completed',
        startDate: new Date('2023-10-12').getTime(),
        endDate: new Date('2023-10-20').getTime(),
        coverImage: 'nature/nt2.png', // Reuse existing assets
        origin: { lat: 37.5665, lng: 126.9780, name: 'Seoul, Korea' },
        destination: { lat: -8.4095, lng: 115.1889, name: 'Bali, Indonesia' },
        totalDistance: 1240.5,
        totalSpend: 850,
        days: [
            {
                date: '2023-10-12',
                items: [
                    {
                        id: 't_1',
                        type: 'taxi',
                        source: 'auto',
                        timestamp: new Date('2023-10-12T10:00:00').getTime(),
                        title: 'Taxi to Airport',
                        description: 'Hyundai Ioniq 5 • Driver Kim',
                        amount: 45,
                        currency: '$',
                        location: { lat: 37.5665, lng: 126.9780, name: 'Home' },
                        metadata: {
                            distanceKm: 45,
                            durationMin: 50,
                            routePolyline: [{ lat: 37.5665, lng: 126.9780 }, { lat: 37.4485, lng: 126.4525 }]
                        }
                    },
                    {
                        id: 'pay_1',
                        type: 'payment',
                        source: 'auto',
                        timestamp: new Date('2023-10-12T13:30:00').getTime(),
                        title: 'Duty Free Shop',
                        amount: 120,
                        currency: '$'
                    }
                ]
            },
            {
                date: '2023-10-13',
                items: [
                    {
                        id: 'place_1',
                        type: 'place',
                        source: 'user',
                        timestamp: new Date('2023-10-13T09:00:00').getTime(),
                        title: 'Uluwatu Temple',
                        description: 'Beautiful views from the cliff edge.',
                        location: { lat: -8.8291, lng: 115.0844, name: 'Uluwatu Temple' },
                        photos: ['nature/nt1.png']
                    },
                    {
                        id: 'taxi_2',
                        type: 'taxi',
                        source: 'auto',
                        timestamp: new Date('2023-10-13T14:15:00').getTime(),
                        title: 'Ride to Seminyak',
                        amount: 15,
                        currency: '$',
                        metadata: {
                            distanceKm: 12,
                            routePolyline: [{ lat: -8.8291, lng: 115.0844 }, { lat: -8.6913, lng: 115.1682 }]
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'j_ub_2024',
        title: 'Ulaanbaatar Stay 🇲🇳',
        status: 'active',
        startDate: Date.now() - 86400000 * 2, // Started 2 days ago
        coverImage: 'city/ct1.png',
        totalDistance: 45.2,
        totalSpend: 150000,
        days: [
            {
                date: new Date().toISOString().split('T')[0],
                items: [
                    {
                        id: 't_ub_1',
                        type: 'taxi',
                        source: 'auto',
                        timestamp: Date.now() - 3600000,
                        title: 'Ride to Sukhbaatar Square',
                        description: 'Prius 30 • Driver Bat',
                        amount: 15000,
                        currency: '₮',
                        metadata: {
                            distanceKm: 5.2,
                            routePolyline: [{ lat: 47.910, lng: 106.900 }, { lat: 47.918, lng: 106.917 }]
                        }
                    }
                ]
            }
        ]
    }
]
