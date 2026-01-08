export const getFallbackImage = (category: string | 'city' | 'nature' | 'people') => {
    const themes = {
        city: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
        nature: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
        people: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
        food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        history: 'https://images.unsplash.com/photo-1508919892451-41846ac14654?auto=format&fit=crop&w=800&q=80',
        adventure: 'https://images.unsplash.com/photo-1533692328991-08159ff19fca?auto=format&fit=crop&w=800&q=80'
    }

    const key = category.toLowerCase() as keyof typeof themes
    return themes[key] || themes.city
}
