import { Component, For, ParentProps } from 'solid-js';
import { BiLogosGithub } from 'solid-icons/bi';
import { A } from 'solid-start';
import { SITE_GITHUB_URL } from '~/common/constants/site-basic';
import { useI18n } from '@solid-primitives/i18n';
import { useRouteData } from '@solidjs/router';
import { IHomeData } from '~/pages/Home/Home.data';

const Contribute: Component<ParentProps> = () => {
  const [tr] = useI18n();
  const { contributors } = useRouteData<IHomeData>();

  return (
    <section style={{ 'background-image': 'url(/images/bg-home-main.jpg)' }}>
      <div class="container items-center text-white text-center flex flex-col py-36 mx-auto relative">
        <BiLogosGithub class="text-8xl" />
        <h1 class="text-6xl mt-4 font-bold">{tr('home.contribute.heading')}</h1>

        <div class="flex flex-col items-center mt-8 text-xl lg:flex-row space-y-4 lg:space-y-0">
          <span class="mr-4 font-bold">{tr('home.contribute.gratitude')} </span>
          <nav class="flex items-center space-x-4">
            <For each={contributors}>
              {(item, index) => (
                <a
                  class="text-white flex items-center hover:text-white/80 after:px-1 after:text-white/40"
                  target="_blank"
                  href={item.to}
                  classList={{
                    "after:content-['_/']": index() < contributors.length - 1,
                  }}
                >
                  <img
                    alt="avatar"
                    class="rounded-full mr-2"
                    src={item.avatar}
                    height={20}
                    width={20}
                  />
                  {item.title}
                </a>
              )}
            </For>
          </nav>
        </div>

        <p class="text-2xl mt-10">{tr('home.contribute.sub_heading')}</p>
        <div class="flex ">
          <A
            href={SITE_GITHUB_URL}
            class="button-white-hover-solid button-lg hover:text-light-headline mt-10"
          >
            {tr('home.contribute.button')}
          </A>
        </div>
      </div>
    </section>
  );
};
export default Contribute;
