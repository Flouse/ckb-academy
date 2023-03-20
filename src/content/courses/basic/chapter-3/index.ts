import { ICourseChapterMeta } from '~/types/course';
import { lazy } from 'solid-js';

const Chapter3: ICourseChapterMeta = {
  id: 'Chapter_3',
  title: 'How to tell that you own a cell?',
  article: () => import('./article.mdx'),
  exercise: lazy(() => import('./exercise')),
};

export default Chapter3;
