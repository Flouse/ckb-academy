import { RouteDataFunc, useParams } from '@solidjs/router';
import { Course } from '~/types/course';
import { createResource } from 'solid-js';
import { courses } from '~/content/courses';

export interface CourseDetailsData {
  course: Course | undefined;
  loading: boolean;
}

export const CourseDetailsData: RouteDataFunc<unknown, CourseDetailsData> = () => {
  const params = useParams();
  const [data] = createResource(
    () => params,
    (params) => {
      return courses.find((item) => item.id === params.courseId);
    },
  );

  return {
    loading: data.loading,
    get course() {
      return data();
    },
  };
};
