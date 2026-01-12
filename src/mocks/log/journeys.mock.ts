import { Journey } from '@/types/log'

const now = Date.now()
const day = 24 * 60 * 60 * 1000

export const MOCK_JOURNEYS: Journey[] = [
    {
        id: 'ub-2026',
        title: 'Ulaanbaatar Stay',
        status: 'completed',
        startDate: now - 5 * day,
        endDate: now - 2 * day,
        coverImage: 'nature/nt1.png',
        origin: { lat: 47.9186, lng: 106.9170, name: 'Chinggis Khaan Airport' },
        destination: { lat: 47.9186, lng: 106.9180, name: 'Blue Sky Hotel' },
        totalDistance: 45.2,
        totalSpend: 125000,
        days: [
            {
                date: new Date(now - 5 * day).toISOString().split('T')[0],
                items: [
                    {
                        id: 'item-1',
                        type: 'taxi',
                        source: 'auto',
                        timestamp: now - 5 * day + 1000 * 60 * 60,
                        title: 'Airport Pickup',
                        description: 'Smooth ride from airport to city center',
                        amount: 35000,
                        currency: '₮',
                        location: { lat: 47.9186, lng: 106.9170, name: 'Airport' },
                        metadata: { taxiId: 'tx-101', driverName: 'Batu', distanceKm: 32.5 }
                    },
                    {
                        id: 'item-2',
                        type: 'place',
                        source: 'user',
                        timestamp: now - 5 * day + 1000 * 60 * 60 * 3,
                        title: 'Blue Sky Hotel',
                        description: 'Checking in. Great view of the square.',
                        location: { lat: 47.9186, lng: 106.9180, name: 'Blue Sky' }
                    }
                ]
            },
            {
                date: new Date(now - 4 * day).toISOString().split('T')[0],
                items: [
                    {
                        id: 'item-3',
                        type: 'ticket',
                        source: 'user',
                        timestamp: now - 4 * day + 1000 * 60 * 60 * 10,
                        title: 'National Museum of Mongolia',
                        description: 'Historical artifacts and cultural tour',
                        amount: 15000,
                        currency: '₮',
                        metadata: { ticketId: 'tkt-882', category: 'museum' }
                    },
                    {
                        id: 'item-4',
                        type: 'payment',
                        source: 'auto',
                        timestamp: now - 4 * day + 1000 * 60 * 60 * 13,
                        title: 'Modern Nomads Lunch',
                        description: 'Traditional Mongolian cuisine',
                        amount: 45000,
                        currency: '₮'
                    }
                ]
            }
        ]
    },
    {
        id: 'bali-2026',
        title: 'Bali Adventure',
        status: 'completed',
        startDate: now - 15 * day,
        endDate: now - 10 * day,
        coverImage: 'nature/nt2.png',
        totalDistance: 120.5,
        totalSpend: 450000,
        days: [
            {
                date: new Date(now - 15 * day).toISOString().split('T')[0],
                items: [
                    {
                        id: 'b-1',
                        type: 'taxi',
                        source: 'auto',
                        timestamp: now - 15 * day + 1000 * 60 * 60,
                        title: 'Denpasar Transfer',
                        amount: 150000,
                        currency: 'Rp',
                        metadata: { distanceKm: 15.2 }
                    },
                    {
                        id: 'b-2',
                        type: 'place',
                        source: 'user',
                        timestamp: now - 15 * day + 1000 * 60 * 60 * 5,
                        title: 'Uluwatu Temple',
                        description: 'Sunset view was amazing.'
                    }
                ]
            }
        ]
    },
    {
        id: 'active-trip-1',
        title: 'Nomadic Expedition',
        status: 'active',
        startDate: now - 1 * day,
        coverImage: 'nature/nt3.png',
        totalDistance: 12.5,
        totalSpend: 8500,
        days: [
            {
                date: new Date(now - 1 * day).toISOString().split('T')[0],
                items: [
                    {
                        id: 'item-active-1',
                        type: 'taxi',
                        source: 'auto',
                        timestamp: now - 1 * day + 1000 * 60 * 60 * 2,
                        title: 'City Center Hub',
                        amount: 8500,
                        currency: '₮',
                        metadata: { distanceKm: 5.2 }
                    }
                ]
            }
        ]
    }
]
