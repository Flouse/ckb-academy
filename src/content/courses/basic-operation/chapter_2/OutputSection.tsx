import {
  batch,
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  Match,
  Show,
  Switch,
} from 'solid-js';
import { Cell } from '@ckb-lumos/base';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import { BiRegularCog, BiSolidCheckCircle, BiSolidPointer, BiSolidXCircle } from 'solid-icons/bi';
import Dialog, { createDialog } from '~/components/Dialog';
import HighlightCode from '~/components/HighlightCode';
import { BI } from '@ckb-lumos/bi';
import { shannonToCKB } from '~/utils/ckb-util';
import { Input, Output } from '@ckb-lumos/lumos';
import { ParamsFormatter } from '@ckb-lumos/rpc';
import { CKBComponents } from '@ckb-lumos/rpc/lib/types/api';
import CellItem from '~/content/components/CellItem';
import OutputSetting from '~/content/courses/basic-operation/chapter_2/OutputSetting';
import * as _ from 'lodash';

const OutputSection: Component = () => {
  const [avaCells, setAvaCells] = createSignal<Cell[]>([]);
  const [watchCell, setWatchCell] = createSignal<Cell>();
  const [inputCells, setInputCells] = createSignal<Cell[]>([]);
  const [outputCells, setOutputCells] = createSignal<Cell[]>([]);
  const [totalCapacityCell, setTotalCapacityCell] = createSignal<Cell>();
  const [transactionInfo, setTransactionInfo] = createSignal({});
  const dialog = createDialog();
  const outputSettingDialog = createDialog({ closeOnOutsideClick: false, defaultOpen: false });
  const wallet = useWalletContext();

  createEffect(() => {
    if (wallet.provider()) {
      void getCells();
    }
  });

  const getCells = async () => {
    const _cells = (await wallet.provider()?.getLiveCells()) ?? [];
    setAvaCells(_cells.slice(0, 6));
  };

  const totalCapacityCKB = createMemo(() => {
    return shannonToCKB(totalCapacityCell()?.cellOutput.capacity);
  });

  const feesCKB = createMemo(() => {
    let capacityCount = BI.from(0);
    outputCells().forEach((item) => (capacityCount = capacityCount.add(item.cellOutput.capacity)));
    const count = BI.from(totalCapacityCell()?.cellOutput.capacity ?? 0).sub(capacityCount);
    return shannonToCKB(count.toHexString());
  });
  const generateTransaction = () => {
    const transaction: CKBComponents.RawTransaction = {
      version: '0x0',
      headerDeps: [],
      cellDeps: [
        {
          depType: 'depGroup',
          outPoint: {
            txHash: '0x4f1097802dc6fe19b942f1c2e8e52d564ee35899e4aef308101c86c49bc1f471',
            index: '0x0',
          },
        },
      ],
      inputs: inputCells().map(
        (cell) => ({ previousOutput: cell.outPoint, since: '0x0' } as Input),
      ),
      outputs: outputCells().map((cell) => cell.cellOutput as Output),
      outputsData: ['0x0'],
      witnesses: ['0x0'],
    };
    setTransactionInfo(ParamsFormatter.toRawTransaction(transaction));
  };

  const clearOut = () => {
    batch(() => {
      setInputCells([]);
      setOutputCells([]);
      setTotalCapacityCell(undefined);
      setTransactionInfo({});
    });
  };

  const onOutputSettingExit = (avaCells: Cell[]) => {
    if (avaCells.length > 0) {
      setOutputCells(avaCells);
    }
    outputSettingDialog().close();
  };

  const onSelectWatchCell = (cell: Cell) => {
    setWatchCell(cell);
    dialog().open();
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    const data = event.dataTransfer?.getData('CellIndex') ?? '';
    const avaCell = _.find(avaCells(), (cell) => cell.outPoint?.index === data)!;
    const used = _.find(inputCells(), (cell) => cell.outPoint?.index === avaCell.outPoint?.index);

    if (used) {
      alert('Error: cell already exits!');
    } else {
      const _inputCells = [...inputCells(), avaCell];
      let capacityCount = BI.from(0);
      _inputCells.forEach((cell) => {
        capacityCount = capacityCount.add(BI.from(cell.cellOutput.capacity));
      });
      const cell: Cell = {
        cellOutput: {
          capacity: capacityCount.toHexString(),
          lock: _inputCells[0].cellOutput.lock,
        },
        data: '0x',
      };
      batch(() => {
        setInputCells(_inputCells);
        setTotalCapacityCell(cell);
        setOutputCells([cell]);
      });
    }
  };

  return (
    <>
      <div class="pt-6 not-prose">
        <Switch>
          <Match when={avaCells().length > 0} keyed>
            <div class="not-prose grid grid-cols-6 place-items-center gap-4">
              <For each={avaCells()}>
                {(cell) => (
                  <CellItem draggable={true} onClick={() => onSelectWatchCell(cell)} cell={cell} />
                )}
              </For>
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

        <div class="flex h-48 mt-6 text-sm">
          <div class="rounded-lg overflow-hidden w-60 flex flex-col mr-4">
            <span class="flex-none bg-primary text-white font-bold px-4 py-2">
              Input ({inputCells().length})
            </span>
            <div
              onDrop={onDrop}
              onDragOver={(event) => event.preventDefault()}
              classList={{
                'grid grid-cols-2 gap-4 p-4	place-items-center auto-rows-max':
                  inputCells().length > 0,
                'flex items-center justify-center': inputCells().length == 0,
              }}
              class="bg-light-divider/20 dark:bg-dark-divider/10 flex-auto overflow-y-auto"
            >
              <Show
                when={inputCells().length > 0}
                keyed
                fallback={
                  <div class="text-light-tertiary text-xs flex flex-col items-center">
                    <i class="text-lg mb-2">
                      <BiSolidPointer />
                    </i>
                    Drag a Cell in Here
                  </div>
                }
              >
                <For each={inputCells()}>
                  {(cell) => <CellItem cell={cell} onClick={() => onSelectWatchCell(cell)} />}
                </For>
              </Show>
            </div>
          </div>
          <div class="flex-auto rounded-lg overflow-hidden w-60 flex flex-col">
            <div class="flex-none bg-success text-white px-4 py-2 flex items-center">
              <span class="font-bold">Output ({outputCells().length})</span>
              <div class="flex-auto flex justify-end space-x-4">
                <span>Total Capacity：{totalCapacityCKB().toString(10)} CKB</span>
                <span
                  class="flex font-bold items-center link"
                  onClick={() => outputSettingDialog().open()}
                >
                  <i class="mr-0.5 text-lg">
                    <BiRegularCog />
                  </i>
                  Setting
                </span>
              </div>
            </div>
            <div class="bg-light-divider/20 dark:bg-dark-divider/10 flex-auto grid grid-cols-3 gap-4 p-4 place-items-center auto-rows-max w-full overflow-y-auto">
              <For each={outputCells()}>
                {(cell) => <CellItem cell={cell} onClick={() => onSelectWatchCell(cell)} />}
              </For>
            </div>
            <div class="px-4 bg-light-divider dark:bg-dark-divider text-xs py-1 flex items-center">
              <span class="mr-2">Miner fees:</span> {feesCKB().toString(10)} CKB
              <i
                class="ml-2 text-sm text-error"
                classList={{ 'text-success': feesCKB().toNumber() > 0 }}
              >
                <Show when={feesCKB().toNumber() > 0} keyed fallback={<BiSolidXCircle />}>
                  <BiSolidCheckCircle />
                </Show>
              </i>
            </div>
          </div>
        </div>

        <div class="flex mt-6 space-x-4">
          <button class="button" onClick={generateTransaction}>
            Generate the Transaction
          </button>
          <button onClick={clearOut} class="button">
            Clear Out
          </button>
        </div>

        <HighlightCode
          code={JSON.stringify(transactionInfo(), null, 2)}
          class="max-h-96"
          language="json"
        />
      </div>
      <Dialog footer={null} title={null} context={dialog}>
        <HighlightCode code={JSON.stringify(watchCell(), null, 2)} />
      </Dialog>

      <Dialog
        bodyClass="min-w-[800px] !h-[450px]"
        closable={false}
        footer={null}
        title={null}
        context={outputSettingDialog}
      >
        <OutputSetting cell={totalCapacityCell()} onExit={onOutputSettingExit} />
      </Dialog>
    </>
  );
};

export default OutputSection;
