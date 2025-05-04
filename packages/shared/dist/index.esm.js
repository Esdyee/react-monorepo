import React, { useState, useEffect } from 'react';

var Button = function (_a) {
    var text = _a.text, onClick = _a.onClick, _b = _a.variant, variant = _b === void 0 ? 'primary' : _b;
    var buttonStyle = {
        padding: '10px 15px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        backgroundColor: variant === 'primary' ? '#0070f3' : '#f5f5f5',
        color: variant === 'primary' ? 'white' : 'black',
    };
    return (React.createElement("button", { style: buttonStyle, onClick: onClick }, text));
};

function useLocalStorage(key, initialValue) {
    // 상태 초기화
    var _a = useState(function () {
        try {
            // localStorage에서 값 가져오기
            var item = window.localStorage.getItem(key);
            // 값이 있으면 JSON 파싱, 없으면 초기값 사용
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.error("Error reading localStorage key \"".concat(key, "\":"), error);
            return initialValue;
        }
    }), storedValue = _a[0], setStoredValue = _a[1];
    // localStorage 값 업데이트
    var setValue = function (value) {
        try {
            // 함수를 받을 수 있게 처리
            var valueToStore = value instanceof Function ? value(storedValue) : value;
            // 상태 업데이트
            setStoredValue(valueToStore);
            // localStorage 저장
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch (error) {
            console.error("Error setting localStorage key \"".concat(key, "\":"), error);
        }
    };
    // 다른 탭/창에서의 변경 감지
    useEffect(function () {
        var handleStorageChange = function (e) {
            if (e.key === key && e.newValue) {
                setStoredValue(JSON.parse(e.newValue));
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return function () { return window.removeEventListener('storage', handleStorageChange); };
    }, [key]);
    return [storedValue, setValue];
}

var formatDate = function (date) {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

export { Button, formatDate, useLocalStorage };
//# sourceMappingURL=index.esm.js.map
