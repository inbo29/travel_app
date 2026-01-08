export type Guide = {
  id: string
  name: string
  avatar: string
  languages: string[]
  specialties: string[]
  rating: number
  pricePerHour: number
  location: string
  bio: string
}

export const MOCK_GUIDES: Guide[] = [
  {
    id: 'g1',
    name: 'Sarah Jenkins',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    languages: ['English', 'Spanish'],
    specialties: ['History', 'Art Museum', 'Local Food'],
    rating: 4.9,
    pricePerHour: 40,
    location: 'Rome, Italy',
    bio: 'Local expert with 10 years of experience showing travelers the hidden gems of the city.'
  },
  {
    id: 'g2',
    name: 'Kenji Tanaka',
    avatar: 'https://i.pravatar.cc/150?u=kenji',
    languages: ['Japanese', 'English'],
    specialties: ['Photography', 'Modern Art', 'Architecture'],
    rating: 5.0,
    pricePerHour: 50,
    location: 'Tokyo, Japan',
    bio: 'Professional photographer and architecture enthusiast ready to show you the best photo spots in Tokyo.'
  }
]
