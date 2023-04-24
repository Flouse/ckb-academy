import { Component, JSX, ParentProps } from 'solid-js';
import { BiRegularLoaderAlt } from 'solid-icons/bi';

interface Props extends ParentProps {
  title?: JSX.Element;
  icon?: JSX.Element;
}

const Loading: Component<Props> = (props) => {
  return (
    <div class="flex flex-col items-center">
      {props.icon || <BiRegularLoaderAlt class="animate-spin delay-1000	 text-7xl mb-6" />}
      {props.title || 'Loading...'}
    </div>
  );
};
export default Loading;
