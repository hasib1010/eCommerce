import { useState } from 'react'  
import './App.css'
import Slider from './Components/Slider/Slider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Slider></Slider>
    </>
  )
}

export default App
