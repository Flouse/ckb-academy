import { Component, For, ParentProps, Show } from 'solid-js';
import DataEmpty from '~/components/DataEmpty';
import { projects } from '~/data/playground.data';
import { Project } from '~/types/playground';
import { useNavigate } from '@solidjs/router';
import { BiRegularJoystick, BiRegularLink } from 'solid-icons/bi';

const Playground: Component<ParentProps> = () => {
  const go = useNavigate();
  const openProject = (project: Project) => {
    if (project.url) {
      window.open(project.url);
    } else if (project.repoSubPath) {
      go(project.id);
    }
  };
  return (
    <>
      <div
        class="min-h-container bg-[_1300px] bg-fixed bg-repeat-x bg-[center_22rem]"
        style={{ 'background-image': 'url(/images/logo-big.png)' }}
      >
        <div class="container mx-auto">
          <Show
            when={(projects ?? []).length > 0}
            keyed
            fallback={
              <div class="pt-36">
                <DataEmpty />
              </div>
            }
          >
            <h1 class="text-2xl font-medium pt-12">Projects</h1>
            <div class="grid pt-8 grid-cols-2 gap-x-10 gap-y-8">
              <For each={projects}>
                {(project) => (
                  <div
                    class="bg-light-background_dark dark:bg-dark-background_dark rounded-lg shadow-lg py-4 px-4 hover:cursor-pointer flex items-center hover:transition hover:scale-105 hover:shadow-light-shadow/20"
                    onClick={() => openProject(project)}
                  >
                    <i class="text-6xl px-4 mr-4">
                      <BiRegularJoystick />
                    </i>
                    <div class="flex-auto">
                      <h1 class="font-medium text-xl mb-2">{project.title}</h1>
                      <p class="text-light-tertiary dark:text-dark-tertiary">
                        {project.description}
                      </p>
                    </div>
                    {project.url ? (
                      <i class="text-2xl px-4 mr-4">
                        <BiRegularLink />
                      </i>
                    ) : null}
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </>
  );
};
export default Playground;
