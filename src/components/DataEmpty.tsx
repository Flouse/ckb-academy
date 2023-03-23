import { Component, JSX, ParentProps } from 'solid-js';
import { BiSolidInbox } from 'solid-icons/bi';
import { FiInbox } from 'solid-icons/fi';

interface IDataEmptyProps extends ParentProps {
  title?: JSX.Element;
  icon?: JSX.Element;
}

const DataEmpty: Component<IDataEmptyProps> = (props) => {
  return (
    <div class="flex flex-col text-light-tertiary dark:text-dark-tertiary items-center">
      {props.icon || <FiInbox class="text-6xl mb-2" />}
      {props.title || 'Sorry, no data to display'}
    </div>
  );
};
export default DataEmpty;
