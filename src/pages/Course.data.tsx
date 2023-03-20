import { RouteDataFunc } from '@solidjs/router';
import { ICourse } from '~/types/course';
import { useI18n } from '@solid-primitives/i18n';
import { Accessor, createMemo, createResource, splitProps } from 'solid-js';
import { courses } from '~/content/courses';
import { LangsEnum } from '~/common/constants/site-basic';

export interface ICourseData {
  courses: Accessor<ICourse[]>;
}

export const CourseData: RouteDataFunc<unknown, ICourseData> = () => {
  const [, { locale }] = useI18n();
  const [data] = createResource(
    () => locale(),
    (lang) => {
      return courses.map((item) => {
        const [local, others] = splitProps(item, ['nameTranslate', 'descriptionTranslate']);
        const name = local.nameTranslate?.[lang as LangsEnum] ?? item.name;
        const description = local.descriptionTranslate?.[lang as LangsEnum] ?? item.description;
        return { ...others, name, description } as ICourse;
      });
    },
  );

  const courseList = createMemo(() => data() ?? []);

  return {
    get courses() {
      return courseList;
    },
  };
};
