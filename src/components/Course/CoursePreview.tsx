import { Component, For, JSX, Match, Show, Switch } from 'solid-js';
import { Course, CourseSource, CourseType } from '~/types/course';
import {
  BiSolidDetail,
  BiSolidJoystick,
  BiSolidTimer,
  BiSolidUserCircle,
  BiSolidVideos,
} from 'solid-icons/bi';
import { Portal } from 'solid-js/web';
import Tooltip from '~/components/Tooltip';

interface Props {
  course?: Course;
  onStart?: (course: Course) => void;
  onClose?: () => void;
}

const CoursePreview: Component<Props> = (props) => {
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
                <h1 class="text-2xl font-bold text-light-headline dark:text-dark-headline">
                  {props.course?.name}
                </h1>
                <Show when={props.course?.subtitle} keyed>
                  <h2 class="text-lg font-bold text-light-headline dark:text-dark-headline">
                    {props.course?.subtitle}
                  </h2>
                </Show>
                <div class="flex font-medium items-center space-x-6 mt-2">
                  <div>Source: {source[props.course!.source]}</div>
                  <div class="flex items-center">
                    <BiSolidTimer class="mr-2 text-lg" />
                    {props.course?.updateTime}
                  </div>
                </div>
                <div class="mt-2 space-y-2 text-light-tertiary dark:text-dark-tertiary">
                  {props.course?.description}
                </div>
                <div class="flex-auto flex items-center  mt-6 font-medium space-x-1.5">
                  <Show when={props.course?.author} keyed>
                    <For each={props.course?.author}>
                      {(item) => (
                        <Tooltip content={item.name}>
                          <div>
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
                        </Tooltip>
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

export default CoursePreview;
