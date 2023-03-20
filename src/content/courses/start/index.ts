import { ICourseMeta } from '~/types/course';
import Chapter1 from '~/content/courses/start/chapter-1';

const Start: ICourseMeta = {
  id: 'course_start',
  author: 'CKB School',
  name: 'Test course',
  coverPicture:
    'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1600',
  nameTranslate: {
    'zh-cn': '测试课程',
  },
  description: 'This is a test course, with only one chapter and no exercises.',
  descriptionTranslate: {
    'zh-cn': '这是一个测试课程,只有一个章节而且没有练习',
  },
  chapters: [Chapter1],
};

export default Start;
