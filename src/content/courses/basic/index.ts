import { ICourseMeta } from '~/types/course';
import Chapter1 from '~/content/courses/basic/chapter-1';
import Chapter2 from '~/content/courses/basic/chapter-2';
import Chapter3 from '~/content/courses/basic/chapter-3';

const Basic: ICourseMeta = {
  id: 'course_basic',
  author: 'CKB School',
  name: 'Basic practical operation class',
  coverPicture: '/images/lesson1.png',
  nameTranslate: {
    'zh-cn': 'Basic practical operation class',
  },
  description:
    'Here we provide easy-to-understand interactive courses and technical documents to help Nervos ecological development.',
  descriptionTranslate: {
    'zh-cn':
      'Here we provide easy-to-understand interactive courses and technical documents to help Nervos ecological development.',
  },
  chapters: [
    Chapter1,
    Chapter2,
    {
      id: 'Chapter_4',
      title: 'Summary',
      article: () => import('./chapter-1/article.mdx'),
    },
    {
      id: 'Chapter_5',
      title: 'Where is the code actually located?',
      article: () => import('./chapter-1/article.mdx'),
    },
    {
      id: 'Chapter_6',
      title: 'What if the lock code is lost?',
      article: () => import('./chapter-1/article.mdx'),
    },
    {
      id: 'Chapter_7',
      title: 'What is a transaction?',
      article: () => import('./chapter-1/article.mdx'),
    },
    {
      id: 'Chapter_8',
      title: 'Role of the type lock',
      article: () => import('./chapter-1/article.mdx'),
    },
    Chapter3,
  ],
};

export default Basic;
