// 객체 맵을 사용한 팩토리 패턴 대체 방식
// Factory 클래스 대신 간단한 객체 맵과 함수를 사용

// Animal 인터페이스는 동일하게 유지
interface Animal {
  speak(): string;
  getName(): string;
}

// 각 동물별 구현을 객체로 정의
// 클래스 대신 순수 객체를 사용하여 더 간단하고 함수형 접근에 가깝게 구현
const dog: Animal = {
  speak: () => "멍멍!",
  getName: () => "강아지",
};

const cat: Animal = {
  speak: () => "야옹!",
  getName: () => "고양이",
};

const bird: Animal = {
  speak: () => "짹짹!",
  getName: () => "새",
};

// 동물 타입을 키로 하는 객체 맵
// Factory 클래스의 switch문 대신 객체 맵을 사용하여 타입별 인스턴스를 관리
const animalMap: Record<string, Animal> = {
  dog,
  cat,
  bird,
};

// 팩토리 함수 - 객체 맵에서 동물을 가져와 반환
// Factory 클래스의 createAnimal 메서드를 순수 함수로 대체
export function createAnimal(type: string): Animal {
  const animal = animalMap[type];

  if (!animal) {
    throw new Error(`Unknown animal type: ${type}`);
  }

  // 객체를 복사하여 반환 (불변성 유지)
  // 각 호출마다 새로운 객체를 반환하여 상태 공유 방지
  return { ...animal };
}

// 사용 가능한 동물 타입들을 타입으로 정의
// TypeScript의 타입 안전성을 활용
export type AnimalType = keyof typeof animalMap;

// 타입 안전한 팩토리 함수
// AnimalType을 사용하여 컴파일 타임에 타입 체크 가능
export function createAnimalTypeSafe(type: AnimalType): Animal {
  return { ...animalMap[type] };
}

// 동적으로 새로운 동물 타입 추가 가능
// Factory 패턴과 달리 런타임에 동적으로 확장 가능
export function registerAnimal(type: string, animal: Animal): void {
  animalMap[type] = animal;
}

// 등록된 모든 동물 타입 반환
// Factory 패턴에서는 구현하기 번거로운 기능을 쉽게 추가
export function getAnimalTypes(): string[] {
  return Object.keys(animalMap);
}

// 사용 예시
/*
// 기본 사용법
const myDog = createAnimal('dog');
console.log(myDog.speak()); // "멍멍!"

// 타입 안전한 사용법
const myCat = createAnimalTypeSafe('cat');
console.log(myCat.getName()); // "고양이"

// 새로운 동물 타입 동적 추가
registerAnimal('cow', {
  speak: () => "음메~",
  getName: () => "소"
});

const myCow = createAnimal('cow');
console.log(myCow.speak()); // "음메~"

// 등록된 모든 타입 확인
console.log(getAnimalTypes()); // ['dog', 'cat', 'bird', 'cow']
*/

// 객체 맵 방식의 장점:
// 1. 더 간단하고 직관적인 코드
// 2. switch문이나 if-else 체인 없이 깔끔한 구조
// 3. 런타임에 동적으로 타입 추가 가능
// 4. 함수형 프로그래밍 스타일에 더 적합
// 5. 테스트하기 쉬운 구조

// 단점:
// 1. 각 인스턴스가 고유한 상태를 가져야 할 경우 추가 처리 필요
// 2. 클래스의 상속 구조를 활용하기 어려움
