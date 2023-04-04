import { Component } from 'solid-js';
import { useCourseContext } from '~/components/CourseCore/CourseContext';
import { BasicOperationStore } from '~/content/courses/basic-operation/store';
import { useToast } from '~/components/Toast/ToastContext';
import { useWalletContext } from '~/components/CKBCore/WalletContext';

const SignTransaction: Component = () => {
  const course = useCourseContext<BasicOperationStore>();
  const toast = useToast();
  const wallet = useWalletContext();

  const onSing = async () => {
    try {
      await course.store.signTransaction(wallet.provider()!);
    } catch (err) {
      if (err instanceof Error) {
        toast.error({ title: 'Error', description: err.message });
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div class="not-prose py-4">
      <button onClick={() => void onSing()} class="button button-sm">
        Sign the Transaction
      </button>
      <div class="bg-light-tertiary/10 dark:bg-dark-tertiary/10 text-ellipsis break-all text-xs px-4 py-2 rounded-lg mt-4">
        {course.store.state.signedMessage ?? '...'}
      </div>
    </div>
  );
};

export default SignTransaction;
