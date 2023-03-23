import { CourseSource, CourseType, ICourseMeta } from '~/types/course';

export const thirdPartyCourses: ICourseMeta[] = [
  {
    id: 'basic-theory-33',
    author: [
      //{ name: 'Retric', avatar: 'https://avatars.githubusercontent.com/u/23436060?v=4' },
      // { name: 'Jason', avatar: 'https://avatars.githubusercontent.com/u/124339951?v=4' },
      // { name: 'Flouse', avatar: 'https://avatars.githubusercontent.com/u/1297478?v=4' },
    ],
    name: 'CKB basic theoretical knowledge',
    source: CourseSource.Community,
    updateTime: '2023/10/12',
    type: CourseType.Article,
    coverPicture: '/images/lesson1.png',
    url: 'https://www.baidu.com',
    description: 'Cells are obtained of the global consensus on the chain.',
  },
];
