import { Component, createMemo, createSignal } from 'solid-js';
import { BI } from '@ckb-lumos/bi';

const HexToDecimal: Component = () => {
  const [direction, setDirection] = createSignal(0);
  const [result, setResult] = createSignal<string>();
  const [inputData, setInputData] = createSignal<string>('');

  const title = createMemo(() =>
    direction() == 0 ? 'Convert Hex to Decimal' : 'Convert Decimal to Hex',
  );
  const placeholder = createMemo(() =>
    direction() == 0 ? 'HEX Number, start with 0x' : 'Decimal Number',
  );

  const convert = () => {
    let result;
    if (inputData()) {
      if (direction() === 0) {
        result = BI.from(inputData()).toHexString();
      } else {
        result = BI.from(inputData()).toString(10);
      }
    }
    setResult(result);
  };

  return (
    <div class="py-2 text-xs">
      <span>{title()}</span>
      <input
        onInput={(e) => setInputData(e.currentTarget.value)}
        class="input input-sm mt-2"
        placeholder={placeholder()}
      />
      <div class="flex mt-4 space-x-2">
        <button class="button w-full button-xs" onClick={convert}>
          Convert
        </button>
        <button
          onClick={() => setDirection((val) => (val == 0 ? 1 : 0))}
          class="button w-full button-xs"
        >
          reverse
        </button>
      </div>
      <div class="mt-4 border border-dotted rounded px-2 py-1 border-light-border dark:border-dark-border">
        {result() ?? '-'}
      </div>
    </div>
  );
};

export default HexToDecimal;
