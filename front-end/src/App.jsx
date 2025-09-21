import { useState } from 'react'
import Home from './pages/home/Home'
import AboutUs from './pages/about-us/AboutUs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full">
      <AboutUs/>
    </div>
  )
}

export default App
