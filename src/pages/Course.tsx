import { Component, For, ParentProps, Show } from 'solid-js';
import { useNavigate, useRouteData } from '@solidjs/router';
import { ICourseData } from '~/pages/Course.data';
import { ICourse } from '~/types/course';
import { BiSolidCategory, BiSolidUserCircle } from 'solid-icons/bi';

const Course: Component<ParentProps> = () => {
  const { courses } = useRouteData<ICourseData>();
  const go = useNavigate();

  const onSelectCourse = (course: ICourse) => {
    go(course.id);
  };

  return (
    <>
      <div
        class="h-container bg-cover bg-top bg-light-background_dark dark:bg-dark-background"
        style={{ 'background-image': 'url(/images/logo-line.png)' }}
      >
        <div class="container mx-auto py-16">
          <Show when={courses().length > 0} keyed fallback={<div>暂时没有数据</div>}>
            <div class="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-10">
              <For each={courses()}>
                {(item) => <CourseItem course={item} onSelect={onSelectCourse} />}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </>
  );
};
export default Course;

const CourseItem: Component<{ course: ICourse; onSelect?: (course: ICourse) => void }> = (
  props,
) => {
  return (
    <>
      <div
        onClick={() => props.onSelect?.(props.course)}
        class="link shadow-2xl bg-light-background dark:bg-dark-background_dark overflow-hidden flex flex-col h-full rounded-2xl h-28"
      >
        <div
          class="h-40 bg-cover"
          style={{ 'background-image': `url(${props.course.coverPicture || ''})` }}
        />
        <div class="px-8 py-6 flex-auto">
          <h1 class="text-xl font-bold text-light-headline dark:text-dark-headline mb-2">
            {props.course.name}
          </h1>
          <p class="line-clamp-2 text-sm">{props.course.description}</p>
        </div>
        <div class="flex text-sm divide-x divide-light-divider/5 dark:divide-dark-divider/5 border-t border-light-divider/5 dark:border-dark-divider/5">
          <span class="flex-1 flex items-center font-medium px-4 py-3">
            <BiSolidCategory class="mr-2" /> Chapter ({props.course.chapters.length})
          </span>
          <span class="flex-1 flex items-center font-medium px-4 py-3">
            <BiSolidUserCircle class="mr-2" /> {props.course.author}
          </span>
        </div>
      </div>
    </>
  );
};
