import React, { useState } from "react";

// 공유 컴포넌트를 직접 가져오기
function Button(props: { text: string; onClick?: () => void; variant?: 'primary' | 'secondary' }) {
  const { text, onClick, variant = 'primary' } = props;
  const buttonStyle = {
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: variant === 'primary' ? '#0070f3' : '#f5f5f5',
    color: variant === 'primary' ? 'white' : 'black',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}

// 날짜 포맷팅 함수
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// 로컬 스토리지 훅
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // 상태 초기화
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // localStorage에서 값 가져오기
      const item = window.localStorage.getItem(key);
      // 값이 있으면 JSON 파싱, 없으면 초기값 사용
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // localStorage 값 업데이트
  const setValue = (value: T) => {
    try {
      // 함수를 받을 수 있게 처리
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // 상태 업데이트
      setStoredValue(valueToStore);
      // localStorage 저장
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

function App() {
  const [count, setCount] = useLocalStorage("app1-count", 0);
  const [lastClicked, setLastClicked] = useState<Date | null>(null);

  const handleClick = () => {
    setCount(count + 1);
    setLastClicked(new Date());
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>App1 - 모노레포 예제</h1>
      <p>이 앱은 모노레포에서 shared 라이브러리를 사용합니다.</p>

      <div style={{ marginBottom: "20px" }}>
        <h2>카운터: {count}</h2>
        <Button text="증가" onClick={handleClick} variant="primary" />
        <Button text="초기화" onClick={() => setCount(0)} variant="secondary" />
      </div>

      {lastClicked && <p>마지막 클릭 시간: {formatDate(lastClicked)}</p>}
    </div>
  );
}

export default App;