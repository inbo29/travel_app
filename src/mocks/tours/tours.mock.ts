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
    {
        id: 'tour-edge-001',
        title: 'Free Walking Tour',
        location: 'Ulaanbaatar, Mongolia',
        duration: '2 hours',
        price: 0,
        rating: 0,
        languages: ['Default'],
        images: ['city_1'],
        itinerary: ['Sukhbaatar Square', 'Gandantegchinlen Monastery'],
        description: 'Free city tour for everyone.',
        category: 'History',
    },
]
