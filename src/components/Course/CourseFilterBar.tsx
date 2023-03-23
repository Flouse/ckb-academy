import { Component, For, JSX } from 'solid-js';
import { CourseSource, CourseType } from '~/types/course';
import { BiSolidCategory, BiSolidDetail, BiSolidJoystick, BiSolidVideos } from 'solid-icons/bi';

interface Props {
  currentSource: CourseSource | undefined;
  currentType: CourseType | undefined;
  onSourceChange: (source: CourseSource | undefined) => void;
  onTypeChange: (source: CourseType | undefined) => void;
}

const CourseFilterBar: Component<Props> = (props) => {
  const source: { source: CourseSource | undefined; title: string }[] = [
    {
      source: undefined,
      title: 'All sources',
    },
    {
      source: CourseSource.Local,
      title: 'Local',
    },
    {
      source: CourseSource.Community,
      title: 'Community',
    },
  ];

  const type: { type: CourseType | undefined; title: string; icon?: JSX.Element }[] = [
    {
      type: undefined,
      title: 'All',
      icon: <BiSolidCategory />,
    },
    {
      type: CourseType.Interactive,
      title: 'Interactive',
      icon: <BiSolidJoystick />,
    },
    {
      type: CourseType.Article,
      title: 'Article',
      icon: <BiSolidDetail />,
    },
    {
      type: CourseType.Video,
      title: 'Video',
      icon: <BiSolidVideos />,
    },
  ];

  return (
    <div class="flex space-x-10 mb-14">
      <div class="flex space-x-4">
        <For each={source}>
          {(item) => (
            <div
              onClick={() => props.onSourceChange(item.source)}
              classList={{
                'bg-light-headline dark:bg-white text-white dark:text-black':
                  props.currentSource == item.source,
                'bg-white dark:bg-dark-background_dark': props.currentSource !== item.source,
              }}
              class="link min-w-28 px-4 h-8 rounded-full shadow-xl shadow-light-shadow/10 flex justify-center items-center"
            >
              {item.title}
            </div>
          )}
        </For>
      </div>
      <div class="flex space-x-4">
        <For each={type}>
          {(item) => (
            <div
              onClick={() => props.onTypeChange(item.type)}
              classList={{
                'bg-light-headline dark:bg-white text-white dark:text-black':
                  props.currentType == item.type,
                'bg-white dark:bg-dark-background_dark': props.currentType !== item.type,
              }}
              class="link h-8 w-8 rounded-full shadow-xl shadow-light-shadow/10 flex justify-center items-center"
            >
              <i class="text-lg">{item.icon}</i>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default CourseFilterBar;
