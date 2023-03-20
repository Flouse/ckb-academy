import { Component, createSignal, For, Show, useContext } from 'solid-js';
import { CourseContext } from '~/components/Course/CourseContext';
import {
  BiRegularBookContent,
  BiRegularBug,
  BiRegularCheck,
  BiRegularExpand,
  BiRegularLeftArrowCircle,
  BiSolidBookContent,
} from 'solid-icons/bi';
import { useNavigate } from '@solidjs/router';
import { ICourse, ICourseChapter } from '~/types/course';
import { Portal } from 'solid-js/web';

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
        />

        <div class="flex h-full overflow-hidden  border border-light-border dark:border-dark-border">
          <Catalogue
            visible={visible()}
            currentChapter={context.currentChapterId()}
            underWayChapter={context.underWayChapterId()}
            onClick={(chapter) => context.setCurrentChapter(chapter)}
            chapters={context.chapters}
          />
          <Show when={context.loader?.error === undefined} keyed fallback={<Error />}>
            <div class="flex-auto h-full overflow-hidden flex flex-col">
              <div class="flex flex-auto overflow-hidden relative border-b border-light-border dark:border-dark-border">
                <section class="px-10 py-10 flex-auto overflow-y-auto">
                  <Show when={context.loader?.loading === false} keyed>
                    <article class="prose overflow-y-scroll max-w-none dark:prose-invert">
                      {context.loader?.()?.article?.({})}
                    </article>
                  </Show>
                </section>
                <Show when={context.loader?.loading === false && context.loader()?.exercise} keyed>
                  <section class="flex-none max-w-[600px] min-w-[400px] overflow-y-auto border-l border-light-border dark:border-dark-border">
                    {context.loader?.()?.exercise?.({})}
                  </section>
                </Show>
              </div>
              <Footer
                completionStatus={context.chaptersCompletionStatus()}
                underWayChapter={context.underWayChapterId()}
                isUnderWayChapter={context.isUnderWayChapter()}
                isLastChapter={context.isLastChapter()}
                canNext={context.canNextChapter()}
                onNextChapterClick={() => context.nextChapter()}
              />
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
  onClick?: (chapter: ICourseChapter) => void;
}> = (props) => {
  return (
    <Show when={props.visible} keyed>
      <ul class="text-sm flex-none h-full max-w-[300px] overflow-y-scroll border-r border-light-border dark:border-dark-border divide-y divide-light-divider dark:divide-dark-divider">
        <For each={props.chapters}>
          {(chapter) => (
            <li
              onClick={() => props.onClick?.(chapter)}
              classList={{
                'bg-light-hover dark:bg-dark-hover': chapter.id == props.currentChapter,
                'font-bold text-light-headline dark:text-dark-headline':
                  chapter.id == props.underWayChapter,
              }}
              class="py-3 px-4 hover:bg-light-hover dark:hover:bg-dark-hover cursor-pointer"
            >
              {chapter.title}
            </li>
          )}
        </For>
      </ul>
    </Show>
  );
};

const Header: Component<{
  course?: ICourse;
  onBackClick?: () => void;
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
      </div>
      <div class="flex-auto">
        <h1 class="font-bold text-light-headline dark:text-dark-headline">{props.course?.name}</h1>
        <p class="text-xs">{props.course?.description}</p>
      </div>
      <div class="flex items-center text-xl space-x-4 ml-4">
        <i class="link">
          <BiRegularExpand onClick={props.onFullScreenClick} />
        </i>
      </div>
    </header>
  );
};

const Footer: Component<{
  completionStatus: Record<string, boolean>;
  underWayChapter: string;
  isUnderWayChapter: boolean;
  isLastChapter: boolean;
  canNext: boolean;
  onNextChapterClick: () => void;
}> = (props) => {
  const basic_class = 'w-8 h-8 flex justify-center items-center font-bold rounded-full border';
  const default_class =
    'text-light-divider dark:text-dark-divider border-light-border dark:border-dark-border';
  const completed_class = 'text-white border-success bg-success';
  const underway_class =
    'text-white dark:text-black bg-light-secondary dark:bg-dark-secondary border-light-secondary dark:border-dark-secondary';

  enum Status {
    Default,
    UnderWay,
    Completed,
  }

  return (
    <div class="flex px-4 py-4 items-center">
      <div class="flex flex-auto space-x-4 items-center">
        <For each={Object.entries(props.completionStatus)}>
          {([id], index) => {
            let status = Status.Default;
            if (props.underWayChapter === id) {
              status = Status.UnderWay;
            }
            if (props.completionStatus[id]) {
              status = Status.Completed;
            }
            const indexText = index() + 1;
            return (
              <div
                class={basic_class}
                classList={{
                  [`${default_class}`]: status === Status.Default,
                  [`${underway_class}`]: status === Status.UnderWay,
                  [`${completed_class}`]: status === Status.Completed,
                }}
              >
                {props.completionStatus[id] ? <BiRegularCheck class="text-lg" /> : indexText}
              </div>
            );
          }}
        </For>
      </div>
      <Show when={props.isUnderWayChapter} keyed>
        <button
          disabled={!props.canNext}
          onClick={props.onNextChapterClick}
          class="button-primary-solid py-1 text-sm px-4"
        >
          {props.isLastChapter ? 'Complete course' : 'Next chapter'}
        </button>
      </Show>
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
