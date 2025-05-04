import React, { useState } from 'react';

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
  const [notes, setNotes] = useLocalStorage<string[]>('app2-notes', []);
  const [newNote, setNewNote] = useState('');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote('');
      setCurrentTime(new Date());
    }
  };

  const handleDeleteNote = (index: number) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>App2 - 메모 앱</h1>
      <p>이 앱은 shared 라이브러리의 컴포넌트와 훅을 사용합니다.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="새 메모를 입력하세요"
          style={{ 
            padding: '8px', 
            marginRight: '8px', 
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '300px'
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleAddNote();
          }}
        />
        <Button text="추가" onClick={handleAddNote} variant="primary" />
      </div>
      
      <div>
        <h2>메모 목록:</h2>
        {notes.length === 0 ? (
          <p>메모가 없습니다. 새 메모를 추가해보세요.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {notes.map((note, index) => (
              <li 
                key={index}
                style={{ 
                  padding: '10px', 
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{note}</span>
                <Button text="삭제" onClick={() => handleDeleteNote(index)} variant="secondary" />
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {currentTime && (
        <p>마지막 메모 추가 시간: {formatDate(currentTime)}</p>
      )}
    </div>
  );
}

export default App;