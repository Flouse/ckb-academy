import { Component, createEffect, createSignal, For } from 'solid-js';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import { Cell } from '@ckb-lumos/base';
import { BiSolidVirus } from 'solid-icons/bi';
import Dialog, { createDialog } from '~/components/Dialog';
import HighlightCode from '~/components/HighlightCode';

export const ShowCells: Component = () => {
  const [cells, setCells] = createSignal<Cell[]>([]);
  const [cell, setCell] = createSignal<Cell>();
  const dialog = createDialog();
  const wallet = useWalletContext();

  createEffect(() => {
    if (wallet.provider()) {
      void getCells();
    }
  });

  const getCells = async () => {
    const _cells = (await wallet.provider()?.getLiveCells()) ?? [];
    setCells(_cells);
  };

  return (
    <div class="py-4">
      <div class="not-prose grid grid-cols-5 gap-4">
        <For each={cells()}>
          {(cell) => (
            <CellItem
              onClick={() => {
                setCell(cell);
                dialog().open();
              }}
              cell={cell}
            />
          )}
        </For>
      </div>
      <div class="flex justify-center mt-6">
        <button
          class="button button-sm"
          onClick={() => {
            void getCells();
          }}
        >
          Fetch Cells
        </button>
      </div>
      <Dialog footer={null} title={null} context={dialog}>
        <HighlightCode code={JSON.stringify(cell(), null, 2)} />
      </Dialog>
    </div>
  );
};

const CellItem: Component<{ cell: Cell; onClick: () => void }> = (props) => {
  return (
    <div
      onClick={props.onClick}
      class="py-4 bg-light-divider overflow-hidden relative dark:bg-dark-divider dark:hover:bg-dark-tertiary hover:bg-light-tertiary hover:text-white cursor-pointer text-xs  rounded-lg flex flex-col items-center justify-center"
    >
      <i class="text-2xl">
        <BiSolidVirus />
      </i>
      <span class="font-bold">Capacity</span>
      <span class="scale-75">{props.cell.cellOutput.capacity}</span>
    </div>
  );
};
