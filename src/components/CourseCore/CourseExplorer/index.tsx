import { Component, createSignal, Show } from 'solid-js';
import { useCourseContext } from '~/components/CourseCore/CourseContext';
import { BiRegularBug, BiRegularLoaderCircle } from 'solid-icons/bi';
import {
  FaSolidDownLeftAndUpRightToCenter,
  FaSolidUpRightAndDownLeftFromCenter,
} from 'solid-icons/fa';
import { useNavigate } from '@solidjs/router';
import { Portal } from 'solid-js/web';
import '~/assets/css/markdown.css';
import '~/assets/css/github-code.css';
import Catalogue from '~/components/CourseCore/CourseExplorer/Catalogue';
import ToolBox from '~/components/CourseCore/CourseExplorer/ToolBox';
import Header from '~/components/CourseCore/CourseExplorer/Header';
import Tooltip from '~/components/Tooltip';
import TermContentPreview from '~/components/TermContentPreview';

const Index: Component = () => {
  const context = useCourseContext();
  const go = useNavigate();
  const [fullScreen, setFullScreen] = createSignal(false);
  const [articleLooseLayout, setArticleLooseLayout] = createSignal(false);
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

          <div class="flex h-full flex-auto overflow-hidden">
            <Show when={context.article?.loading == false} keyed fallback={<Loading />}>
              <Show when={context.article?.error === undefined} keyed fallback={<Error />}>
                <section class="flex flex-col flex-auto">
                  <Show when={context.article?.loading === false} keyed>
                    <div class="flex items-center justify-end h-10 px-4 space-x-4 flex-none">
                      <Tooltip content={articleLooseLayout() ? 'Compact Layout' : 'Loose Layout'}>
                        <i
                          class="link text-xs text-light-tertiary dark:text-dark-tertiary"
                          onClick={() => setArticleLooseLayout((val) => !val)}
                        >
                          <Show
                            when={articleLooseLayout()}
                            keyed
                            fallback={<FaSolidUpRightAndDownLeftFromCenter />}
                          >
                            <FaSolidDownLeftAndUpRightToCenter />
                          </Show>
                        </i>
                      </Tooltip>
                    </div>
                    <div class="h-full mx-10 mb-10 flex-auto overflow-y-auto">
                      <div
                        class="mx-auto"
                        classList={{
                          'max-w-2xl': !articleLooseLayout(),
                          'max-w-none': articleLooseLayout(),
                        }}
                      >
                        <article class="markdown">
                          {context.article?.()?.({
                            components: {
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              term: (props) => <TermContentPreview {...props} />,
                            },
                          })}
                        </article>
                        <Show when={context.isUnderWayChapter()} keyed>
                          <div class="pt-8 mt-8 border-t border-light-border dark:border-dark-border flex">
                            <button
                              disabled={!context.canNextChapter()}
                              onClick={context.nextChapter}
                              class="button"
                            >
                              {context.isLastChapter() ? 'Complete course' : 'Next chapter'}
                            </button>
                          </div>
                        </Show>
                      </div>
                    </div>
                  </Show>
                </section>
              </Show>
            </Show>
            <section class="flex-none w-52 overflow-y-auto border-l border-light-border dark:border-dark-border">
              <ToolBox />
            </section>
          </div>
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

const Loading: Component = () => {
  return (
    <div class="flex-auto flex items-center justify-center flex-col">
      <i class="text-7xl mb-4">
        <BiRegularLoaderCircle />
      </i>
      <span>Loading...</span>
    </div>
  );
};

export default Index;
