import React from 'react';
import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthPhase, getIsAdmin } from './store/auth';
import { AuthPhase } from './common/enums.ts';
import { AuthLayout } from './layouts/auth/AuthLayout.tsx';
import LoginPage from './pages/auth/LoginPage.tsx';
import SignUpPage from './pages/auth/SignUpPage.tsx';
import { lazyLoadRoutes } from './utils/lazy-load-route.helper.tsx';

type TRoutesParams = {
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const protected_routes: RouteObject[] = [
  {
    path: '',
    element: lazyLoadRoutes(() => import('layouts/main/MainLayout.tsx')),
    children: [
      {
        path: 'products',
        element: lazyLoadRoutes(() => import('pages/main/MainPage.tsx')),
      },
      {
        path: 'product/:id',
        element: lazyLoadRoutes(() => import('pages/main/ProductPage.tsx')),
      },
      {
        path: 'basket',
        element: lazyLoadRoutes(() => import('pages/main/BasketPage.tsx')),
      },
      {
        path: 'about',
        element: lazyLoadRoutes(() => import('pages/main/AboutPage.tsx')),
      },
      {
        path: 'delivery',
        element: lazyLoadRoutes(() => import('pages/main/DeliveryPage.tsx')),
      },
      {
        path: '',
        element: <Navigate to={'products'} />,
      },
      {
        path: '*',
        element: <Navigate to={''} />,
      },
    ],
  },
];

const public_routes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: '*',
        element: <Navigate to={`/auth/login}`} />,
      },
    ],
  },
];

const admin_routes: RouteObject[] = [
  {
    path: '/admin',
    element: lazyLoadRoutes(() => import('layouts/admin/AdminLayout.tsx')),
    children: [
      {
        path: '',
        element: lazyLoadRoutes(() => import('pages/admin/AdminPage.tsx')),
      },
      {
        path: '*',
        element: <Navigate to={''} />,
      },
    ],
  },
];

const getRoutes = ({ isAuthenticated, isAdmin }: TRoutesParams) => {
  return [
    ...public_routes,
    ...(isAuthenticated ? protected_routes : []),
    ...(isAuthenticated && isAdmin ? admin_routes : []),
  ];
};

export const Router: React.FC = () => {
  const authPhase = useSelector(getAuthPhase);
  const isAuthenticated = authPhase === AuthPhase.Success;
  const isAdmin = useSelector(getIsAdmin);
  const routes = useRoutes(getRoutes({ isAuthenticated, isAdmin }));

  return routes;
};

export default Router;
