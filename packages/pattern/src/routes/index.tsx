import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// 페이지 컴포넌트들을 lazy loading으로 불러옵니다
const Factory = lazy(() => import('../pages/Factory'));

const LazyFactory = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Factory />
  </Suspense>
);

// 라우터 설정
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LazyFactory />,
  },
]);
