import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/home'
import { useI18n } from '@/hooks/useI18n'
import { useTaxiSimulator } from '@/hooks/useTaxiSimulator'

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'

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
import LogHome from '@/pages/log/LogHome'
import JourneyDetail from '@/pages/log/JourneyDetail'
import LocalMart from '@/pages/market/LocalMart'
import MyPage from '@/pages/profile/MyPage'

// Placeholder Component
import ComingSoon from '@/pages/placeholder/ComingSoon'

export default function App() {
    const { t } = useI18n()

    // Global Taxi Simulator - Runs regardless of layout
    useTaxiSimulator()

    return (
        <Routes>
            {/* Auth Routes (outside MainLayout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home/*" element={<Home />} />

                {/* Tickets Module */}
                <Route path="/tickets" element={<TicketsHome />} />
                <Route path="/tickets/:type" element={<TicketsHome />} />
                <Route path="/tickets/detail/:id" element={<TicketDetail />} />
                <Route path="/tickets/options/:id" element={<TicketOptions />} />
                <Route path="/tickets/checkout/:id" element={<TicketCheckout />} />
                <Route path="/tickets/booking/:id" element={<TicketBooking />} />
                <Route path="/tickets/success/:id" element={<TicketSuccess />} />
                <Route path="/my/tickets" element={<MyTickets />} />

                {/* Guide / Tours Module */}
                <Route path="/guides" element={<GuidesHome />} />
                <Route path="/guides/tours" element={<TourList />} />
                <Route path="/guides/tours/:id" element={<TourDetail />} />
                <Route path="/guides/guides" element={<GuideList />} />
                <Route path="/guides/guides/:id" element={<GuideDetail />} />
                <Route path="/guides/interpreter" element={<InterpreterService />} />

                {/* Booking */}
                <Route path="/booking/summary" element={<BookingSummary />} />
                <Route path="/booking/success" element={<BookingSuccess />} />

                {/* Translate Module */}
                <Route path="/translate" element={<TranslateHome />} />
                <Route path="/translate/text" element={<TextTranslate />} />
                <Route path="/translate/voice" element={<VoiceTranslate />} />
                <Route path="/translate/conversation" element={<ConversationTranslate />} />
                <Route path="/translate/ocr" element={<OCRTranslate />} />
                <Route path="/translate/result" element={<OCRResult />} />
                <Route path="/translate/saved" element={<SavedTranslations />} />
                <Route path="/translator" element={<TranslateHome />} />

                {/* Market & Log */}
                <Route path="/exchange" element={<div className="pt-8 px-6 text-2xl font-bold">{t('nav.payme')}</div>} />
                <Route path="/profile" element={<MyPage />} />
                <Route path="/market-rates" element={<MarketRates />} />
                <Route path="/local-mart" element={<LocalMart />} />
                <Route path="/travel-log" element={<LogHome />} />
                <Route path="/travel-log/:id" element={<JourneyDetail />} />

                {/* Taxi Module */}
                <Route path="/taxi" element={<TaxiHome />} />
                <Route path="/taxi/matching" element={<TaxiMatching />} />
                <Route path="/taxi/ride" element={<TaxiRide />} />
                <Route path="/taxi/completion" element={<TaxiCompletion />} />
                <Route path="/taxi/payment" element={<TaxiPayment />} />
                <Route path="/taxi/history" element={<TaxiHistory />} />

                {/* Map Module */}
                <Route path="/map" element={<MapPage />} />

                {/* ========== PLACEHOLDER ROUTES ========== */}

                {/* Transport */}
                <Route path="/transport/bus" element={<ComingSoon category="bus" />} />
                <Route path="/transport/train" element={<ComingSoon category="train" />} />
                <Route path="/transport/flight" element={<ComingSoon category="flight" />} />

                {/* Travel */}
                <Route path="/travel/family" element={<ComingSoon category="family" />} />
                <Route path="/travel/cruise" element={<ComingSoon category="cruise" />} />
                <Route path="/travel/healing" element={<ComingSoon category="healing" />} />
                <Route path="/travel/activity" element={<ComingSoon category="activity" />} />

                {/* Accommodation */}
                <Route path="/accommodation/hotel" element={<ComingSoon category="hotel" />} />
                <Route path="/accommodation/motel" element={<ComingSoon category="motel" />} />
                <Route path="/accommodation/airbnb" element={<ComingSoon category="airbnb" />} />

                {/* Services */}
                <Route path="/service/charger" element={<ComingSoon category="charger" />} />
                <Route path="/service/rental" element={<ComingSoon category="rental" />} />
                <Route path="/service/scooter" element={<ComingSoon category="scooter" />} />

                {/* Insurance */}
                <Route path="/insurance/domestic" element={<ComingSoon category="domestic" />} />
                <Route path="/insurance/international" element={<ComingSoon category="international" />} />
                <Route path="/insurance/essential" element={<ComingSoon category="essential" />} />

                {/* Exchange sub-routes */}
                <Route path="/exchange/taxfree" element={<ComingSoon category="taxfree" />} />
                <Route path="/exchange/topup" element={<ComingSoon category="topup" />} />
                <Route path="/exchange/card" element={<ComingSoon category="card" />} />
                <Route path="/exchange/history" element={<ComingSoon category="history" />} />
            </Route>
        </Routes>
    )
}
