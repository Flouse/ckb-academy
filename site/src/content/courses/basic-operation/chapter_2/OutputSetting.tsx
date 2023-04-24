import { Component, createMemo, createSignal, For, Show } from 'solid-js';
import { Cell } from '@ckb-lumos/base';
import { useToast } from '~/components/Toast/ToastContext';
import { BI } from '@ckb-lumos/bi';
import { CKBToShannon, shannonToCKB } from '~/utils/ckb-util';
import CellItem from '~/content/components/CellItem';
import { BiSolidInfoCircle } from 'solid-icons/bi';

interface Props {
  cell?: Cell;
  onExit?: (cells: Cell[]) => void;
}

const OutputSetting: Component<Props> = (props) => {
  const [cells, setCells] = createSignal<Cell[]>([]);
  const [capacity, setCapacity] = createSignal<string>('');
  const [lockArgs, setLockArgs] = createSignal<string>('');
  const toast = useToast();

  const onAddCellClick = () => {
    const error = checkForm();

    if (error) {
      return showError(error);
    }

    const _lock = props.cell!.cellOutput.lock;
    _lock.args = lockArgs();
    const _cells: Cell[] = [
      ...cells(),
      {
        cellOutput: {
          capacity: CKBToShannon(capacity()).toHexString(),
          lock: _lock,
        },
        data: '0x',
      },
    ];
    setCells(_cells);
  };

  const checkForm = () => {
    if (!/(^[1-9]\d*$)/.test(capacity())) {
      return 'Capacity must be a positive integer';
    }
    const _totalCapacityCKB = totalCapacityCKB().sub(1);
    const capacityCKB = BI.from(capacity());
    if (capacityCKB.gt(_totalCapacityCKB)) {
      return `The total capacity must be less than ${totalCapacityCKB().toString(10)} CKB.`;
    }

    const count = capacityCKB.add(cellsCapacityCount());
    if (count.gt(_totalCapacityCKB)) {
      return 'The capacity must be less than the sum of the input.';
    }

    if (!lockArgs().startsWith('0x')) {
      return 'Lock args parameter needs to have 0x as a prefix.';
    }
  };

  const showError = (messages: string) => {
    toast.error({ title: 'Error', description: messages });
  };

  const totalCapacityCKB = createMemo(() => {
    return shannonToCKB(props.cell?.cellOutput?.capacity);
  });

  const cellsCapacityCount = createMemo(() => {
    let _cellsCapacityCount = BI.from(0);
    cells().forEach((item) => {
      _cellsCapacityCount = _cellsCapacityCount.add(shannonToCKB(item.cellOutput.capacity));
    });
    return _cellsCapacityCount;
  });

  return (
    <div class="flex h-full flex-col">
      <div class="flex-none font-bold mb-4 pb-4 border-b border-light-border flex items-center">
        Total Capacity {totalCapacityCKB().toString(10)} CKB
      </div>
      <div class="flex-auto py-4 overflow-y-auto">
        <Show
          when={cells().length > 0}
          keyed
          fallback={
            <div class="h-full flex flex-col items-center justify-center text-light-tertiary dark:text-dark-tertiary">
              <i class="text-4xl mb-2">
                <BiSolidInfoCircle />
              </i>
              Please add one or more Cells in the area below.
            </div>
          }
        >
          <div class="grid grid-cols-6 gap-4 place-items-center	auto-rows-max">
            <For each={cells()}>{(cell) => <CellItem cell={cell} />}</For>
          </div>
        </Show>
      </div>
      <div class="flex-none flex space-x-10 mt-4">
        <div class="flex flex-auto space-x-4">
          <input
            type={'number'}
            onInput={(event) => setCapacity(event.currentTarget.value)}
            class="input placeholder:text-xs"
            placeholder="Capacity: decimal integer, unit CKB"
          />
          <input
            onInput={(event) => setLockArgs(event.currentTarget.value)}
            class="input"
            placeholder="Lock args: Hex string, start with 0x"
          />
          <div>
            <button
              onClick={onAddCellClick}
              disabled={capacity() === '' || lockArgs() === ''}
              class="button-solid"
            >
              Add Cell
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            props.onExit?.(cells());
          }}
          class="button-primary-solid"
        >
          Save & Exit
        </button>
      </div>
    </div>
  );
};
export default OutputSetting;
