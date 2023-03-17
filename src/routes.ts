import { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';
import { HomeData } from '~/pages/Home/Home.data';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
    data: HomeData,
  },
  {
    path: '/courses',
    component: lazy(() => import('./pages/Course')),
  },
  {
    path: '/library/*',
    component: lazy(() => import('./pages/Library')),
  },
  {
    path: '/playground',
    component: lazy(() => import('./pages/Playground')),
  },
  {
    path: '/archive',
    component: lazy(() => import('./pages/Archive')),
  },
];
