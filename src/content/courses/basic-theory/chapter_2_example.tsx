import { Component, createMemo, createSignal } from 'solid-js';
import {
  BiRegularChevronLeft,
  BiRegularChevronRight,
  BiSolidCheckCircle,
  BiSolidXCircle,
} from 'solid-icons/bi';
import { Cell } from '@ckb-lumos/base';
import { BI } from '@ckb-lumos/bi';
import Dialog, { createDialog } from '~/components/Dialog';
import HighlightCode from '~/components/HighlightCode';

const Example: Component = () => {
  const cellData: Cell = {
    cellOutput: {
      capacity: '0x1dcd65000',
      lock: {
        args: '0x36c329ed630d6ce750712a477543672adab57f4c',
        codeHash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
        hashType: 'type',
      },
    },
    data: '0x',
  };
  const [data, setData] = createSignal<string>('0x');
  const dialog = createDialog();

  function toHex(str: string) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  }

  const handelInputChange = (text: string) => {
    setData('0x' + toHex(text));
  };

  const cell = createMemo(() => {
    return { ...cellData, ...{ data: data() } };
  });

  const dataTotalLength = createMemo(() => {
    const dataLength = getByteLengthOfHexString(data());
    return (61 + dataLength).toString();
  });

  function getByteLengthOfHexString(str: string) {
    const s = str.length - 2; //remove 0x
    return s / 2;
  }

  const cellPropertyByteLength = createMemo(() => {
    const b2 = getByteLengthOfHexString(cell().cellOutput.lock.args);
    const b5 = getByteLengthOfHexString(cell().data);
    return {
      capacity: '8 Bytes',
      lock: {
        args: b2.toString() + ' Bytes',
        code_hash: '32 Bytes',
        hash_type: '1 Bytes',
      },
      data: b5.toString() + ' Bytes',
    };
  });

  const shannon2CKB = (num: number | string | undefined) => {
    return BI.from(num).div(BI.from(100000000)).toHexString();
  };

  const isCapacityEnough = createMemo(() => {
    return (
      shannon2CKB(BI.from(cell().cellOutput.capacity).toString(10)) >
      BI.from(dataTotalLength()).toHexString()
    );
  });

  return (
    <div class="not-prose">
      <input
        onInput={(e) => {
          handelInputChange(e.currentTarget.value);
        }}
        class="input mb-8 font-medium"
        placeholder="data: input here"
      />
      <div class="flex flex-col items-center justify-center mb-6">
        <div
          onClick={() => dialog().open()}
          classList={{
            'border-success': isCapacityEnough(),
            'border-error': !isCapacityEnough(),
          }}
          class="w-40 h-40 border-4  rounded-full hover:cursor-pointer hover:bg-light-hover hover:dark:bg-dark-hover overflow-hidden text-center break-all"
        >
          <div
            classList={{
              'border-success': isCapacityEnough(),
              'border-error': !isCapacityEnough(),
            }}
            class="h-20 w-full flex flex-col items-center justify-center mb-2 border-b-2"
          >
            <h6 class="text-sm font-bold mb-1">Occupancy</h6>
            <p class="text-xs font-medium">{dataTotalLength()} Bytes</p>
          </div>
          <div class="text-xs overflow-hidden font-medium">{cell().data}</div>
        </div>
      </div>
      <h1 class="font-bold text-base">Capacity Availability？</h1>
      <p class="mb-4">Please observe the changes in the data and status below. </p>
      <div class="flex bg-light-divider/50 dark:bg-dark-divider/10 text-light-secondary dark:text-dark-secondary rounded-lg items-center overflow-hidden">
        <i
          class="text-2xl py-5 px-4 text-white "
          classList={{
            'bg-error': !isCapacityEnough(),
            'bg-success': isCapacityEnough(),
          }}
        >
          {isCapacityEnough() ? <BiSolidCheckCircle /> : <BiSolidXCircle />}
        </i>
        <div class="px-4">
          <span class="text-sm font-medium">Capacity</span>
          <p class="text-xs">{cell().cellOutput.capacity} ( shannon ) = 80 ( CKB )</p>
        </div>
        <i class="text-5xl py-2 px-1">
          {isCapacityEnough() ? <BiRegularChevronRight /> : <BiRegularChevronLeft />}
        </i>
        <div class="px-4">
          <span class="text-sm font-medium">Actual occupancy</span>
          <p class="text-xs">{dataTotalLength()} ( CKB )</p>
        </div>
      </div>
      <Dialog footer={null} title={null} context={dialog}>
        <h6 class="font-bold mb-4">Cell Content：</h6>
        <HighlightCode code={JSON.stringify(cell(), null, 2)} />
        <h6 class="font-bold mb-4 mt-4">Sum of the 4 fields' length：</h6>
        <HighlightCode
          code={JSON.stringify(
            { ...{ total: dataTotalLength() + ' Bytes' }, ...cellPropertyByteLength() },
            null,
            2,
          )}
        />
      </Dialog>
    </div>
  );
};

export default Example;
