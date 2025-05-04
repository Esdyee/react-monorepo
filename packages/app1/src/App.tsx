import React, { useState } from 'react';
import { Button, formatDate, useLocalStorage } from 'shared';

function App() {
  const [count, setCount] = useLocalStorage('app1-count', 0);
  const [lastClicked, setLastClicked] = useState<Date | null>(null);

  const handleClick = () => {
    setCount(count + 1);
    setLastClicked(new Date());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>App1 - 모노레포 예제</h1>
      <p>이 앱은 모노레포에서 shared 라이브러리를 사용합니다.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>카운터: {count}</h2>
        <Button 
          text="증가" 
          onClick={handleClick} 
          variant="primary" 
        />
        <Button 
          text="초기화" 
          onClick={() => setCount(0)} 
          variant="secondary" 
        />
      </div>
      
      {lastClicked && (
        <p>마지막 클릭 시간: {formatDate(lastClicked)}</p>
      )}
    </div>
  );
}

export default App;
