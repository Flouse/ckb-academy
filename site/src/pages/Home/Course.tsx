import { Component, createMemo, createSignal, For, JSX, useContext } from 'solid-js';
import { BiSolidAward, BiSolidJoystick, BiSolidPointer } from 'solid-icons/bi';
import { useI18n } from '@solid-primitives/i18n';
import { AppContext } from '~/AppContext';
import { NavLink } from '@solidjs/router';

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
    <section class="container flex items-center flex-col lg:flex-row mx-auto overflow-hidden">
      <div class="flex flex-col items-center lg:items-start lg:text-start text-center  flex-none py-0 pb-20 lg:py-20 order-last lg:order-first">
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
        <p class="text-base text-light-tertiary dark:text-dark-tertiary mt-6 max-w-xl min-h-[80px]">
          {featureDescription()}
        </p>
        <NavLink href="/courses" class="button-primary button-lg mt-10">
          {tr('home.course.button_start')}
        </NavLink>
      </div>
      <div class="flex-auto">
        <img src={`/images/worktable${context.isDark ? '-dark' : ''}.png`} />
      </div>
    </section>
  );
};
export default Course;
