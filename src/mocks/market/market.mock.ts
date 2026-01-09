import { MarketRatesResponse } from '@/types/market'

export const marketRatesMock: MarketRatesResponse = {
    meta: {
        source: 'Ubstat (Ulaanbaatar Statistics Department)',
        updatedAt: '2024-12-01T00:00:00Z',
        location: 'Ulaanbaatar',
    },
    items: [
        // Transport
        {
            id: 'taxi_base',
            category: 'transport',
            name: 'Taxi Base Fare',
            priceRange: { min: 1500, max: 2000, currency: 'MNT' },
            unit: 'start',
            lastUpdated: '2024-11-20',
        },
        {
            id: 'taxi_km',
            category: 'transport',
            name: 'Taxi Fare (per km)',
            priceRange: { min: 1500, max: 2000, currency: 'MNT' },
            unit: 'km',
            lastUpdated: '2024-11-20',
        },
        {
            id: 'bus',
            category: 'transport',
            name: 'Public Bus',
            priceRange: { min: 500, max: 500, currency: 'MNT' },
            unit: 'trip',
            lastUpdated: '2024-10-01',
        },

        // Food
        {
            id: 'local_meal',
            category: 'food',
            name: 'Local Meal (Buuz/Khuushuur)',
            priceRange: { min: 8000, max: 12000, currency: 'MNT' },
            unit: 'meal',
            lastUpdated: '2024-12-01',
        },
        {
            id: 'coffee',
            category: 'food',
            name: 'Coffee (Americano)',
            priceRange: { min: 6000, max: 9000, currency: 'MNT' },
            unit: 'cup',
            lastUpdated: '2024-12-01',
        },
        {
            id: 'water',
            category: 'food',
            name: 'Bottled Water (0.5L)',
            priceRange: { min: 1000, max: 1500, currency: 'MNT' },
            unit: 'bottle',
            lastUpdated: '2024-12-01',
        },

        // Accommodation
        {
            id: 'budget_hotel',
            category: 'accommodation',
            name: 'Budget Hotel / Hostel',
            priceRange: { min: 40000, max: 80000, currency: 'MNT' },
            unit: 'night',
            lastUpdated: '2024-11-15',
        },
        {
            id: 'mid_hotel',
            category: 'accommodation',
            name: 'Mid-range Hotel',
            priceRange: { min: 120000, max: 250000, currency: 'MNT' },
            unit: 'night',
            lastUpdated: '2024-11-15',
        },

        // Daily Goods
        {
            id: 'sim_card',
            category: 'dailyGoods',
            name: 'SIM Card (Data 10GB)',
            priceRange: { min: 15000, max: 20000, currency: 'MNT' },
            unit: 'card',
            lastUpdated: '2024-10-20',
        },
        {
            id: 'fuel',
            category: 'dailyGoods',
            name: 'Fuel (A-92)',
            priceRange: { min: 2390, max: 2390, currency: 'MNT' },
            unit: 'liter',
            lastUpdated: '2024-12-05',
        }
    ]
}
