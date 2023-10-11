import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/app';

const OverviewPage = lazy(() => import('src/pages/app/index'));
const AccountPage = lazy(() => import('src/pages/app/account'));

export const appRoutes = [
  {
    path: 'app',
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: 'account',
        element: <AccountPage />,
      },
    ],
  },
];
