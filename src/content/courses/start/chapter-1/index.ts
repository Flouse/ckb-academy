import { ICourseChapterMeta } from '~/types/interfaces';
import { lazy } from 'solid-js';

const Chapter1: ICourseChapterMeta = {
  component: () => lazy(() => import('./layout')),
  id: 'Chapter_1',
  title: 'Chapter_1',
};

export default Chapter1;
