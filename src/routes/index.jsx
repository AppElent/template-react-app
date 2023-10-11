import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout as MarketingLayout } from 'src/layouts/marketing';

import { authRoutes } from './auth';
import { authDemoRoutes } from './auth-demo';
import { componentsRoutes } from './components';
import { dashboardRoutes } from './dashboard';
import { appRoutes } from './app';

const Error401Page = lazy(() => import('src/pages/401'));
const Error404Page = lazy(() => import('src/pages/404'));
const Error500Page = lazy(() => import('src/pages/500'));

const HomePage = lazy(() => import('src/pages/index'));
const ContactPage = lazy(() => import('src/pages/contact'));
const CheckoutPage = lazy(() => import('src/pages/checkout'));
const PricingPage = lazy(() => import('src/pages/pricing'));

const TermsPage = lazy(() => import('src/custom/pages/terms'));
const PrivacyPage = lazy(() => import('src/custom/pages/privacy'));

export const routes = [
  {
    element: (
      <MarketingLayout>
        <Outlet />
      </MarketingLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'pricing',
        element: <PricingPage />,
      },
      ...componentsRoutes,
    ],
  },
  ...authRoutes,
  ...authDemoRoutes,
  ...dashboardRoutes,
  ...appRoutes,
  {
    path: 'terms',
    element: <TermsPage />,
  },
  {
    path: 'privacy',
    element: <PrivacyPage />,
  },
  {
    path: 'checkout',
    element: <CheckoutPage />,
  },
  {
    path: 'contact',
    element: <ContactPage />,
  },
  {
    path: '401',
    element: <Error401Page />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '500',
    element: <Error500Page />,
  },
  {
    path: '*',
    element: <Error404Page />,
  },
];
