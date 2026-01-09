import { Routes, Route, Outlet } from 'react-router-dom'
import HomeMain from './HomeMain'

export default function HomePage() {
    return (
        <main className="min-h-screen w-full">
            <Routes>
                <Route index element={<HomeMain />} />
                <Route path="tickets" element={<div>Tickets Page</div>} />
                <Route path="travel-log" element={<div>Travel Log Page</div>} />
                <Route path="store" element={<div>Store Page</div>} />
                <Route path="rates" element={<div>Market Rates Page</div>} />
            </Routes>
            <Outlet />
        </main>
    )
}
