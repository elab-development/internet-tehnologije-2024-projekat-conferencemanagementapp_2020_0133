import { useState } from 'react'
import Home from './pages/home/Home'
import AboutUs from './pages/about-us/AboutUs'
import ContactPage from './pages/contact/ContactPage'
import { Toaster } from 'sonner'
import ConferencesPage from './pages/conferences/ConferencesPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full">
      <Toaster position='bottom-right' />
      <ConferencesPage/>
    </div>
  )
}

export default App
