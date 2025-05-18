import { useState } from 'react'
import { Button } from 'shared'
import { AnimalFactory } from '../patterns/factory/AnimalFactory'
import type { AnimalType } from '../patterns/factory/AnimalFactory'
import type { Animal } from '../patterns/factory/Animal'

const FactoryPage = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>('dog')
  const [animal, setAnimal] = useState<Animal | null>(null)

  const createAnimal = () => {
    // Factory Pattern 사용: AnimalFactory를 통해 동물 객체 생성
    // 컴포넌트는 구체적인 클래스를 몰라도 됨 (Dog, Cat, Bird를 직접 import하지 않음)
    const newAnimal = AnimalFactory.createAnimal(selectedAnimal)
    setAnimal(newAnimal)
  }

  return (
    <div className="pattern-page">
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
  )
};

export default FactoryPage;