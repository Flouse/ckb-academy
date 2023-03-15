import { Component, ParentProps } from 'solid-js';
import { BiLogosGithub } from 'solid-icons/bi';
import { A } from 'solid-start';
import { SITE_GITHUB_URL } from '~/common/constants/site-basic';
import { useI18n } from '@solid-primitives/i18n';

const Contribute: Component<ParentProps> = () => {
  const [tr] = useI18n();
  return (
    <section style={{ 'background-image': 'url(/images/bg-home-main.jpg)' }}>
      <div class="container items-center text-white text-center flex flex-col py-36 mx-auto relative">
        <BiLogosGithub class="text-8xl" />
        <h1 class="text-6xl mt-4 font-bold">{tr('home.contribute.heading')}</h1>
        <p class="text-2xl mt-10">{tr('home.contribute.sub_heading')}</p>
        <A href={SITE_GITHUB_URL} class="button-white-hover-solid hover:text-light-headline mt-10">
          {tr('home.contribute.button')}
        </A>
      </div>
    </section>
  );
};
export default Contribute;
