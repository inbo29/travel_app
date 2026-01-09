import { ENV } from '@/config/env'

export const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms))

export const log = (scope: string, message: string, data?: any) => {
    if (!ENV.ENABLE_LOG) return
    console.info(`%c[${scope}]`, 'color: #10b981; font-weight: bold;', message, data || '')
}

export const randomPrice = (min = 5, max = 300) =>
    Math.floor(Math.random() * (max - min) + min)

export const randomRating = () =>
    Math.random() > 0.2 ? Number((Math.random() * 2 + 3).toFixed(1)) : null
