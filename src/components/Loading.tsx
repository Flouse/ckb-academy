import { Component, JSX, ParentProps } from 'solid-js';
import { FaSolidSpinner } from 'solid-icons/fa';

interface ILoadingProps extends ParentProps {
  title?: JSX.Element;
  icon?: JSX.Element;
}

const Loading: Component<ILoadingProps> = (props) => {
  return (
    <div class="flex flex-col items-center">
      {props.icon || <FaSolidSpinner class="animate-spin text-7xl mb-6" />}
      {props.title || 'Data loading, please wait...'}
    </div>
  );
};
export default Loading;
