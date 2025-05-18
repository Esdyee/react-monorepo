// Factory Pattern의 제품(Product) 인터페이스
// 팩토리가 생성할 객체들의 공통 인터페이스 정의
export interface Animal {
  speak(): string;
  getName(): string;
}

// 구체적인 제품(Concrete Product) 클래스들
// 팩토리가 실제로 생성할 객체들
export class Dog implements Animal {
  speak(): string {
    return "멍멍!";
  }
  
  getName(): string {
    return "강아지";
  }
}

export class Cat implements Animal {
  speak(): string {
    return "야옹!";
  }
  
  getName(): string {
    return "고양이";
  }
}

export class Bird implements Animal {
  speak(): string {
    return "짹짹!";
  }
  
  getName(): string {
    return "새";
  }
}