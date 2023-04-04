import { Component, createEffect, createSignal } from 'solid-js';
import { default as highlight } from 'highlight.js';
import CodeTextarea from '~/components/CodeInput/CodeTextarea';
import { useCourseContext } from '~/components/CourseCore/CourseContext';
import { BasicOperationStore } from '~/content/courses/basic-operation/store';
import { useToast } from '~/components/Toast/ToastContext';
import { Transaction } from '@ckb-lumos/base';

const GenerateRawTransaction: Component = () => {
  const [code, setCode] = createSignal<string>('');
  const course = useCourseContext<BasicOperationStore>();
  const toast = useToast();

  createEffect(() => {
    setCode(JSON.stringify(course.store.state.transactionTemplate, null, 2));
  });

  const onSave = () => {
    try {
      const rawTransaction = JSON.parse(code()) as Transaction;
      course.store.generateRawTransaction(rawTransaction);
      toast.success({ title: 'Success', description: `RawTransaction save successfully` });
    } catch (err) {
      if (err instanceof Error) {
        toast.error({ title: 'Error', description: `${err.message}` });
      }
      console.error(err);
    }
  };

  return (
    <div class="not-prose py-4">
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
      <button onClick={() => void onSave()} class="button button-sm px-8 mt-6">
        Save
      </button>
    </div>
  );
};

export default GenerateRawTransaction;
