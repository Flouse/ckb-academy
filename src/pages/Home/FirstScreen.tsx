import { Motion } from '@motionone/solid';
import { spring } from 'motion';
import { BiSolidDonateHeart } from 'solid-icons/bi';
import { Component, For } from 'solid-js';
import { useRouteData } from '@solidjs/router';
import { IHomeData } from '~/pages/Home/Home.data';
import { useI18n } from '@solid-primitives/i18n';
import { A } from 'solid-start';
import { ZERO2_URL } from '~/common/constants/site-basic';

const FirstScreen: Component = () => {
  const [tr] = useI18n();
  const { contributors } = useRouteData<IHomeData>();

  return (
    <section
      style={{ 'background-image': 'url(/images/bg-home-main.jpg)' }}
      class="overflow-hidden bg-fixed"
    >
      <div class="backdrop-blur-md -z-10">
        <div class="container flex items-center mx-auto py-40 text-white">
          <Motion
            animate={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{
              delay: 0.1,
              duration: 0.5,
              easing: spring(),
            }}
          >
            <h4 class="text-7xl mb-12 font-bold">{tr('home.first_screen.heading')}</h4>
            <p class="text-4xl mb-2 font-medium">{tr('home.first_screen.sub_heading')}</p>
            <p class="text-2xl mb-24">{tr('home.first_screen.sub_heading_modifier')}</p>
            <A
              href={ZERO2_URL}
              class="button-basic bg-gradient-primary hover:opacity-80 text-white"
            >
              <BiSolidDonateHeart class="text-6xl mr-6" />
              <span class="text-2xl font-bold">{tr('home.first_screen.button_zero2')}</span>
            </A>
            <div class="flex mt-6 text-xl">
              <span class="mr-4 font-bold">{tr('home.first_screen.gratitude')} </span>
              <nav>
                <For each={contributors}>
                  {(item, index) => (
                    <a
                      class="text-white hover:text-white/80 after:px-1 after:text-white/40"
                      href={item.title}
                      classList={{
                        "after:content-['_/']": index() < contributors.length - 1,
                      }}
                    >
                      {item.title}
                    </a>
                  )}
                </For>
              </nav>
            </div>
            <p class="text-md mt-4 text-white/80 max-w-3xl">{tr('home.first_screen.contribute')}</p>
          </Motion>
        </div>
      </div>
    </section>
  );
};
export default FirstScreen;
