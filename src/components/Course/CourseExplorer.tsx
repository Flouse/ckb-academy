import {
  Component,
  createMemo,
  createSignal,
  For,
  Match,
  Show,
  Switch,
  useContext,
} from 'solid-js';
import { CourseContext } from '~/components/Course/CourseContext';
import {
  BiRegularBookContent,
  BiRegularBug,
  BiRegularCoffee,
  BiRegularExpand,
  BiRegularLeftArrowCircle,
  BiRegularReset,
  BiSolidBookContent,
} from 'solid-icons/bi';
import { FaSolidBookBookmark, FaSolidBookOpen, FaSolidCheck } from 'solid-icons/fa';
import { useNavigate } from '@solidjs/router';
import { ICourse, ICourseChapter } from '~/types/course';
import { Portal } from 'solid-js/web';
import '~/assets/css/mrakdown.css';
import '~/assets/css/github-code.css';

const CourseExplorer: Component = () => {
  const context = useContext(CourseContext);
  const go = useNavigate();
  const [fullScreen, setFullScreen] = createSignal(false);
  const [visible, setVisible] = createSignal(true);

  return (
    <Portal>
      <div
        classList={{
          'h-container container mx-auto': !fullScreen(),
          'h-screen w-screen fixed z-10 bg-light-background_dark dark:bg-dark-background top-0 bottom-0':
            fullScreen(),
        }}
        class="flex flex-col overflow-hidden"
      >
        <Header
          fullScreen={fullScreen()}
          course={context.course}
          onBackClick={() => go('/courses')}
          onFullScreenClick={() => setFullScreen((val) => !val)}
          catalogueVisible={visible()}
          onCatalogueVisibleClick={() => setVisible((val) => !val)}
          onResetClick={context.reset}
        />

        <div class="flex h-full overflow-hidden rounded-t-2xl border border-light-border dark:border-dark-border">
          <Catalogue
            visible={visible()}
            currentChapter={context.currentChapterId()}
            chaptersCompletionStatus={context.chaptersCompletionStatus()}
            underWayChapter={context.underWayChapterId()}
            onClick={(chapter) => {
              if (
                chapter.id == context.underWayChapterId() ||
                context.chaptersCompletionStatus()[chapter.id]
              ) {
                context.setCurrentChapter(chapter);
              }
            }}
            chapters={context.chapters}
          />
          <Show when={context.article?.error === undefined} keyed fallback={<Error />}>
            <div class="flex-auto h-full overflow-hidden flex flex-col">
              <div class="flex flex-auto overflow-hidden relative">
                <section class="m-10 flex-auto overflow-y-auto">
                  <Show when={context.article?.loading === false} keyed>
                    <article class="markdown overflow-y-scroll max-w-none mx-auto">
                      {context.article?.()?.({})}
                      <Show when={context.isUnderWayChapter()} keyed>
                        <div class="py-8 mt-8 border-t border-light-border flex">
                          <button
                            disabled={!context.canNextChapter()}
                            onClick={context.nextChapter}
                            class="button"
                          >
                            {context.isLastChapter() ? 'Complete course' : 'Next chapter'}
                          </button>
                        </div>
                      </Show>
                    </article>
                  </Show>
                </section>
                <section class=" flex-none w-72 overflow-y-auto border-l border-light-border dark:border-dark-border">
                  <SideBar />
                </section>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </Portal>
  );
};

const Catalogue: Component<{
  visible?: boolean;
  chapters: ICourseChapter[];
  currentChapter?: string;
  underWayChapter?: string;
  chaptersCompletionStatus?: Record<string, boolean>;
  onClick?: (chapter: ICourseChapter) => void;
}> = (props) => {
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

const Header: Component<{
  course?: ICourse;
  onBackClick?: () => void;
  onResetClick?: () => void;
  fullScreen?: boolean;
  catalogueVisible?: boolean;
  onCatalogueVisibleClick?: () => void;
  onFullScreenClick?: () => void;
}> = (props) => {
  return (
    <header class="flex flex-none py-6 items-center" classList={{ 'px-6': props.fullScreen }}>
      <div class="mr-8 flex items-center text-2xl space-x-4">
        <i class="link">
          <BiRegularLeftArrowCircle class="cursor-pointer" onClick={props.onBackClick} />
        </i>
        <i class="link" onClick={props.onCatalogueVisibleClick}>
          {props.catalogueVisible ? <BiSolidBookContent /> : <BiRegularBookContent />}
        </i>
        <i class="link">
          <BiRegularReset class="cursor-pointer" onClick={props.onResetClick} />
        </i>
      </div>
      <div class="flex-auto">
        <h1 class="font-bold  text-base text-light-headline dark:text-dark-headline">
          {props.course?.name}
        </h1>
      </div>
      <div class="flex items-center text-xl space-x-4 ml-4">
        <i class="link">
          <BiRegularExpand onClick={props.onFullScreenClick} />
        </i>
      </div>
    </header>
  );
};

const SideBar: Component = () => {
  const [tab, setTab] = createSignal('tools');

  const tabs: { name: string; id: string }[] = [
    { id: 'tools', name: 'Tools' },
    { id: 'library', name: 'Library' },
  ];

  return (
    <div class="h-full flex flex-col">
      <ul class="flex divide-x divide-light-border dark:divide-dark-border border-b border-light-border dark:border-dark-border">
        <For each={tabs}>
          {(item) => (
            <li
              onClick={() => setTab(item.id)}
              class="relative cursor-pointer flex-1 after:absolute after:-bottom-0 after:left-0 after:bg-transparent after:content-[''] after:h-0.5 after:w-full  flex items-center text-sm justify-center py-2"
              classList={{
                'after:bg-light-border dark:after:bg-dark-border': tab() == item.id,
              }}
            >
              {item.name}
            </li>
          )}
        </For>
      </ul>
      <div class="flex-auto flex items-center justify-center">
        <div class="flex flex-col items-center text-light-divider dark:text-dark-divider">
          <i>
            <BiRegularCoffee class="text-4xl" />
          </i>
          <span>No data...</span>
        </div>
      </div>
    </div>
  );
};

const Error: Component = () => {
  return (
    <div class="flex-auto flex items-center justify-center flex-col">
      <i class="text-7xl mb-4">
        <BiRegularBug />
      </i>
      <span>Current chapter cannot be loaded.</span>
    </div>
  );
};

export default CourseExplorer;
