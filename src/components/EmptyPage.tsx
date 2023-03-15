import { Component, ParentProps } from 'solid-js';
import { Motion } from '@motionone/solid';
import { A } from 'solid-start';
import { BiLogosGithub } from 'solid-icons/bi';

interface IEmptyPageProps extends ParentProps {
  title?: string;
}

const EmptyPage: Component<IEmptyPageProps> = (props) => {
  return (
    <div
      class="min-h-container bg-repeat-x bg-[center_top_0rem] bg-top  bg-auto"
      style={{ 'background-image': 'url(/images/logo-big.png)' }}
    >
      <Motion.div
        animate={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5, easing: 'ease-in-out' }}
        class=" container mx-auto pt-36 flex flex-col justify-center"
      >
        <h1 class="text-8xl font-bold text-light-headline dark:text-dark-headline">
          {props.title ? props.title : 'Page under construction'}
        </h1>
        <h4 class="text-4xl mt-6 font-bold text-light-secondary dark:text-dark-secondary">
          It is in the early planning stages and may eventually go live or be removed.
        </h4>
        <p class="text-2xl max-w-3xl mt-16 text-light-tertiary dark:text-dark-secondary">
          This website is open source. You can propose edits to any of the content on this site,
          suggest awesome new features, or help us squash bugs.
        </p>

        <A href="https://github.com/Flouse/ckb-school-site" class="button dark:button-white mt-8">
          <BiLogosGithub class="text-2xl mr-2" />
          More on contribute
        </A>
      </Motion.div>
    </div>
  );
};
export default EmptyPage;
