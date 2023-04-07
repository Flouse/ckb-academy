import { Course, CourseSource, CourseType } from '~/types/course';
import { BasicOperationStore } from '~/content/courses/basic-operation/store';

const basicOperation: Course = {
  id: 'basic-operation',
  author: [
    { name: 'RetricSu', avatar: 'https://avatars.githubusercontent.com/u/23436060?v=4' },
    { name: 'Jason', avatar: 'https://avatars.githubusercontent.com/u/124339951?v=4' },
  ],
  name: 'CKB basic practical operation',
  coverPicture: '/images/course/lesson2.png',
  type: CourseType.Interactive,
  source: CourseSource.Local,
  updateTime: '2023/03/28',
  description:
    'Better understand the previous theory by getting some hands-on experience of CKB blockchain.',
  chapters: [
    {
      id: 'chapter_1',
      title: 'Connecting Wallet',
      manualCompletion: true,
      article: () => import('./chapter_1/chapter_1.mdx'),
    },
    {
      id: 'chapter_2',
      title: 'What is Transaction?',
      article: () => import('./chapter_2/chapter_2.mdx'),
    },
    {
      id: 'chapter_3',
      manualCompletion: true,
      title: 'Send a Transaction',
      article: () => import('./chapter_3/chapter_3.mdx'),
    },
  ],
  store: () => {
    return new BasicOperationStore();
  },
};

export default basicOperation;
