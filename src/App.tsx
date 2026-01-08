import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import { useI18n } from '@/hooks/useI18n'

// Tickets Module
import TicketsHome from '@/pages/tickets/TicketsHome'
import TicketDetail from '@/pages/tickets/TicketDetail'
import TicketOptions from '@/pages/tickets/TicketOptions'
import TicketCheckout from '@/pages/tickets/TicketCheckout'
import TicketSuccess from '@/pages/tickets/TicketSuccess'
import MyTickets from '@/pages/tickets/MyTickets'

// Taxi Module
import TaxiHome from '@/pages/taxi/TaxiHome'
import TaxiMatching from '@/pages/taxi/TaxiMatching'
import TaxiRide from '@/pages/taxi/TaxiRide'
import TaxiCompletion from '@/pages/taxi/TaxiCompletion'
import TaxiHistory from '@/pages/taxi/TaxiHistory'

export default function App() {
    const { t } = useI18n()

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home/*" element={<Home />} />

                {/* Tickets Module Routes */}
                <Route path="/tickets" element={<TicketsHome />} />
                <Route path="/tickets/:type" element={<TicketsHome />} />
                <Route path="/tickets/detail/:id" element={<TicketDetail />} />
                <Route path="/tickets/options/:id" element={<TicketOptions />} />
                <Route path="/tickets/checkout/:id" element={<TicketCheckout />} />
                <Route path="/tickets/success/:id" element={<TicketSuccess />} />
                <Route path="/my/tickets" element={<MyTickets />} />

                {/* Taxi Module Routes */}
                <Route path="/taxi" element={<TaxiHome />} />
                <Route path="/taxi/matching" element={<TaxiMatching />} />
                <Route path="/taxi/ride" element={<TaxiRide />} />
                <Route path="/taxi/completion" element={<TaxiCompletion />} />
                <Route path="/taxi/history" element={<TaxiHistory />} />

                <Route path="/translator" element={<div className="pt-24 px-6 text-white text-2xl font-bold">{t('nav.translate')}</div>} />
                <Route path="/map" element={<div className="pt-24 px-6 text-white text-2xl font-bold">{t('nav.map')}</div>} />
                <Route path="/exchange" element={<div className="pt-24 px-6 text-white text-2xl font-bold">{t('nav.payme')}</div>} />
                <Route path="/profile" element={<div className="pt-24 px-6 text-white text-2xl font-bold">{t('nav.my')}</div>} />
            </Route>
        </Routes>
    )
}
