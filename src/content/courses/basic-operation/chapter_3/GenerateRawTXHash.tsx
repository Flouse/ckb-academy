import { Component } from 'solid-js';
import { useCourseContext } from '~/components/CourseCore/CourseContext';
import { BasicOperationStore } from '~/content/courses/basic-operation/store';
import { useToast } from '~/components/Toast/ToastContext';

const GenerateRawTXHash: Component = () => {
  const course = useCourseContext<BasicOperationStore>();
  const toast = useToast();

  const onGenerate = () => {
    try {
      course.store.generateRawTXHash();
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
      <button onClick={() => void onGenerate()} class="button button-sm">
        Generate the tx_hash
      </button>
      <div class="mt-4 border border-light-border border-dashed rounded-lg px-4 pt-3">
        <span>the serialized Transaction before hash function:</span>
        <p class="text-xs text-ellipsis break-all pb-4">
          {course.store.state.transactionSerialized}
        </p>
      </div>

      <div class="bg-light-tertiary/10 dark:bg-dark-tertiary/10 px-4 py-2 text-xs rounded-lg mt-4">
        tx_hash: {course.store.state.rawTXHash}
      </div>
    </div>
  );
};

export default GenerateRawTXHash;
