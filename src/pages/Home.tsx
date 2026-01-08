import { Routes, Route, Outlet } from 'react-router-dom'
import HomeMain from './HomeMain'

export default function Home() {
    return (
        <main className="pt-24 pb-24 lg:pt-32 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <Routes>
                    <Route index element={<HomeMain />} />
                    <Route path="tickets" element={<div>Tickets Page</div>} />
                    <Route path="travel-log" element={<div>Travel Log Page</div>} />
                    <Route path="store" element={<div>Store Page</div>} />
                    <Route path="rates" element={<div>Market Rates Page</div>} />
                </Routes>
                <Outlet />
            </div>
        </main>
    )
}
