import { Component, JSX, ParentProps } from 'solid-js';
import { BiSolidInbox } from 'solid-icons/bi';

interface IDataEmptyProps extends ParentProps {
  title?: JSX.Element;
  icon?: JSX.Element;
}

const DataEmpty: Component<IDataEmptyProps> = (props) => {
  return (
    <div class="flex flex-col items-center">
      {props.icon || <BiSolidInbox class="text-8xl mb-6" />}
      {props.title || 'Sorry, no data to display'}
    </div>
  );
};
export default DataEmpty;
