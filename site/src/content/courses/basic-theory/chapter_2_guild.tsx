import { Component, createSignal } from 'solid-js';
import { BI } from '@ckb-lumos/bi';

const Guild: Component = () => {
  const [inputValue, setInputValue] = createSignal<string>('');
  const [isValid, setIsValid] = createSignal<boolean>(false);

  const handleInputChange = (e: Event) => {
    const newValue = (e.target as HTMLInputElement).value.trim();
    setInputValue(newValue);
    if (/^\d+$/.test(newValue)) {
      const num = BI.from(newValue);
      setIsValid(num.eq(BI.from('5000000000')));
    } else {
      setIsValid(false);
    }
  };

  const getValidityMessage = (): string => {
    if (isValid()) {
      return 'Correct!';
    } else if (inputValue() === '') {
      return '';
    } else {
      return 'The value calculator is incorrect';
    }
  };

  const getValidityColor = (): string => {
    if (isValid()) {
      return 'text-success border-success';
    } else if (inputValue() === '') {
      return '';
    } else {
      return 'text-error border-error';
    }
  };

  return (
    <div class="not-prose">
      <div class="flex flex-col items-center justify-center mb-6">
        <input
          onInput={handleInputChange}
          class={`input mb-4 font-medium ${getValidityColor()}`}
          placeholder="Input the Decimal of Hex 0x12a05f200"
          value={inputValue()}
        />
        <div class={`${isValid() ? 'text-success' : 'text-error'} font-medium text-sm`}>
          {getValidityMessage()}
        </div>
      </div>
    </div>
  );
};

export default Guild;
