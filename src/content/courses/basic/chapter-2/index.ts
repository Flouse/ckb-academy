import { ICourseChapterMeta } from '~/types/course';
import { lazy } from 'solid-js';

const Chapter2: ICourseChapterMeta = {
  id: 'Chapter_2',
  title: 'How to own a cell?',
  article: () => import('./article.mdx'),
  exercise: lazy(() => import('./exercise')),
};

export default Chapter2;
