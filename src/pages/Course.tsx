import { Component, createSignal, For, JSX, Match, ParentProps, Show, Switch } from 'solid-js';
import { useNavigate, useRouteData } from '@solidjs/router';
import { ICourseData } from '~/pages/Course.data';
import { CourseSource, CourseType, ICourse } from '~/types/course';
import {
  BiSolidCategory,
  BiSolidDetail,
  BiSolidJoystick,
  BiSolidTimer,
  BiSolidUserCircle,
  BiSolidVideos,
} from 'solid-icons/bi';
import DataEmpty from '~/components/DataEmpty';
import { Portal } from 'solid-js/web';

const Course: Component<ParentProps> = () => {
  const data = useRouteData<ICourseData>();
  const go = useNavigate();
  const [preview, setPreview] = createSignal<ICourse>();

  const onSelectCourse = (course: ICourse) => {
    setPreview(course);
  };

  const onStartCourse = (course: ICourse) => {
    if (course.source == CourseSource.Community) {
      window.open(course.url);
    } else {
      go(course.id);
    }
    setPreview(undefined);
  };

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
    <>
      <div
        class="h-container bg-cover bg-top"
        style={{ 'background-image': 'url(/images/logo-line.png)' }}
      >
        <div class="container mx-auto py-16">
          <div class="flex space-x-10 mb-14">
            <div class="flex space-x-4">
              <For each={source}>
                {(item) => (
                  <div
                    onClick={() => (data.source = item.source)}
                    classList={{
                      'bg-light-headline dark:bg-white text-white dark:text-black':
                        data.source == item.source,
                      'bg-white dark:bg-dark-background_dark': data.source !== item.source,
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
                    onClick={() => (data.type = item.type)}
                    classList={{
                      'bg-light-headline dark:bg-white text-white dark:text-black':
                        data.type == item.type,
                      'bg-white dark:bg-dark-background_dark': data.type !== item.type,
                    }}
                    class="link h-8 w-8 rounded-full shadow-xl shadow-light-shadow/10 flex justify-center items-center"
                  >
                    <i class="text-lg">{item.icon}</i>
                  </div>
                )}
              </For>
            </div>
          </div>

          <Show
            when={data.courses().length > 0}
            keyed
            fallback={
              <div class="pt-36">
                <DataEmpty />
              </div>
            }
          >
            <div class="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-10">
              <For each={data.courses()}>
                {(item) => <CourseItem course={item} onSelect={onSelectCourse} />}
              </For>
            </div>
          </Show>
        </div>
      </div>

      <Preview
        course={preview()}
        onStart={onStartCourse}
        onClose={() => {
          setPreview(undefined);
        }}
      />
    </>
  );
};
export default Course;

const CourseItem: Component<{ course: ICourse; onSelect?: (course: ICourse) => void }> = (
  props,
) => {
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
    <>
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
          <h1 class="text-lg font-bold text-light-headline dark:text-dark-headline mb-2">
            {props.course.name}
          </h1>
          <p class="line-clamp-2 text-sm">{props.course.description}</p>
        </div>
      </div>
    </>
  );
};

const Preview: Component<{
  course?: ICourse;
  onStart?: (course: ICourse) => void;
  onClose?: () => void;
}> = (props) => {
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

  const source: Record<CourseSource, string> = {
    [CourseSource.Local]: 'Local',
    [CourseSource.Community]: 'Community',
  };

  return (
    <>
      <Show when={props.course} keyed>
        <Portal>
          <div
            onClick={props.onClose}
            class="fixed top-0 bottom-0 right-0 left-0 z-10 bg-light-mask dark:bg-dark-mask"
          />
          <div class="fixed top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] z-10">
            <div class="relative w-[550px] shadow-xl shadow-light-shadow bg-light-background_dark dark:bg-dark-background_dark overflow-hidden rounded-2xl">
              <i class="w-10 h-10 rounded-full bg-white shadow absolute text-2xl dark:text-dark-background_dark right-6 top-6 flex items-center justify-center">
                {type[props.course!.type].icon}
              </i>
              <div
                class="h-40 bg-cover bg-no-repeat bg-center"
                style={{ 'background-image': `url(${props.course?.coverPicture || ''})` }}
              />

              <div class="px-8 py-6">
                <h6 class="text-2xl font-bold text-light-headline dark:text-dark-headline">
                  {props.course?.name}
                </h6>
                <div class="flex font-medium items-center space-x-6 mt-2">
                  <div>Source: {source[props.course!.source]}</div>
                  <div class="flex items-center">
                    <BiSolidTimer class="mr-2 text-lg" />
                    {props.course?.updateTime}
                  </div>
                </div>
                <p class="mt-2">{props.course?.description}</p>
                <div class="flex-auto flex items-center  mt-6 font-medium space-x-1.5">
                  <Show when={props.course?.author} keyed>
                    <For each={props.course?.author}>
                      {(item) => (
                        <div title={item.name}>
                          <Switch>
                            <Match when={item.avatar} keyed>
                              <img
                                style={{ width: '30px' }}
                                class="rounded-full"
                                src={item.avatar}
                              ></img>
                            </Match>
                            <Match when={!item.avatar} keyed>
                              <BiSolidUserCircle class="text-3xl" />
                            </Match>
                          </Switch>
                        </div>
                      )}
                    </For>
                  </Show>
                </div>

                <div class="flex space-x-6 justify-end mt-10">
                  <button
                    onClick={() => props.onStart?.(props.course!)}
                    class="button-primary-solid w-full button-lg"
                  >
                    {props.course?.source == CourseSource.Local ? 'Start' : 'Open'}
                  </button>
                  <button onClick={props.onClose} class="button button-lg w-full">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
};
