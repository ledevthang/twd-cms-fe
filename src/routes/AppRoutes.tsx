import React from 'react';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { ApiRoutesEnum } from '@/types/routes.enum';
import ErrorPage from '@/pages/ErrorPage';
import CrudPage from '@/pages/CrudPage';
import EmptyPage from '@/pages/EmptyPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { AppLayout } from '@/layout';
import ChartPage from '@/pages/Charts';
import AccessDeniedPage from '@/pages/AccessDenied';
import DataTable from '@/pages/DataTable';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='/'
        element={
          <>
            <AppLayout />
            <Navigate to={ApiRoutesEnum.crud} replace={true} />
          </>
        }
      >
        <Route path={ApiRoutesEnum.crud} element={<CrudPage />} />
        <Route path={ApiRoutesEnum.table} element={<DataTable />} />
        <Route path={ApiRoutesEnum.chart} element={<ChartPage />} />
        <Route path={ApiRoutesEnum.notFound} element={<NotFoundPage />} />
        <Route path={ApiRoutesEnum.empty} element={<EmptyPage />} />
        <Route
          path={ApiRoutesEnum.accessDenied}
          element={<AccessDeniedPage />}
        />
      </Route>

      <Route path='*' element={<ErrorPage />} />
    </>
  )
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
