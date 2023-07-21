import React from 'react';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import Sign from '@/pages/Sign';
import { AuthRoutesEnum } from '@/types/routes.enum';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='/'
        element={<Navigate to={AuthRoutesEnum.login} replace={true} />}
      />

      <Route path={AuthRoutesEnum.login} element={<Sign type='login' />} />
      <Route
        path={AuthRoutesEnum.resgister}
        element={<Sign type='resgister' />}
      />

      <Route
        path='*'
        element={<Navigate to={AuthRoutesEnum.login} replace={true} />}
      />
    </>
  )
);

export default function AuthRouter() {
  return <RouterProvider router={router} />;
}
