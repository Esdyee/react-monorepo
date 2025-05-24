// 함수형 접근 방식의 Factory Pattern

// Animal 타입 정의
export interface Animal {
  name: string;
  sound: string;
  speak: () => string;
  move: () => string;
}

// 고차 함수로 Animal 생성
export const createAnimal = (name: string, sound: string, movement: string): Animal => ({
  name,
  sound,
  speak: () => `${name} says ${sound}!`,
  move: () => `${name} ${movement}`
});

// 각 동물별 생성 함수 (부분 적용)
export const createDog = (name: string) => createAnimal(name, 'Woof', 'runs on four legs');
export const createCat = (name: string) => createAnimal(name, 'Meow', 'walks gracefully');
export const createBird = (name: string) => createAnimal(name, 'Tweet', 'flies with wings');

// 타입별 생성자 맵
export const animalCreators = {
  dog: createDog,
  cat: createCat,
  bird: createBird
} as const;

export type AnimalType = keyof typeof animalCreators;

// Factory 함수
export const createAnimalByType = (type: AnimalType, name: string): Animal => {
  const creator = animalCreators[type];
  if (!creator) {
    throw new Error(`Unknown animal type: ${type}`);
  }
  return creator(name);
};

// 커링을 활용한 Factory
export const animalFactory = (type: AnimalType) => (name: string) => 
  createAnimalByType(type, name);

// 사용 예시
// const dogFactory = animalFactory('dog');
// const myDog = dogFactory('Buddy'); // Dog named Buddy