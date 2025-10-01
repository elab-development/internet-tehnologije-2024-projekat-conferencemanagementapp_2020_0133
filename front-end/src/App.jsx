import { useState } from 'react'
import Home from './pages/home/Home'
import AboutUs from './pages/about-us/AboutUs'
import ContactPage from './pages/contact/ContactPage'
import { Toaster } from 'sonner'
import ConferencesPage from './pages/conferences/ConferencesPage'
import { Route, Routes } from 'react-router'
import ConferenceDetailsPage from './pages/conference-details/ConferenceDetails'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import ForgotPasswordPage from './pages/forgot-password/ForgotPasswordPage'
import ResetPasswordPage from './pages/reset-password/ResetPassword'
import Header from './components/Header'
import Footer from './components/Footer'
import CartPage from './pages/cart/CartPage'
import CustomerInfoPage from './pages/customer-info/CustomerInfoPage'
import DeliveryMethodPage from './pages/delivery-method/DeliveryMethodPage'
import PaymentPage from './pages/payment/PaymentPage'
import SubmitPaperPage from './pages/submit-paper/SubmitPaperPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full">
      <Toaster position="bottom-right" />
      <Header />
      <div className="mt-15">
        <Routes>
          <Route path="/conferences" element={<ConferencesPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/conference/:id" element={<ConferenceDetailsPage />} />
          <Route path="/order/cart" element={<CartPage />} />
          <Route path="/order/customer-info" element={<CustomerInfoPage />} />
          <Route path="/order/delivery-method" element={<DeliveryMethodPage/>} />
          <Route path="/order/payment" element={<PaymentPage />} />
          <Route path='/conference/:id/submit-paper' element={<SubmitPaperPage/>}/>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App
