import { lazy } from 'react';

const IndexPage = lazy(() => import('src/pages/components/index'));

const ButtonsPage = lazy(() => import('src/pages/components/buttons'));
const ChartsPage = lazy(() => import('src/pages/components/charts'));
const ColorsPage = lazy(() => import('src/pages/components/colors'));
const DetailListsPage = lazy(() => import('src/pages/components/data-display/detail-lists'));
const FormsPage = lazy(() => import('src/pages/components/forms'));
const GridListsPage = lazy(() => import('src/pages/components/lists/grid-lists'));
const GroupedListsPage = lazy(() => import('src/pages/components/lists/grouped-lists'));
const InputsPage = lazy(() => import('src/pages/components/inputs'));
const ModalsPage = lazy(() => import('src/pages/components/modals'));
const QuickStatsPage = lazy(() => import('src/pages/components/data-display/quick-stats'));
const TablesPage = lazy(() => import('src/pages/components/data-display/tables'));
const TypographyPage = lazy(() => import('src/pages/components/typography'));

export const componentsRoutes = [
  {
    path: 'components',
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'buttons',
        element: <ButtonsPage />,
      },
      {
        path: 'charts',
        element: <ChartsPage />,
      },
      {
        path: 'colors',
        element: <ColorsPage />,
      },
      {
        path: 'data-display',
        children: [
          {
            path: 'detail-lists',
            element: <DetailListsPage />,
          },
          {
            path: 'quick-stats',
            element: <QuickStatsPage />,
          },
          {
            path: 'tables',
            element: <TablesPage />,
          },
        ],
      },
      {
        path: 'forms',
        element: <FormsPage />,
      },
      {
        path: 'inputs',
        element: <InputsPage />,
      },
      {
        path: 'lists',
        children: [
          {
            path: 'grid-lists',
            element: <GridListsPage />,
          },
          {
            path: 'grouped-lists',
            element: <GroupedListsPage />,
          },
        ],
      },
      {
        path: 'modals',
        element: <ModalsPage />,
      },
      {
        path: 'typography',
        element: <TypographyPage />,
      },
    ],
  },
];
