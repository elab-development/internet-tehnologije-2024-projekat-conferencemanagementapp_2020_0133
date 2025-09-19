import { useState } from 'react'
import Home from './pages/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full">
      <Home/>
    </div>
  )
}

export default App
