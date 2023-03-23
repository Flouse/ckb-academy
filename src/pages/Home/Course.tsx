import { Component, createMemo, createSignal, For, JSX, useContext } from 'solid-js';
import { BiSolidAward, BiSolidJoystick, BiSolidPointer } from 'solid-icons/bi';
import { Motion } from '@motionone/solid';

import { spring } from 'motion';
import { useI18n } from '@solid-primitives/i18n';
import { AppContext } from '~/AppContext';

interface Feature {
  title: string;
  icon?: JSX.Element;
  description: string;
}

const Course: Component = () => {
  const [tr] = useI18n();
  const [featureId, setFeatureId] = createSignal<number>(0);
  const context = useContext(AppContext);

  const features = createMemo(() => {
    return [
      {
        title: tr('home.course.feature.interactive.title'),
        description: tr('home.course.feature.interactive.description'),
        icon: <BiSolidJoystick />,
      },
      {
        title: tr('home.course.feature.nft.title'),
        description: tr('home.course.feature.nft.description'),
        icon: <BiSolidAward />,
      },
      {
        title: tr('home.course.feature.keyword.title'),
        description: tr('home.course.feature.keyword.description'),
        icon: <BiSolidPointer />,
      },
    ] as Feature[];
  });

  const featureDescription = createMemo(() => {
    return features()[featureId()].description;
  });

  return (
    <section id="about-course" class="container flex flex-col mx-auto relative">
      <Motion.div
        animate={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          easing: spring(),
        }}
        class="flex flex-col py-36 relative"
      >
        <p class="text-7xl mb-6 font-bold text-light-headline dark:text-dark-headline">
          {tr('home.course.heading')}
        </p>
        <p class="text-2xl mb-12 font-medium max-w-2xl text-light-secondary dark:text-dark-secondary">
          {tr('home.course.sub_heading')}
        </p>
        <div class="flex space-x-8">
          <For each={features()}>
            {(item, index) => (
              <div
                onClick={() => setFeatureId(index())}
                class="cursor-pointer flex flex-col text-light-secondary dark:text-dark-secondary font-medium items-center rounded px-10 py-4"
                classList={{
                  'bg-light-secondary dark:bg-dark-tertiary text-white dark:text-dark-background_dark':
                    featureId() === index(),
                  'bg-light-secondary/10 dark:bg-dark-secondary/10': featureId() !== index(),
                }}
              >
                {item.icon && <span class="text-5xl mb-2">{item.icon}</span>}
                {item.title}
              </div>
            )}
          </For>
        </div>

        <p class="text-sm text-light-tertiary dark:text-dark-tertiary mt-6 max-w-2xl">
          {featureDescription()}
        </p>
        <a href="https://zero2ckb.ckbapp.dev/" class="button-primary button-lg mt-10">
          {tr('home.course.button_start')}
        </a>

        <Motion.img
          alt=""
          src={`/images/worktable${context.isDark ? '-dark' : ''}.png`}
          class="absolute lg:w-[1000px] -top-20 lg:-right-40 -z-10"
          animate={{ y: [100, 0], opacity: [0, 1] }}
          transition={{
            delay: 0.8,
            duration: 1,
            easing: spring(),
          }}
        />
      </Motion.div>
    </section>
  );
};
export default Course;
