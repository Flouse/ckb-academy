import { Course, CourseSource, CourseType } from '~/types/course';
import { contributorsData } from '~/data/contributors.data';

const basicTheory: Course = {
  id: 'basic-theory',
  author: [
    // see https://github.com/RetricSu/zero2ckb-web/graphs/contributors
    contributorsData.RetricSu,
    contributorsData.Jason,
    contributorsData.Ssslllsss,
    contributorsData.ChemaSsp,
    contributorsData.Xying21,
  ],
  name: 'CKB basic theoretical knowledge',
  coverPicture: '/images/course/lesson1.png',
  type: CourseType.Interactive,
  source: CourseSource.Local,
  updateTime: '2023/03/20',
  description:
    'Whether you are developing dApp on CKB, or simply curious and want to understand the basic concepts, you can follow this tutorial to complete your first intimate encounter with CKB',
  chapters: [
    {
      id: 'chapter_1',
      title: 'What is CKB?',
      article: () => import('./chapter_1.mdx'),
    },
    {
      id: 'chapter_2',
      title: 'What does a cell contain?',
      article: () => import('./chapter_2.mdx'),
    },
    {
      id: 'chapter_3',
      title: 'How to tell that you own a cell?',
      article: () => import('./chapter_3.mdx'),
    },
    {
      id: 'chapter_4',
      title: 'Summary 1',
      article: () => import('./chapter_4.mdx'),
    },
    {
      id: 'chapter_5',
      title: 'Where is the code actually located?',
      article: () => import('./chapter_5.mdx'),
    },
    {
      id: 'chapter_6',
      title: 'What if the lock code is lost?',
      article: () => import('./chapter_6.mdx'),
    },
    {
      id: 'chapter_7',
      title: 'What is a transaction?',
      article: () => import('./chapter_7.mdx'),
    },
    {
      id: 'chapter_8',
      title: 'Role of the type script',
      article: () => import('./chapter_8.mdx'),
    },
    {
      id: 'chapter_9',
      title: 'Summary 2',
      article: () => import('./chapter_9.mdx'),
    },
  ],
};

export default basicTheory;
