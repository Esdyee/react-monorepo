import { useState } from 'react'
import { Button } from 'shared'
import { AnimalFactory } from '../patterns/factory/AnimalFactory'
import type { AnimalType } from '../patterns/factory/AnimalFactory'
import type { Animal } from '../patterns/factory/Animal'
import { createAnimalByType, animalFactory, type Animal as FunctionalAnimal } from '../patterns/factory/AnimalFunctional'

const FactoryPage = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>('dog')
  const [animal, setAnimal] = useState<Animal | null>(null)
  const [functionalAnimal, setFunctionalAnimal] = useState<FunctionalAnimal | null>(null)
  const [approach, setApproach] = useState<'class' | 'functional'>('class')

  const createAnimal = () => {
    if (approach === 'class') {
      // 클래스 기반 Factory Pattern
      const newAnimal = AnimalFactory.createAnimal(selectedAnimal)
      setAnimal(newAnimal)
      setFunctionalAnimal(null)
    } else {
      // 함수형 Factory Pattern
      const newAnimal = createAnimalByType(selectedAnimal, `My ${selectedAnimal}`)
      setFunctionalAnimal(newAnimal)
      setAnimal(null)
    }
  }

  // 커링을 활용한 예제
  const dogFactory = animalFactory('dog')
  const catFactory = animalFactory('cat')

  return (
    <div className="pattern-page">
      <h2>Factory Pattern Example</h2>
      
      <div className="approach-selector">
        <label>
          <input 
            type="radio" 
            value="class" 
            checked={approach === 'class'} 
            onChange={(e) => setApproach(e.target.value as 'class' | 'functional')}
          />
          클래스 기반
        </label>
        <label>
          <input 
            type="radio" 
            value="functional" 
            checked={approach === 'functional'} 
            onChange={(e) => setApproach(e.target.value as 'class' | 'functional')}
          />
          함수형
        </label>
      </div>

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
          <h3>클래스 기반 결과:</h3>
          <p>동물: {animal.getName()}</p>
          <p>울음소리: {animal.speak()}</p>
        </div>
      )}

      {functionalAnimal && (
        <div className="animal-display">
          <h3>함수형 결과:</h3>
          <p>동물: {functionalAnimal.name}</p>
          <p>울음소리: {functionalAnimal.speak()}</p>
          <p>움직임: {functionalAnimal.move()}</p>
        </div>
      )}

      <div className="currying-example">
        <h3>커링 예제:</h3>
        <Button 
          text="강아지 팩토리로 Buddy 생성" 
          onClick={() => {
            const buddy = dogFactory('Buddy')
            setFunctionalAnimal(buddy)
            setAnimal(null)
          }} 
          variant="secondary" 
        />
        <Button 
          text="고양이 팩토리로 Whiskers 생성" 
          onClick={() => {
            const whiskers = catFactory('Whiskers')
            setFunctionalAnimal(whiskers)
            setAnimal(null)
          }} 
          variant="secondary" 
        />
      </div>
    </div>
  )
};

export default FactoryPage;