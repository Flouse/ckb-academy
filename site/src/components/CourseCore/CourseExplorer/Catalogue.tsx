import { Component, createMemo, For, Match, Show, Switch } from 'solid-js';
import { CourseChapter } from '~/types/course';
import { FaSolidBookBookmark, FaSolidBookOpen, FaSolidCheck } from 'solid-icons/fa';

interface Props {
  visible?: boolean;
  chapters: CourseChapter[];
  currentChapter?: string;
  underWayChapter?: string;
  chaptersCompletionStatus?: Record<string, boolean>;
  onClick?: (chapter: CourseChapter) => void;
}

const Catalogue: Component<Props> = (props) => {
  enum Status {
    Default,
    UnderWay,
    Completed,
  }

  return (
    <Show when={props.visible} keyed>
      <ul class="text-sm flex-none h-full w-70 overflow-y-scroll border-r border-light-border dark:border-dark-border divide-y divide-light-divider dark:divide-dark-divider">
        <For each={props.chapters}>
          {(chapter) => {
            const status = createMemo(() => {
              let state = Status.Default;
              if (props.underWayChapter == chapter.id) {
                state = Status.UnderWay;
              }
              if (
                props.chaptersCompletionStatus?.[chapter.id] &&
                props.underWayChapter != chapter.id
              ) {
                state = Status.Completed;
              }
              return state;
            });
            return (
              <li
                onClick={() => props.onClick?.(chapter)}
                classList={{
                  'bg-light-hover dark:bg-dark-hover': chapter.id == props.currentChapter,
                  'font-bold text-light-headline dark:text-dark-headline':
                    status() == Status.UnderWay,
                  'text-light-tertiary dark:text-dark-tertiary hover:cursor-no-drop':
                    status() == Status.Default,
                }}
                class="flex  items-center py-3 px-4 hover:bg-light-hover dark:hover:bg-dark-hover cursor-pointer"
              >
                <div
                  class="mr-4 rounded-full p-2"
                  classList={{
                    'bg-light-divider dark:bg-dark-divider text-light-tertiary dark:text-dark-tertiary':
                      status() == Status.Default,
                    'bg-light-headline dark:bg-dark-headline dark:text-black text-white text-light-headline':
                      status() == Status.UnderWay,
                    'bg-success text-white': status() == Status.Completed,
                  }}
                >
                  <Switch fallback={<FaSolidBookBookmark class="text-xs" />}>
                    <Match when={status() == Status.UnderWay} keyed>
                      <FaSolidBookOpen class="text-xs" />
                    </Match>
                    <Match when={status() == Status.Completed} keyed>
                      <FaSolidCheck class="text-xs" />
                    </Match>
                  </Switch>
                </div>
                <div>{chapter.title}</div>
              </li>
            );
          }}
        </For>
      </ul>
    </Show>
  );
};

export default Catalogue;
