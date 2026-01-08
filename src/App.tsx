import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'

export default function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home/*" element={<Home />} />
                <Route path="/translator" element={<div className="pt-24 px-6 text-white text-2xl font-bold">Translator Page</div>} />
                <Route path="/map" element={<div className="pt-24 px-6 text-white text-2xl font-bold">Map Page</div>} />
                <Route path="/exchange" element={<div className="pt-24 px-6 text-white text-2xl font-bold">Exchange Page</div>} />
                <Route path="/profile" element={<div className="pt-24 px-6 text-white text-2xl font-bold">My Page</div>} />
            </Route>
        </Routes>
    )
}
