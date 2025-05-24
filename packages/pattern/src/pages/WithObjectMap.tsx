import { useState } from 'react'
import { Button } from 'shared'
import { 
  createAnimal, 
  createAnimalTypeSafe, 
  registerAnimal, 
  getAnimalTypes,
  type AnimalType 
} from '../patterns/factory/AnimalWithObjectMap'

const WithObjectMapPage = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>('dog')
  const [animal, setAnimal] = useState<ReturnType<typeof createAnimal> | null>(null)
  const [customAnimalName, setCustomAnimalName] = useState('')
  const [customAnimalSound, setCustomAnimalSound] = useState('')
  const [animalTypes, setAnimalTypes] = useState<string[]>(getAnimalTypes())

  const handleCreateAnimal = () => {
    const newAnimal = createAnimalTypeSafe(selectedAnimal)
    setAnimal(newAnimal)
  }

  const handleRegisterCustomAnimal = () => {
    if (customAnimalName && customAnimalSound) {
      const customType = customAnimalName.toLowerCase()
      registerAnimal(customType, {
        speak: () => customAnimalSound,
        getName: () => customAnimalName
      })
      setAnimalTypes(getAnimalTypes())
      setCustomAnimalName('')
      setCustomAnimalSound('')
    }
  }

  return (
    <div className="pattern-page">
      <h2>Object Map Factory Pattern</h2>
      
      <div className="description">
        <p>객체 맵을 사용한 Factory Pattern 구현입니다.</p>
        <p>클래스 없이 객체 리터럴과 맵을 활용하여 간단하게 구현됩니다.</p>
      </div>

      <div className="section">
        <h3>기본 동물 생성</h3>
        <div className="animal-selector">
          <select 
            value={selectedAnimal} 
            onChange={(e) => setSelectedAnimal(e.target.value as AnimalType)}
          >
            {animalTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <Button text="동물 생성" onClick={handleCreateAnimal} variant="primary" />
        </div>
      </div>

      <div className="section">
        <h3>커스텀 동물 등록</h3>
        <div className="custom-animal-form">
          <input 
            type="text" 
            placeholder="동물 이름" 
            value={customAnimalName}
            onChange={(e) => setCustomAnimalName(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="울음소리" 
            value={customAnimalSound}
            onChange={(e) => setCustomAnimalSound(e.target.value)}
          />
          <Button 
            text="새 동물 등록" 
            onClick={handleRegisterCustomAnimal} 
            variant="secondary" 
          />
        </div>
      </div>
      
      {animal && (
        <div className="animal-display">
          <h3>생성된 동물:</h3>
          <p>이름: {animal.getName()}</p>
          <p>울음소리: {animal.speak()}</p>
        </div>
      )}

      <div className="code-example">
        <h3>코드 예시:</h3>
        <pre>{`// 객체 맵 정의
const animalMap = {
  dog: { 
    speak: () => 'Woof!', 
    getName: () => 'Dog' 
  },
  // ...
};

// 팩토리 함수
const createAnimal = (type: string) => {
  return animalMap[type] || null;
};

// 동적 등록
const registerAnimal = (type, implementation) => {
  animalMap[type] = implementation;
};`}</pre>
      </div>
    </div>
  )
}

export default WithObjectMapPage