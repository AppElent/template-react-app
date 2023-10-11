import { lazy, Suspense } from 'react';

import { Layout as AuthClassicLayout } from 'src/layouts/auth/classic-layout';
import { Layout as AuthModernLayout } from 'src/layouts/auth/modern-layout';
import { Outlet } from 'react-router-dom';

const ForgotPasswordClassicPage = lazy(() => import('src/pages/auth-demo/forgot-password/classic'));
const ForgotPasswordModernPage = lazy(() => import('src/pages/auth-demo/forgot-password/modern'));
const LoginClassicPage = lazy(() => import('src/pages/auth-demo/login/classic'));
const LoginModernPage = lazy(() => import('src/pages/auth-demo/login/modern'));
const RegisterClassicPage = lazy(() => import('src/pages/auth-demo/register/classic'));
const RegisterModernPage = lazy(() => import('src/pages/auth-demo/register/modern'));
const ResetPasswordClassicPage = lazy(() => import('src/pages/auth-demo/reset-password/classic'));
const ResetPasswordModernPage = lazy(() => import('src/pages/auth-demo/reset-password/modern'));
const VerifyCodeClassicPage = lazy(() => import('src/pages/auth-demo/verify-code/classic'));
const VerifyCodeModernPage = lazy(() => import('src/pages/auth-demo/verify-code/modern'));

export const authDemoRoutes = [
  {
    path: 'auth-demo',
    children: [
      {
        element: (
          <AuthClassicLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </AuthClassicLayout>
        ),
        children: [
          {
            path: 'forgot-password/classic',
            element: <ForgotPasswordClassicPage />,
          },
          {
            path: 'login/classic',
            element: <LoginClassicPage />,
          },
          {
            path: 'register/classic',
            element: <RegisterClassicPage />,
          },
          {
            path: 'reset-password/classic',
            element: <ResetPasswordClassicPage />,
          },
          {
            path: 'verify-code/classic',
            element: <VerifyCodeClassicPage />,
          },
        ],
      },
      {
        element: (
          <AuthModernLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </AuthModernLayout>
        ),
        children: [
          {
            path: 'forgot-password/modern',
            element: <ForgotPasswordModernPage />,
          },
          {
            path: 'login/modern',
            element: <LoginModernPage />,
          },
          {
            path: 'register/modern',
            element: <RegisterModernPage />,
          },
          {
            path: 'reset-password/modern',
            element: <ResetPasswordModernPage />,
          },
          {
            path: 'verify-code/modern',
            element: <VerifyCodeModernPage />,
          },
        ],
      },
    ],
  },
];
