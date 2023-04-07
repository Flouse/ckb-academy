import { batch, Component, createEffect, createSignal, For, Match, Switch } from 'solid-js';
import { Cell } from '@ckb-lumos/base';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import Dialog, { createDialog } from '~/components/Dialog';
import HighlightCode from '~/components/HighlightCode';
import CellItem from '~/content/components/CellItem';

interface InputInfo {
  cellDeps: {
    outPoint: {
      txHash: string;
      index: string;
    };
    depType: string;
  }[];
  inputs: {
    previousOutput: {
      txHash: string;
      index: string;
    };
    since: string;
  }[];
}

const InputSection: Component = () => {
  const [cells, setCells] = createSignal<Cell[]>([]);
  const [cell, setCell] = createSignal<Cell>();
  const [input, setInput] = createSignal<InputInfo>({ cellDeps: [], inputs: [] });
  const dialog = createDialog();
  const wallet = useWalletContext();
  createEffect(() => {
    if (wallet.provider()) {
      void getCells();
    }
  });

  const getCells = async () => {
    const _cells = (await wallet.provider()?.getLiveCells()) ?? [];
    setCells(_cells.slice(0, 6));
  };

  const fillInput = (cellStr: string) => {
    const config = wallet.provider()!.config.LUMOS_CONFIG;
    const _cells = [...cells()];
    const index = _cells.findIndex((cell) => JSON.stringify(cell.outPoint) === cellStr);
    if (index >= 0) {
      const _cell = _cells[index];
      let _input = { ...input() };
      if (_input.cellDeps.length == 0) {
        _input = {
          ..._input,
          cellDeps: [
            {
              outPoint: {
                txHash: config.SCRIPTS.OMNILOCK.TX_HASH,
                index: config.SCRIPTS.OMNILOCK.INDEX,
              },
              depType: config.SCRIPTS.OMNILOCK.DEP_TYPE,
            },
            {
              outPoint: {
                txHash: config.SCRIPTS.SECP256K1_BLAKE160.TX_HASH,
                index: config.SCRIPTS.SECP256K1_BLAKE160.INDEX,
              },
              depType: config.SCRIPTS.SECP256K1_BLAKE160.DEP_TYPE,
            },
          ],
        };
      }
      _input = {
        ..._input,
        inputs: [
          ..._input.inputs,
          ...[
            {
              previousOutput: {
                txHash: _cell.outPoint?.txHash ?? '',
                index: _cell.outPoint?.index ?? '',
              },
              since: '0x0',
            },
          ],
        ],
      };

      _cells.splice(index, 1);
      batch(() => {
        setInput(_input);
        setCells(_cells);
      });
    }
  };

  return (
    <div class="not-prose">
      <Switch>
        <Match when={cells().length > 0} keyed>
          <div class="not-prose grid grid-cols-6 gap-4 place-items-center auto-rows-max mb-6">
            <For each={cells()}>
              {(cell) => (
                <CellItem
                  draggable={true}
                  onClick={() => {
                    setCell(cell);
                    dialog().open();
                  }}
                  cell={cell}
                />
              )}
            </For>
          </div>
        </Match>
        <Match when={cells().length === 0 && input().inputs.length > 0} keyed>
          <div class="bg-warning/10 text-warning rounded-lg h-12 flex items-center justify-center mb-6">
            The current Cells have all been used up.
          </div>
        </Match>
        <Match when={true} keyed>
          <div class="rounded-lg  h-12 flex items-center justify-center">
            <button onClick={() => void getCells()} class="button">
              Fetch Cells
            </button>
          </div>
        </Match>
      </Switch>
      <div
        onDrop={(event) => {
          event.preventDefault();
          const cellStr = event.dataTransfer?.getData('cell') ?? '';
          fillInput(cellStr);
        }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
      >
        <HighlightCode code={JSON.stringify(input(), null, 2)} class="max-h-96" language="json" />
      </div>
      <Dialog footer={null} title={null} context={dialog}>
        <HighlightCode code={JSON.stringify(cell(), null, 2)} />
      </Dialog>
    </div>
  );
};

export default InputSection;
