import { useState } from 'react'
import { Button, useLocalStorage, formatDate } from 'shared'
import './App.css'
import { AnimalFactory } from './patterns/factory/AnimalFactory'
import type { AnimalType } from './patterns/factory/AnimalFactory'
import type { Animal } from './patterns/factory/Animal'

function App() {
  const [count, setCount] = useLocalStorage('pattern-count', 0)
  const [lastInteraction, setLastInteraction] = useState<Date | null>(null)
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>('dog')
  const [animal, setAnimal] = useState<Animal | null>(null)

  const handleIncrement = () => {
    setCount(count + 1)
    setLastInteraction(new Date())
  }

  const handleReset = () => {
    setCount(0)
    setLastInteraction(new Date())
  }

  const createAnimal = () => {
    // Factory Pattern 사용: AnimalFactory를 통해 동물 객체 생성
    // 컴포넌트는 구체적인 클래스를 몰라도 됨 (Dog, Cat, Bird를 직접 import하지 않음)
    const newAnimal = AnimalFactory.createAnimal(selectedAnimal)
    setAnimal(newAnimal)
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

      <div className="pattern-section">
        <h2>Factory Pattern Example</h2>
        <div className="animal-selector">
          <select 
            value={selectedAnimal} 
            onChange={(e) => setSelectedAnimal(e.target.value as AnimalType)}
          >
            <option value="dog">강아지</option>
            <option value="cat">고양이</option>
            <option value="bird">새</option>
          </select>
          <Button text="동물 생성" onClick={createAnimal} variant="primary" />
        </div>
        
        {animal && (
          <div className="animal-display">
            <p>동물: {animal.getName()}</p>
            <p>울음소리: {animal.speak()}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App