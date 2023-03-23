import { Component, createSignal, Show, useContext } from 'solid-js';
import { CourseContext, useCourseContext } from '~/components/CourseCore/CourseContext';
import { BiRegularBug } from 'solid-icons/bi';
import { useNavigate } from '@solidjs/router';
import { Portal } from 'solid-js/web';
import '~/assets/css/mrakdown.css';
import '~/assets/css/github-code.css';
import Catalogue from '~/components/CourseCore/CourseExplorer/Catalogue';
import SideBar from '~/components/CourseCore/CourseExplorer/SideBar';
import Header from '~/components/CourseCore/CourseExplorer/Header';

const Index: Component = () => {
  const context = useCourseContext();
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
          onResetClick={context.resetRecord}
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
                    </article>
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

export default Index;
