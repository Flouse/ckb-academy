import { ICourseMeta } from '~/types/course';
import { thirdPartyCourses } from '~/content/courses/third-party-courses';
import { localCourses } from '~/content/courses/local-courses';

export const courses: ICourseMeta[] = [...localCourses, ...thirdPartyCourses];
