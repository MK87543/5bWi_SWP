import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'

function App() {

  let [startValueV, setStartValue] = useState<number>(11)

  return (
    <>
      <Button startValue={startValueV} />
      <Button startValue={startValueV} />
      <button onClick={() => {
        setStartValue(prev => prev + 1);
        console.log("pressed reset");


      }}> Reset</button>
    </>
  )
}

export default App
