# React 모노레포 예제

이 프로젝트는 React와 TypeScript를 사용한 간단한 모노레포 예제입니다.

## 구조

```
react-monorepo/
├── packages/
│   ├── app1/             # 첫 번째 애플리케이션
│   ├── app2/             # 두 번째 애플리케이션
│   └── shared/           # 공유 컴포넌트 및 유틸리티
├── package.json          # 루트 package.json
└── lerna.json            # Lerna 설정
```

## 설치 및 실행 방법

### 1. 의존성 설치

```
yarn install
```

### 2. shared 패키지 빌드

```
yarn workspace shared build
```

### 3. 애플리케이션 실행

App1 실행:
```
yarn start:app1
```

App2 실행:
```
yarn start:app2
```

## 특징

- Yarn Workspaces와 Lerna를 사용한 모노레포 관리
- TypeScript로 타입 안전성 제공
- 공유 컴포넌트 및 유틸리티
- 두 개의 독립적인 React 애플리케이션
