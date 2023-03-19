import { Component } from 'solid-js/types/render/component';
import { BiRegularWorld, BiSolidMoon, BiSolidSun } from 'solid-icons/bi';
import { createMemo, For, useContext } from 'solid-js';
import { AppContext } from '~/AppContext';
import { useI18n } from '@solid-primitives/i18n';
import HoverCard from '~/components/HoverCard';

const langs: Record<string, string> = {
  en: 'English',
  // 'zh-cn': '简体中文',
};
const Preference: Component = () => {
  const context = useContext(AppContext);
  const [, { locale }] = useI18n();

  const langText = createMemo(() => {
    return langs[locale()] ?? langs['en'];
  });

  const changeDarkMode = () => {
    context.isDark = !context.isDark;
  };

  return (
    <div
      class="flex items-center lg:space-x-4 text-light-tertiary dark:text-dark-tertiary text-2xl
      lg:divide-none divide-x divide-light-divider dark:divide-dark-border divide-light-border
      border-t border-light-border dark:border-dark-divider lg:border-none"
    >
      <div
        class="flex justify-center items-center flex-1 py-4 inline-block cursor-pointer
        hover:bg-light-hover dark:hover:bg-dark-hover hover:lg:bg-transparent lg:dark:hover:bg-transparent"
        onClick={changeDarkMode}
      >
        {context.isDark ? <BiSolidMoon /> : <BiSolidSun />}
      </div>
      <div class="flex-1">
        <HoverCard
          arrow
          class="!px-0"
          content={(close) => <LangChooser data={langs} close={close} />}
        >
          <div
            class="flex hover:bg-light-hover dark:hover:bg-dark-hover cursor-pointer py-4 justify-center lg:justify-start lg:w-32 items-center lg:py-2 lg:px-2 lg:rounded-lg
          lg:border border-light-border dark:border-dark-border"
          >
            <BiRegularWorld class="mr-2" />
            <span class="text-sm">{langText()}</span>
          </div>
        </HoverCard>
      </div>
    </div>
  );
};

const LangChooser: Component<{ data: Record<string, string>; close?: () => void }> = (props) => {
  const [, { locale }] = useI18n();
  return (
    <ul class="flex flex-col w-32">
      <For each={Object.entries(props.data)}>
        {([lang, label]) => (
          <li
            onClick={() => {
              props.close?.();
              locale(lang);
            }}
            classList={{ 'bg-primary/10': lang === locale() }}
            class="px-4 py-1 hover:bg-light-hover hover:dark:bg-dark-hover cursor-pointer"
          >
            {label}
          </li>
        )}
      </For>
    </ul>
  );
};

export default Preference;
