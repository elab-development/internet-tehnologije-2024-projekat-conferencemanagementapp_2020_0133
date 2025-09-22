import { useState } from 'react'
import Home from './pages/home/Home'
import AboutUs from './pages/about-us/AboutUs'
import ContactPage from './pages/contact/ContactPage'
import { Toaster } from 'sonner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full">
      <Toaster position='bottom-right' />
      <ContactPage/>
    </div>
  )
}

export default App
