import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/translator" element={<div>Translator</div>} />
                <Route path="/map" element={<div>Map</div>} />
                <Route path="/exchange" element={<div>Exchange</div>} />
                <Route path="/profile" element={<div>My Page</div>} />
            </Routes>

            <BottomNav />
        </>
    )
}
