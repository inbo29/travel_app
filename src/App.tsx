import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/home'
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

// Tour & Guide Module
// Guide / Tours & Match Module
import GuidesHome from '@/pages/guides'
import TourList from '@/pages/guides/tours/index'
import TourDetail from '@/pages/guides/tours/[id]'
import GuideList from '@/pages/guides/guides/index'
import GuideDetail from '@/pages/guides/guides/[id]'
import InterpreterService from '@/pages/guides/interpreter/index'
import BookingSummary from '@/pages/booking/summary'
import BookingSuccess from '@/pages/booking/success'
import MarketRates from '@/pages/market/MarketRates'
import MapPage from '@/pages/map/MapPage'

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

                {/* Guide / Tours & Match Module Routes */}
                <Route path="/guides" element={<GuidesHome />} />

                {/* Tours Sub-module */}
                <Route path="/guides/tours" element={<TourList />} />
                <Route path="/guides/tours/:id" element={<TourDetail />} />

                {/* Guides Sub-module */}
                <Route path="/guides/guides" element={<GuideList />} />
                <Route path="/guides/guides/:id" element={<GuideDetail />} />

                {/* Interpreter Sub-module */}
                <Route path="/guides/interpreter" element={<InterpreterService />} />

                {/* Unified Booking Routes */}
                <Route path="/booking/summary" element={<BookingSummary />} />
                <Route path="/booking/success" element={<BookingSuccess />} />

                <Route path="/translator" element={<div className="pt-24 px-6 text-white text-2xl font-bold">{t('nav.translate')}</div>} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/exchange" element={<div className="pt-24 px-6 text-white text-2xl font-bold">{t('nav.payme')}</div>} />
                <Route path="/profile" element={<div className="pt-24 px-6 text-white text-2xl font-bold">{t('nav.my')}</div>} />

                {/* Market Rates */}
                <Route path="/market-rates" element={<MarketRates />} />
            </Route>
        </Routes>
    )
}
