import { Tour } from '@/types/tour'

export const TOUR_SCENARIOS = {
    NORMAL: 'normal',
    SOLD_OUT: 'sold_out',
    FREE: 'free',
    NO_REVIEW: 'no_review',
    UPCOMING: 'upcoming',
} as const

export type TourScenario = keyof typeof TOUR_SCENARIOS

// Mock Data
export const mockTours: Tour[] = [
    {
        id: 'tour-001',
        title: 'Gobi Desert Adventure',
        location: 'Gobi, Mongolia',
        duration: '3 days',
        price: 450,
        rating: 4.8,
        languages: ['Mongolian', 'English', 'Korean'],
        images: ['nature_1', 'nature_2'],
        itinerary: ['Ulaanbaatar -> Gobi', 'Sand Dunes', 'Return'],
        description: 'Experience the vast desert landscapes with professional local guides.',
        category: 'Nature',
    },
    {
        id: 'tour-002',
        title: 'Altai Mountain Trek',
        location: 'Bayan-Olgii, Mongolia',
        duration: '5 days',
        price: 1200,
        rating: 4.9,
        languages: ['English'],
        images: ['nature_3'],
        itinerary: ['Flight to Olgii', 'Base Camp', 'Summit Push'],
        description: 'Challenging trek for experienced hikers.',
        category: 'Adventure',
    },

    // ───────── City / Culture ─────────
    {
        id: 'tour-003',
        title: 'Ulaanbaatar City Highlights',
        location: 'Ulaanbaatar, Mongolia',
        duration: '1 day',
        price: 80,
        rating: 4.6,
        languages: ['Mongolian', 'English'],
        images: ['city_1', 'city_2'],
        itinerary: ['Sukhbaatar Square', 'National Museum', 'Zaisan Hill'],
        description: 'Discover the heart of Mongolia’s capital city.',
        category: 'Adventure',
    },
    {
        id: 'tour-004',
        title: 'Buddhist Monastery Tour',
        location: 'Ulaanbaatar, Mongolia',
        duration: '4 hours',
        price: 60,
        rating: 4.7,
        languages: ['Mongolian', 'English', 'Japanese'],
        images: ['culture_1'],
        itinerary: ['Gandan Monastery', 'Meditation Hall'],
        description: 'Explore Mongolia’s Buddhist heritage.',
        category: 'Adventure',
    },

    // ───────── Nature / Relax ─────────
    {
        id: 'tour-005',
        title: 'Terelj National Park Day Trip',
        location: 'Terelj, Mongolia',
        duration: '1 day',
        price: 120,
        rating: 4.8,
        languages: ['Mongolian', 'English'],
        images: ['nature_4'],
        itinerary: ['Turtle Rock', 'Aryabal Temple', 'Hiking'],
        description: 'Perfect nature escape near Ulaanbaatar.',
        category: 'Nature',
    },
    {
        id: 'tour-006',
        title: 'Khuvsgul Lake Experience',
        location: 'Khuvsgul, Mongolia',
        duration: '4 days',
        price: 900,
        rating: 4.9,
        languages: ['English', 'Korean'],
        images: ['nature_5'],
        itinerary: ['Flight North', 'Lake Activities', 'Nomad Visit'],
        description: 'Crystal-clear lakes and peaceful landscapes.',
        category: 'Nature',
    },

    // ───────── Nomad / Experience ─────────
    {
        id: 'tour-007',
        title: 'Nomadic Family Homestay',
        location: 'Arkhangai, Mongolia',
        duration: '2 days',
        price: 250,
        rating: 4.7,
        languages: ['Mongolian', 'English'],
        images: ['nomad_1'],
        itinerary: ['Ger Stay', 'Horse Riding', 'Traditional Meals'],
        description: 'Live like a true Mongolian nomad.',
        category: 'Nature',
    },
    {
        id: 'tour-008',
        title: 'Horseback Riding on the Steppe',
        location: 'Central Mongolia',
        duration: '1 day',
        price: 150,
        rating: 4.5,
        languages: ['Mongolian', 'English'],
        images: ['activity_1'],
        itinerary: ['Safety Briefing', 'Steppe Ride'],
        description: 'Ride across the endless Mongolian steppe.',
        category: 'Adventure',
    },

    // ───────── Food / Lifestyle ─────────
    {
        id: 'tour-009',
        title: 'Mongolian Food Tasting Tour',
        location: 'Ulaanbaatar, Mongolia',
        duration: '3 hours',
        price: 70,
        rating: 4.6,
        languages: ['English', 'Korean'],
        images: ['food_1'],
        itinerary: ['Local Restaurant', 'Street Food', 'Tea Break'],
        description: 'Taste authentic Mongolian cuisine.',
        category: 'Food',
    },

    // ───────── Edge / Free / New ─────────
    {
        id: 'tour-edge-001',
        title: 'Free Walking Tour',
        location: 'Ulaanbaatar, Mongolia',
        duration: '2 hours',
        price: 0,
        rating: 0,
        languages: ['Default'],
        images: ['city_3'],
        itinerary: ['Sukhbaatar Square', 'Gandantegchinlen Monastery'],
        description: 'Free city tour for everyone.',
        category: 'History',
    },
    {
        id: 'tour-new-001',
        title: 'Night City Photography Walk',
        location: 'Ulaanbaatar, Mongolia',
        duration: '2 hours',
        price: 40,
        rating: 0,
        languages: ['English'],
        images: ['city_night_1'],
        itinerary: ['Downtown', 'City Lights'],
        description: 'Newly launched photography walk tour.',
        category: 'Food',
    }
]

