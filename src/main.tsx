import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '@/App'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'
import './styles/global.css'

import { MapProvider } from '@/maps/MapProvider'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <LanguageProvider>
                <QueryClientProvider client={queryClient}>
                    <MapProvider>
                        <BrowserRouter basename="/travel_app">
                            <App />
                        </BrowserRouter>
                    </MapProvider>
                </QueryClientProvider>
            </LanguageProvider>
        </ThemeProvider>
    </React.StrictMode>
)
