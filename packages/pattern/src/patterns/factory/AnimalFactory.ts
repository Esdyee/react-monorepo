import type { Animal } from './Animal';
import { Dog, Cat, Bird } from './Animal';

export type AnimalType = 'dog' | 'cat' | 'bird';

// Factory Pattern의 핵심: 객체 생성을 캡슐화하는 팩토리 클래스
export class AnimalFactory {
  // 팩토리 메서드: 타입에 따라 적절한 객체를 생성
  // 클라이언트는 구체적인 클래스(Dog, Cat, Bird)를 알 필요 없음
  static createAnimal(type: AnimalType): Animal {
    // 조건문을 통해 적절한 구현체를 생성하여 반환
    // 이것이 Factory Pattern의 핵심 - 객체 생성 로직을 중앙화
    switch (type) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      case 'bird':
        return new Bird();
      default:
        throw new Error(`Unknown animal type: ${type}`);
    }
  }
}