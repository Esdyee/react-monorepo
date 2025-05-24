import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';

// 페이지 컴포넌트들을 lazy loading으로 불러옵니다
const Factory = lazy(() => import('../pages/Factory'));
const WithObjectMap = lazy(() => import('../pages/WithObjectMap'));

// 라우터 설정
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Factory />
          </Suspense>
        ),
      },
      {
        path: '/object-map',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <WithObjectMap />
          </Suspense>
        ),
      },
    ],
  },
]);