import { Component, createSignal } from 'solid-js';
import { useCourseContext } from '~/components/CourseCore/CourseContext';
import { BasicOperationStore } from '~/content/courses/basic-operation/store';
import { useToast } from '~/components/Toast/ToastContext';

const SerializeWitnesses: Component = () => {
  const [message, setMessage] = createSignal<string>('');
  const course = useCourseContext<BasicOperationStore>();
  const toast = useToast();

  const serializeWitnesses = () => {
    try {
      course.store.serializeWitnesses(message());
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
      <div class="flex space-x-4 items-center justify-center">
        <div class="flex-auto">
          <input
            class="input input-sm py-2"
            placeholder="lock: witness"
            onInput={(event) => setMessage(event.currentTarget.value)}
          />
        </div>
        <button onClick={serializeWitnesses} class="button button-sm flex-none">
          Serialize witnessArgs
        </button>
      </div>
      <div class="bg-light-tertiary/10 dark:bg-dark-tertiary/10 text-ellipsis break-all text-xs px-4 py-2 rounded-lg mt-4">
        {course.store.state.witnesses ?? '...'}
      </div>
    </div>
  );
};

export default SerializeWitnesses;
