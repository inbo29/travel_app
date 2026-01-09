import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import MapLayout from '@/layouts/MapLayout'
import Home from '@/pages/home'
import { useI18n } from '@/hooks/useI18n'
import { useTaxiSimulator } from '@/hooks/useTaxiSimulator'

// Tickets Module
import TicketsHome from '@/pages/tickets/TicketsHome'
import TicketDetail from '@/pages/tickets/TicketDetail'
import TicketOptions from '@/pages/tickets/TicketOptions'
import TicketCheckout from '@/pages/tickets/TicketCheckout'
import TicketBooking from '@/pages/tickets/TicketBooking'
import TicketSuccess from '@/pages/tickets/TicketSuccess'
import MyTickets from '@/pages/tickets/MyTickets'

// Taxi Module
import TaxiHome from '@/pages/taxi/TaxiHome'
import TaxiMatching from '@/pages/taxi/TaxiMatching'
import TaxiRide from '@/pages/taxi/TaxiRide'
import TaxiCompletion from '@/pages/taxi/TaxiCompletion'
import TaxiPayment from '@/pages/taxi/TaxiPayment'
import TaxiHistory from '@/pages/taxi/TaxiHistory'

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

// Translate Module
import TranslateHome from '@/pages/translate/index'
import TextTranslate from '@/pages/translate/text'
import VoiceTranslate from '@/pages/translate/voice'
import ConversationTranslate from '@/pages/translate/conversation'
import OCRTranslate from '@/pages/translate/ocr'
import OCRResult from '@/pages/translate/result'
import SavedTranslations from '@/pages/translate/saved'

export default function App() {
    const { t } = useI18n()

    // Global Taxi Simulator - Runs regardless of layout
    useTaxiSimulator()

    return (
        <Routes>
            {/* --- App Layout (No Map Overlay from start) --- */}
            <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home/*" element={<Home />} />

                {/* Tickets Module Routes */}
                <Route path="/tickets" element={<TicketsHome />} />
                <Route path="/tickets/:type" element={<TicketsHome />} />
                <Route path="/tickets/detail/:id" element={<TicketDetail />} />
                <Route path="/tickets/options/:id" element={<TicketOptions />} />
                <Route path="/tickets/checkout/:id" element={<TicketCheckout />} />
                <Route path="/tickets/booking/:id" element={<TicketBooking />} />
                <Route path="/tickets/success/:id" element={<TicketSuccess />} />
                <Route path="/my/tickets" element={<MyTickets />} />

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

                {/* Translate Module Routes */}
                <Route path="/translate" element={<TranslateHome />} />
                <Route path="/translate/text" element={<TextTranslate />} />
                <Route path="/translate/voice" element={<VoiceTranslate />} />
                <Route path="/translate/conversation" element={<ConversationTranslate />} />
                <Route path="/translate/ocr" element={<OCRTranslate />} />
                <Route path="/translate/result" element={<OCRResult />} />
                <Route path="/translate/saved" element={<SavedTranslations />} />
                <Route path="/translator" element={<TranslateHome />} /> {/* Legacy route redirect */}

                <Route path="/exchange" element={<div className="pt-24 px-6 text-white text-2xl font-bold">{t('nav.payme')}</div>} />
                <Route path="/profile" element={<div className="pt-24 px-6 text-white text-2xl font-bold">{t('nav.my')}</div>} />

                {/* Market Rates */}
                <Route path="/market-rates" element={<MarketRates />} />
            </Route>

            {/* --- Map Layout (Active Map Provider) --- */}
            <Route element={<MapLayout />}>
                {/* Taxi Module Routes */}
                <Route path="/taxi" element={<TaxiHome />} />
                <Route path="/taxi/matching" element={<TaxiMatching />} />
                <Route path="/taxi/ride" element={<TaxiRide />} />
                <Route path="/taxi/completion" element={<TaxiCompletion />} />
                <Route path="/taxi/payment" element={<TaxiPayment />} />
                <Route path="/taxi/history" element={<TaxiHistory />} />

                <Route path="/map" element={<MapPage />} />
            </Route>
        </Routes>
    )
}
