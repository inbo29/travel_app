import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const BACKGROUNDS = {
    nature: 12, // nt1...nt12
    city: 10,   // ct1...ct10
    people: 10  // pp1...pp10
}

type Category = keyof typeof BACKGROUNDS

export function useRandomBackground() {
    const [bgImage, setBgImage] = useState('')
    const location = useLocation()

    useEffect(() => {
        // 1. Pick a random category
        const categories: Category[] = ['nature', 'city', 'people']
        const randomCategory = categories[Math.floor(Math.random() * categories.length)]

        // 2. Pick a random number based on count
        const count = BACKGROUNDS[randomCategory]
        const randomNum = Math.floor(Math.random() * count) + 1

        // 3. Format path: /category/prefixN.png
        // Prefixes: nature -> nt, city -> ct, people -> pp
        let prefix = ''
        if (randomCategory === 'nature') prefix = 'nt'
        if (randomCategory === 'city') prefix = 'ct'
        if (randomCategory === 'people') prefix = 'pp'

        setBgImage(`/${randomCategory}/${prefix}${randomNum}.png`)
    }, [location.pathname])

    return bgImage
}
