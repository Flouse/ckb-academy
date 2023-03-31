import { batch, Component, createEffect, createSignal, For, Match, Switch } from 'solid-js';
import { Cell } from '@ckb-lumos/base';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import Dialog, { createDialog } from '~/components/Dialog';
import HighlightCode from '~/components/HighlightCode';
import CellItem from '~/content/components/CellItem';

interface InputInfo {
  cell_deps: {
    out_point: {
      tx_hash: string;
      index: string;
    };
    dep_type: string;
  }[];
  inputs: {
    previous_output: {
      tx_hash: string;
      index: string;
    };
    since: string;
  }[];
}

const InputSection: Component = () => {
  const [cells, setCells] = createSignal<Cell[]>([]);
  const [cell, setCell] = createSignal<Cell>();
  const [input, setInput] = createSignal<InputInfo>({ cell_deps: [], inputs: [] });
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

  const fillInput = (outputIndex: string) => {
    const _cells = [...cells()];
    const index = _cells.findIndex((cell) => cell.outPoint?.index === outputIndex);
    if (index >= 0) {
      const _cell = _cells[index];
      let _input = { ...input() };
      if (_input.cell_deps.length == 0) {
        _input = {
          ..._input,
          cell_deps: [
            {
              out_point: {
                tx_hash: '0x4f1097802dc6fe19b942f1c2e8e52d564ee35899e4aef308101c86c49bc1f471',
                index: '0x0',
              },
              dep_type: 'dep_group',
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
              previous_output: {
                tx_hash: _cell.outPoint?.txHash ?? '',
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
          <div class="not-prose grid grid-cols-6 gap-4 place-items-center auto-rows-max">
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
          <div class="bg-warning/10 text-warning rounded-lg h-12 flex items-center justify-center">
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
          const index = event.dataTransfer?.getData('CellIndex') ?? '';
          fillInput(index);
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
