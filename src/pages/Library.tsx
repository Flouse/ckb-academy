import { Component, For, ParentProps } from 'solid-js';
import { A } from 'solid-start';
import { Motion } from '@motionone/solid';
import { useI18n } from '@solid-primitives/i18n';
import { IBaseLink } from '~/types/interfaces';

const Library: Component<ParentProps> = () => {
  const [tr] = useI18n();
  const docLinks: IBaseLink[] = [
    {
      title: 'Nervos CKB Offical Docs',
      to: 'https://docs.nervos.org/',
    },
    {
      title: 'Nervos Network RFCs',
      to: 'https://github.com/nervosnetwork/rfcs',
    },
    // {
    //   title: 'The first intimate contact with CKB',
    //   to: 'https://zero2ckb.ckbapp.dev/learn',
    // },
  ];

  return (
    <div
      class="bg-auto bg-bottom"
      style={{ 'background-image': 'url(/images/bg-library-page.jpg)' }}
    >
      <div class="backdrop-blur-sm backdrop-brightness-50 min-h-container  w-full-z-10">
        <Motion.div
          animate={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5, easing: 'ease-in-out' }}
          class=" container mx-auto pt-36 flex flex-col justify-center text-white/90"
        >
          <h1 class="text-8xl font-bold">{tr('library.notice')}</h1>
          <h4 class="text-4xl mt-6">{tr('library.notice-description')}</h4>
          <p class="text-2xl mt-12">{tr('library.doc-guide')}</p>
          <nav class="flex space-y-8 lg:space-y-0 lg:space-x-8 mt-6 flex-col lg:flex-row">
            <For each={docLinks}>
              {(item) => (
                <A
                  href={item.to}
                  target="_blank"
                  class="button-white-hover-solid hover:text-light-headline w-auto lg:w-max"
                >
                  {item.title}
                </A>
              )}
            </For>
          </nav>
          <div class="font-normal mt-20">
            <p class="mb-1">{tr('library.help-us')}</p>
            <A
              href="https://github.com/Flouse/ckb-school-site"
              class="underline text-white decoration-wavy underline-offset-4"
            >
              {tr('library.to-github')}
            </A>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};
export default Library;
