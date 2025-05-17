import { useState } from 'react'
import { Button, useLocalStorage, formatDate } from 'shared'
import './App.css'

function App() {
  const [count, setCount] = useLocalStorage('pattern-count', 0)
  const [lastInteraction, setLastInteraction] = useState<Date | null>(null)

  const handleIncrement = () => {
    setCount(count + 1)
    setLastInteraction(new Date())
  }

  const handleReset = () => {
    setCount(0)
    setLastInteraction(new Date())
  }

  return (
    <div className="app">
      <h1>Pattern - MUI v5 Components Showcase</h1>
      <p>This app uses components from the shared library</p>
      
      <div className="counter-section">
        <h2>Counter: {count}</h2>
        <div className="button-group">
          <Button text="Increment" onClick={handleIncrement} variant="primary" />
          <Button text="Reset" onClick={handleReset} variant="secondary" />
        </div>
      </div>

      {lastInteraction && (
        <p className="timestamp">
          Last interaction: {formatDate(lastInteraction)}
        </p>
      )}
    </div>
  )
}

export default App