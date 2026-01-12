import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Journey, TimelineItem, DayLog } from '@/types/log'

interface LogStore {
    journeys: Journey[]
    activeJourneyId: string | null

    // Actions
    startJourney: (title: string, origin?: { lat: number; lng: number; name: string }) => string
    endJourney: () => void
    addLogItem: (item: Omit<TimelineItem, 'id'>) => void
    updateJourneyMetadata: (journeyId: string, updates: Partial<Journey>) => void
    deleteJourney: (id: string) => void
}

export const useLogStore = create<LogStore>()(
    persist(
        (set, get) => ({
            journeys: [],
            activeJourneyId: null,

            startJourney: (title, origin) => {
                const id = crypto.randomUUID()
                const newJourney: Journey = {
                    id,
                    title,
                    status: 'active',
                    startDate: Date.now(),
                    coverImage: 'nature/nt1.png', // Default
                    origin,
                    totalDistance: 0,
                    totalSpend: 0,
                    days: []
                }
                set(state => ({
                    journeys: [newJourney, ...state.journeys],
                    activeJourneyId: id
                }))
                return id
            },

            endJourney: () => {
                const { activeJourneyId, journeys } = get()
                if (!activeJourneyId) return

                set({
                    journeys: journeys.map(j =>
                        j.id === activeJourneyId
                            ? { ...j, status: 'completed', endDate: Date.now() }
                            : j
                    ),
                    activeJourneyId: null
                })
            },

            addLogItem: (itemData) => {
                const { activeJourneyId, startJourney } = get()
                let currentJourneyId = activeJourneyId

                // Policy: Auto-start if no active journey
                if (!currentJourneyId) {
                    currentJourneyId = startJourney(`Trip to ${itemData.location?.name || 'Unknown'}`, itemData.location)
                }

                set(state => {
                    const journeyIndex = state.journeys.findIndex(j => j.id === currentJourneyId)
                    if (journeyIndex === -1) return state

                    const journey = { ...state.journeys[journeyIndex] }

                    // 1. Update stats
                    if (itemData.amount) journey.totalSpend += itemData.amount
                    if (itemData.metadata?.distanceKm) journey.totalDistance += itemData.metadata.distanceKm

                    // 2. Add to correct DayLog
                    const dateObj = new Date(itemData.timestamp)
                    const dateKey = dateObj.toISOString().split('T')[0]

                    const dayIndex = journey.days.findIndex(d => d.date === dateKey)
                    const newItem: TimelineItem = { ...itemData, id: crypto.randomUUID() }

                    let newDays = [...journey.days]

                    if (dayIndex >= 0) {
                        // Add to existing day and sort
                        const existingDay = newDays[dayIndex]
                        const newItems = [...existingDay.items, newItem].sort((a, b) => a.timestamp - b.timestamp)
                        newDays[dayIndex] = { ...existingDay, items: newItems }
                    } else {
                        // New day
                        newDays.push({ date: dateKey, items: [newItem] })
                        newDays.sort((a, b) => a.date.localeCompare(b.date))
                    }

                    journey.days = newDays

                    const newJourneys = [...state.journeys]
                    newJourneys[journeyIndex] = journey

                    return { journeys: newJourneys }
                })
            },

            updateJourneyMetadata: (id, updates) => {
                set(state => ({
                    journeys: state.journeys.map(j => j.id === id ? { ...j, ...updates } : j)
                }))
            },

            deleteJourney: (id) => {
                set(state => ({
                    journeys: state.journeys.filter(j => j.id !== id),
                    activeJourneyId: state.activeJourneyId === id ? null : state.activeJourneyId
                }))
            }
        }),
        {
            name: 'travel-log-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)
