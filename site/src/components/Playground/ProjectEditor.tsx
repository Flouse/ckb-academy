import { useRouteData } from '@solidjs/router';
import { ProjectEditorState } from '~/components/Playground/ProjectEditor.data';
import { Show } from 'solid-js';
import { ErrorBoundary } from 'solid-start';
import { Repl } from '~/components/Playground/Repl/Repl';
import { TabbedEditor } from '~/components/Playground/Code/TabbedEditor';
import SplitPane from '~/components/Split/Split';
import SolidMarkdown from 'solid-markdown';
import '~/assets/css/markdown.css';
import '~/assets/css/github-code.css';
import Loading from '~/components/Loading';
import { BiRegularError } from 'solid-icons/bi';
import rehypeHighlight from 'rehype-highlight';

export default function ProjectEditor() {
  const projectState = useRouteData<() => ProjectEditorState>();
  return (
    <div class="h-container w-full overflow-hidden">
      <Show
        when={!projectState.loading}
        fallback={
          <div class="flex h-full w-full justify-center items-center">
            <Loading />
          </div>
        }
      >
        <ErrorBoundary>
          <Show
            when={!projectState.error}
            fallback={
              <div class="flex h-full w-full justify-center items-center flex-col">
                <i class="text-6xl mb-4">
                  <BiRegularError />
                </i>
                <span> {projectState.error.message}</span>
              </div>
            }
          >
            <div class="flex h-full">
              <SplitPane
                sizes={[35, 65]}
                gutterClass="bg-light-divider dark:bg-dark-divider hover:cursor-col-resize"
                gutterSize={4}
                minSize={600}
              >
                <div class="flex flex-col">
                  <div class="bg-light-border/40 px-8 py-4">
                    <b>Project:</b> {projectState.project?.title}
                  </div>
                  <div class="px-20 overflow-auto markdown">
                    <SolidMarkdown rehypePlugins={[rehypeHighlight]}>
                      {projectState.project!.fileSystem.readmeDoc}
                    </SolidMarkdown>
                  </div>
                </div>
                <div class="flex-auto">
                  <SplitPane
                    direction={'vertical'}
                    sizes={[65, 35]}
                    gutterClass="bg-light-divider dark:bg-dark-divider hover:cursor-row-resize"
                    gutterSize={4}
                    elementStyle={(_, height) => {
                      return { height: `calc(${height}% - 12px)` };
                    }}
                  >
                    <TabbedEditor fileSystem={projectState.project!.fileSystem} />
                    <Repl fileSystem={projectState.project!.fileSystem} />
                  </SplitPane>
                </div>
              </SplitPane>
            </div>
          </Show>
        </ErrorBoundary>
      </Show>
    </div>
  );
}
