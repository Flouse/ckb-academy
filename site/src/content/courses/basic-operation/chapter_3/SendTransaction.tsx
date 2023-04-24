import { Component } from 'solid-js';
import { useCourseContext } from '~/components/CourseCore/CourseContext';
import { BasicOperationStore } from '~/content/courses/basic-operation/store';
import { useToast } from '~/components/Toast/ToastContext';
import { useWalletContext } from '~/components/CKBCore/WalletContext';

const SendTransaction: Component = () => {
  const course = useCourseContext<BasicOperationStore>();
  const toast = useToast();
  const wallet = useWalletContext();

  const send = async () => {
    try {
      await course.store.sendTransaction(wallet.provider()!);
      course.finishChapter();
      toast.success({ title: 'Success', description: `Send transaction successfully` });
    } catch (e) {
      if (e instanceof Error) {
        toast.error({ title: 'Error', description: e.message });
      } else {
        console.error(e);
      }
    }
  };

  return (
    <div class="not-prose pb-4">
      <button onClick={() => void send()} class="button button-sm mt-4">
        Send the Transaction
      </button>
      <div class="bg-light-tertiary/10 dark:bg-dark-tertiary/10 px-4 py-2 text-xs rounded-lg mt-4">
        tx_hash: {course.store.state.txHash}
      </div>
    </div>
  );
};

export default SendTransaction;
