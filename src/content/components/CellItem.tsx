import { Component } from 'solid-js';
import { Cell } from '@ckb-lumos/base';
import { BiSolidVirus } from 'solid-icons/bi';

interface Props {
  cell: Cell;
  draggable?: boolean;
  onClick?: () => void;
}

const CellItem: Component<Props> = (props) => {
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer?.setData('CellIndex', props.cell.outPoint?.index ?? '');
  };

  return (
    <div
      draggable={props.draggable}
      onDragStart={onDragStart}
      onClick={props.onClick}
      class="rounded-full w-24 h-24 py-4 border-dashed bg-light-divider/50 overflow-hidden relative dark:bg-dark-divider dark:text-dark-headline dark:hover:bg-dark-divider/50 hover:bg-light-divider cursor-pointer text-xs  flex flex-col items-center justify-center"
    >
      <i class="text-2xl">
        <BiSolidVirus />
      </i>
      <span class="font-bold">Capacity</span>
      <span class="scale-75">{props.cell.cellOutput.capacity}</span>
    </div>
  );
};

export default CellItem;
