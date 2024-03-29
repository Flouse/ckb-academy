import { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';
import { HomeData } from '~/pages/Home/Home.data';
import { CourseData } from '~/pages/Course.data';
import { CourseDetailsData } from '~/pages/CourseDetails.data';
import { LibraryData } from '~/pages/Library.data';
import { LoadProjectEditorData } from '~/components/Playground/ProjectEditor.data';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
    data: HomeData,
  },
  {
    path: '/courses',
    component: lazy(() => import('./pages/Course')),
    data: CourseData,
  },
  {
    path: '/courses/:courseId',
    component: lazy(() => import('./pages/CourseDetails')),
    data: CourseDetailsData,
  },
  {
    path: '/library',
    component: lazy(() => import('./pages/Library')),
    data: LibraryData,
  },
  {
    path: '/playground',
    component: lazy(() => import('./pages/Playground')),
  },
  {
    path: '/playground/:id',
    component: lazy(() => import('./components/Playground/ProjectEditor')),
    data: LoadProjectEditorData,
  },
];
