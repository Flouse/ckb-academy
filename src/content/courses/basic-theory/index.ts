import { CourseSource, CourseType, ICourseMeta } from '~/types/course';

const Basic: ICourseMeta = {
  id: 'basic-theory',
  author: [
    { name: 'Retric', avatar: 'https://avatars.githubusercontent.com/u/23436060?v=4' },
    { name: 'Jason', avatar: 'https://avatars.githubusercontent.com/u/124339951?v=4' },
  ],
  name: 'CKB basic theoretical knowledge',
  coverPicture: '/images/lesson1.png',
  type: CourseType.Interactive,
  source: CourseSource.Local,
  updateTime: '2023/03/20',
  description:
    'Whether you are developing DApp on CKB, or simply curious and want to understand the basic principles, you can follow this tutorial to complete your first intimate encounter with CKB',
  chapters: [
    {
      id: 'chapter_1',
      title: 'What is CKB?',
      article: () => import('./chapter_1.mdx'),
    },
    {
      id: 'chapter_2',
      title: 'How to own a cell?',
      article: () => import('./chapter_2.mdx'),
    },
    {
      id: 'chapter_3',
      title: 'How to tell that you own a cell?',
      article: () => import('./chapter_3.mdx'),
    },
    {
      id: 'chapter_4',
      title: 'Summary',
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
      title: 'Summary',
      article: () => import('./chapter_9.mdx'),
    },
  ],
};

export default Basic;
