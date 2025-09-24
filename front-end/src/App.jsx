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

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full">
      <Toaster position="bottom-right" />
      <Routes>
        <Route path='/conferences' element={<ConferencesPage/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/conference/:id' element={<ConferenceDetailsPage/>}/>
      </Routes>
    </div>
  );
}

export default App
