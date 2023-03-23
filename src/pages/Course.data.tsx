import { RouteDataFunc } from '@solidjs/router';
import { CourseSource, CourseType, ICourse } from '~/types/course';
import { useI18n } from '@solid-primitives/i18n';
import { Accessor, createMemo, createResource, createSignal, splitProps } from 'solid-js';
import { courses } from '~/content/courses';
import { LangsEnum } from '~/common/constants/site-basic';

export interface ICourseData {
  courses: Accessor<ICourse[]>;
  source: CourseSource | undefined;
  type: CourseType | undefined;
}

export const CourseData: RouteDataFunc<unknown, ICourseData> = () => {
  const [, { locale }] = useI18n();
  const [source, setSource] = createSignal<CourseSource>();
  const [type, setType] = createSignal<CourseType>();

  const [data] = createResource(
    () => [source(), type(), locale()],
    ([source, type, lang]) => {
      return courses
        .filter((item) => {
          return (
            (source == undefined || item.source === source) &&
            (type == undefined || item.type === type)
          );
        })
        .map((item) => {
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
    get source() {
      return source();
    },
    set source(source: CourseSource | undefined) {
      setSource(source);
    },

    get type() {
      return type();
    },
    set type(type: CourseType | undefined) {
      setType(type);
    },
  };
};
