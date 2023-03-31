import { Component, createEffect, createSignal } from 'solid-js';
import { default as highlight } from 'highlight.js';
import { CKBComponents } from '@ckb-lumos/rpc/lib/types/api';
import CodeTextarea from '~/components/CodeInput/CodeTextarea';
import { useCourseContext } from '~/components/CourseCore/CourseContext';
import { BasicOperationStore } from '~/content/courses/basic-operation/store';
import { useToast } from '~/components/Toast/ToastContext';
import * as helpers from '@ckb-lumos/toolkit';

const TransactionInput: Component = () => {
  const [code, setCode] = createSignal<string>('');
  const course = useCourseContext<BasicOperationStore>();
  const toast = useToast();

  createEffect(() => {
    setCode(JSON.stringify(course.store.state.transactionInfo, null, 2));
  });

  const check = (transaction: CKBComponents.RawTransaction) => {
    helpers.validators.ValidateTransaction(transaction);
  };

  const onSave = () => {
    let info: CKBComponents.RawTransaction;
    try {
      info = JSON.parse(code());
      check(info);
      course.store.updateState({ transactionInfo: info, transactionCheckPass: true });
      toast.success({ title: 'Tips', description: `保存成功` });
    } catch (e) {
      if (e instanceof Error) {
        toast.error({ title: '格式错误', description: `${e.message}` });
      }
    }
  };
  return (
    <div class="not-prose">
      <CodeTextarea
        autoHeight={false}
        resize="vertical"
        highlightjs={highlight}
        placeholder="Input your code here..."
        onChange={(value) => {
          setCode(value);
        }}
        value={code()}
        language={'json'}
      />
      <button onClick={onSave} class="button button-sm mt-4">
        Save
      </button>
    </div>
  );
};

export default TransactionInput;
