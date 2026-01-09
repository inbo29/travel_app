import { MarketRatesResponse } from '@/types/market'

export const marketRatesMock: MarketRatesResponse = {
    meta: {
        source: 'Ubstat (Ulaanbaatar Statistics Department)',
        updatedAt: '2025-01-01T00:00:00Z',
        location: 'Ulaanbaatar',
    },
    items: [
        // ───────────── Transport ─────────────
        {
            id: 'taxi_base',
            category: 'transport',
            name: 'Taxi Base Fare',
            priceRange: { min: 1500, max: 2500, currency: 'MNT' },
            unit: 'start',
            lastUpdated: '2024-12-20',
        },
        {
            id: 'taxi_km',
            category: 'transport',
            name: 'Taxi Fare (per km)',
            priceRange: { min: 1200, max: 1800, currency: 'MNT' },
            unit: 'km',
            lastUpdated: '2024-12-20',
        },
        {
            id: 'ride_app',
            category: 'transport',
            name: 'Ride-hailing App (Avg)',
            priceRange: { min: 1000, max: 1600, currency: 'MNT' },
            unit: 'km',
            lastUpdated: '2024-12-20',
        },
        {
            id: 'bus',
            category: 'transport',
            name: 'Public Bus',
            priceRange: { min: 500, max: 500, currency: 'MNT' },
            unit: 'trip',
            lastUpdated: '2024-11-01',
        },
        {
            id: 'intercity_bus',
            category: 'transport',
            name: 'Intercity Bus (per 100km)',
            priceRange: { min: 12000, max: 18000, currency: 'MNT' },
            unit: 'trip',
            lastUpdated: '2024-11-10',
        },
        {
            id: 'domestic_flight',
            category: 'transport',
            name: 'Domestic Flight (One-way)',
            priceRange: { min: 250000, max: 600000, currency: 'MNT' },
            unit: 'ticket',
            lastUpdated: '2024-12-01',
        },

        // ───────────── Food ─────────────
        {
            id: 'local_meal',
            category: 'food',
            name: 'Local Meal (Buuz / Khuushuur)',
            priceRange: { min: 8000, max: 15000, currency: 'MNT' },
            unit: 'meal',
            lastUpdated: '2025-01-01',
        },
        {
            id: 'mid_restaurant',
            category: 'food',
            name: 'Mid-range Restaurant Meal',
            priceRange: { min: 18000, max: 35000, currency: 'MNT' },
            unit: 'meal',
            lastUpdated: '2025-01-01',
        },
        {
            id: 'western_food',
            category: 'food',
            name: 'Western Restaurant Meal',
            priceRange: { min: 25000, max: 50000, currency: 'MNT' },
            unit: 'meal',
            lastUpdated: '2025-01-01',
        },
        {
            id: 'coffee',
            category: 'food',
            name: 'Coffee (Americano)',
            priceRange: { min: 6000, max: 10000, currency: 'MNT' },
            unit: 'cup',
            lastUpdated: '2025-01-01',
        },
        {
            id: 'beer',
            category: 'food',
            name: 'Local Beer (0.5L)',
            priceRange: { min: 7000, max: 12000, currency: 'MNT' },
            unit: 'glass',
            lastUpdated: '2024-12-15',
        },
        {
            id: 'water',
            category: 'food',
            name: 'Bottled Water (0.5L)',
            priceRange: { min: 1000, max: 2000, currency: 'MNT' },
            unit: 'bottle',
            lastUpdated: '2025-01-01',
        },

        // ───────────── Accommodation ─────────────
        {
            id: 'hostel',
            category: 'accommodation',
            name: 'Hostel (Dorm Bed)',
            priceRange: { min: 25000, max: 45000, currency: 'MNT' },
            unit: 'night',
            lastUpdated: '2024-12-10',
        },
        {
            id: 'budget_hotel',
            category: 'accommodation',
            name: 'Budget Hotel',
            priceRange: { min: 50000, max: 90000, currency: 'MNT' },
            unit: 'night',
            lastUpdated: '2024-12-10',
        },
        {
            id: 'mid_hotel',
            category: 'accommodation',
            name: 'Mid-range Hotel',
            priceRange: { min: 120000, max: 280000, currency: 'MNT' },
            unit: 'night',
            lastUpdated: '2024-12-10',
        },
        {
            id: 'luxury_hotel',
            category: 'accommodation',
            name: 'Luxury Hotel (5-star)',
            priceRange: { min: 400000, max: 900000, currency: 'MNT' },
            unit: 'night',
            lastUpdated: '2024-12-10',
        },
        {
            id: 'ger_camp',
            category: 'accommodation',
            name: 'Ger Camp (Tourist)',
            priceRange: { min: 120000, max: 300000, currency: 'MNT' },
            unit: 'night',
            lastUpdated: '2024-11-20',
        },

        // ───────────── Daily Goods ─────────────
        {
            id: 'sim_card',
            category: 'dailyGoods',
            name: 'SIM Card (Data 10GB)',
            priceRange: { min: 15000, max: 25000, currency: 'MNT' },
            unit: 'card',
            lastUpdated: '2024-12-05',
        },
        {
            id: 'mobile_internet',
            category: 'dailyGoods',
            name: 'Mobile Internet (Unlimited Day Pass)',
            priceRange: { min: 5000, max: 8000, currency: 'MNT' },
            unit: 'day',
            lastUpdated: '2024-12-05',
        },
        {
            id: 'fuel',
            category: 'dailyGoods',
            name: 'Fuel (A-92)',
            priceRange: { min: 2390, max: 2600, currency: 'MNT' },
            unit: 'liter',
            lastUpdated: '2025-01-01',
        },
        {
            id: 'laundry',
            category: 'dailyGoods',
            name: 'Laundry Service (per kg)',
            priceRange: { min: 4000, max: 8000, currency: 'MNT' },
            unit: 'kg',
            lastUpdated: '2024-11-30',
        },

    ]
}

