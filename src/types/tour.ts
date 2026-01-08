export type Tour = {
  id: string
  title: string
  location: string
  duration: string
  price: number
  rating: number
  languages: string[]
  images: string[]
  itinerary: string[]
  description: string
  category: 'History' | 'Nature' | 'Food' | 'Adventure'
}

export const MOCK_TOURS: Tour[] = [
  {
    id: '1',
    title: 'Hidden Gems of Kyoto: Bamboo & Temples',
    location: 'Kyoto, Japan',
    duration: '6 hours',
    price: 85,
    rating: 4.9,
    languages: ['English', 'Japanese'],
    images: ['city_1', 'nature_1'],
    itinerary: [
      'Meeting Point: Kyoto Station',
      'Arashiyama Bamboo Forest',
      'Tenryu-ji Temple Visit',
      'Traditional Japanese Lunch',
      'Kinkaku-ji (Golden Pavilion)',
      'End of Tour at Gion District'
    ],
    description: 'Explore the hidden beauties of Kyoto with our expert guides.',
    category: 'History'
  },
  {
    id: '2',
    title: 'Midnight Street Food Tour',
    location: 'Osaka, Japan',
    duration: '3 hours',
    price: 60,
    rating: 4.8,
    languages: ['English', 'Korean', 'Japanese'],
    images: ['food_1'],
    itinerary: [
      'Dotonbori Street Walk',
      'Takoyaki Tasting',
      'Secret Alley Izakaya',
      'Okonomiyaki Workshop'
    ],
    description: 'Taste the best street food Osaka has to offer under the neon lights.',
    category: 'Food'
  }
]
