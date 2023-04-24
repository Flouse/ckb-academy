import { Component, JSX, Show } from 'solid-js';
import { Course, CourseType } from '~/types/course';
import { BiSolidDetail, BiSolidJoystick, BiSolidVideos } from 'solid-icons/bi';

interface Props {
  course: Course;
  onSelect?: (course: Course) => void;
}

const CourseItem: Component<Props> = (props) => {
  const type: Record<CourseType, { title: string; icon?: JSX.Element }> = {
    [CourseType.Interactive]: {
      title: 'Interactive',
      icon: <BiSolidJoystick />,
    },
    [CourseType.Article]: {
      title: 'Article',
      icon: <BiSolidDetail />,
    },
    [CourseType.Video]: {
      title: 'Video',
      icon: <BiSolidVideos />,
    },
  };

  return (
    <div
      onClick={() => props.onSelect?.(props.course)}
      class="relative link shadow-2xl shadow-light-shadow bg-light-background_dark dark:bg-dark-background_dark overflow-hidden flex flex-col h-full rounded-2xl h-28"
    >
      <div class="w-10 h-10 rounded-full bg-white shadow absolute text-2xl dark:text-dark-background_dark right-6 top-6 flex items-center justify-center">
        {type[props.course.type].icon}
      </div>
      <div
        class="h-36 bg-cover bg-center"
        style={{ 'background-image': `url(${props.course.coverPicture || ''})` }}
      />
      <div class="px-8 py-6 flex-auto">
        <h1 class="text-lg font-bold text-light-headline dark:text-dark-headline">
          {props.course.name}
        </h1>
        <Show when={props.course.subtitle} keyed>
          <h1 class="font-bold text-light-headline dark:text-dark-headline">
            {props.course.subtitle}
          </h1>
        </Show>
        <div class="line-clamp-2 text-sm mt-2 text-light-tertiary dark:text-dark-tertiary">
          {props.course.description}
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
