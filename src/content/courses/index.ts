import { Course } from '~/types/course';
import { communityCourses } from '~/content/courses/community-courses';
import { localCourses } from '~/content/courses/local-courses';

export const courses: Course[] = [...localCourses, ...communityCourses];
