import { Component, createEffect, createSignal, For } from 'solid-js';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import { Cell } from '@ckb-lumos/base';
import Dialog, { createDialog } from '~/components/Dialog';
import HighlightCode from '~/components/HighlightCode';
import CellItem from '~/content/components/CellItem';

export const CellsSection: Component = () => {
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
    <div class="py-4 not-prose">
      <div class="grid grid-cols-5 gap-4">
        <For each={cells()}>
          {(cell) => <CellItem onClick={() => onWatchCell(cell)} cell={cell} />}
        </For>
      </div>
      <div class="flex justify-center mt-6">
        <button class="button button-sm" onClick={() => void getCells()}>
          Fetch Cells
        </button>
      </div>
      <Dialog footer={null} title={null} context={dialog}>
        <HighlightCode code={JSON.stringify(cell(), null, 2)} />
      </Dialog>
    </div>
  );
};
