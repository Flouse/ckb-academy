import { Component, createEffect, createSignal, For, Show } from 'solid-js';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import { Cell } from '@ckb-lumos/base';
import Dialog, { createDialog } from '~/components/Dialog';
import HighlightCode from '~/components/HighlightCode';
import CellItem from '~/content/components/CellItem';
import Loading from '~/components/Loading';

const LiveCells: Component = () => {
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

  const onWatchCell = (cell: Cell) => {
    setCell(cell);
    dialog().open();
  };

  return (
    <div class="w-[800px] max-h-[600px] min-h-[300px] flex flex-col">
      <Show
        when={cells().length > 0}
        keyed
        fallback={
          <div class="flex-auto flex justify-center items-center">
            <Loading />
          </div>
        }
      >
        <div class=" flex-auto grid grid-cols-5 place-items-center auto-rows-min gap-4 overflow-y-auto">
          <For each={cells()}>
            {(cell) => <CellItem onClick={() => onWatchCell(cell)} cell={cell} />}
          </For>
        </div>
      </Show>
      <div class="flex-none flex mt-6 justify-end">
        <button class="button button-sm" onClick={() => void getCells()}>
          Refresh Cells
        </button>
      </div>
      <Dialog footer={null} title={null} context={dialog}>
        <HighlightCode code={JSON.stringify(cell(), null, 2)} />
      </Dialog>
    </div>
  );
};

export default LiveCells;
