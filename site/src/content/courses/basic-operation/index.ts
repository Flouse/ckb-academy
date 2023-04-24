import { Course, CourseSource, CourseType } from '~/types/course';
import { BasicOperationStore } from '~/content/courses/basic-operation/store';
import { contributorsData } from '~/data/contributors.data';

const basicOperation: Course = {
  id: 'basic-operation',
  author: [contributorsData.RetricSu, contributorsData.Jason],
  name: 'CKB basic practical operation',
  coverPicture: '/images/course/lesson2.png',
  type: CourseType.Interactive,
  source: CourseSource.Local,
  updateTime: '2023/03/28',
  description:
    'Get a better understanding of the previous theory by getting some hands-on experience with CKB blockchain. In this lesson, you will manually construct a transaction and send it to CKB testnet.',
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
