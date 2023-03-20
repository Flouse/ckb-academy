import { ICourseChapterMeta } from '~/types/course';
import { lazy } from 'solid-js';

const Chapter1: ICourseChapterMeta = {
  id: 'Chapter_1',
  title: 'What is CKB?',
  article: () => import('./article.mdx'),
  exercise: lazy(() => import('./exercise')),
};

export default Chapter1;
