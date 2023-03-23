import { Component, createMemo, Show } from 'solid-js';
import * as zagToast from '@zag-js/toast';
import { normalizeProps, useActor } from '@zag-js/solid';
import './index.css';
import {
  FaSolidCircleCheck,
  FaSolidCircleExclamation,
  FaSolidCircleInfo,
  FaSolidCircleXmark,
  FaSolidSpinner,
} from 'solid-icons/fa';

interface Props {
  actor: zagToast.Service;
}

const Toast: Component<Props> = (props) => {
  const [state, send] = useActor(props.actor);
  const api = createMemo(() => zagToast.connect(state, send, normalizeProps));
  const progressbarProps = createMemo(() => ({
    'data-scope': 'toast',
    'data-part': 'progressbar',
    'data-type': state.context.type,
    style: {
      opacity: api().isVisible ? 1 : 0,
      'transform-origin': api().isRtl ? 'right' : 'left',
      'animation-name': api().type === 'loading' ? 'none' : 'progress',
      'animation-play-state': api().isPaused ? 'paused' : 'running',
      'animation-duration': `${state.context.duration}ms`,
    },
  }));

  const render = api().render();

  if (render) {
    return <div {...api().rootProps}>{render}</div>;
  }
  return (
    <div
      {...api().rootProps}
      class="bg-light-background overflow-hidden shadow-2xl dark:bg-dark-background px-6 py-6 rounded-lg relative flex w-96"
    >
      <div
        {...progressbarProps()}
        class="absolute bg-light-divider dark:bg-dark-divider h-1 top-0 left-0"
      />
      <Show when={api().type !== 'custom'} keyed>
        <div class={'text-xl mr-4 mt-1'}>
          {api().type === 'loading' ? <FaSolidSpinner class="animate-spin" /> : null}
          {api().type === 'info' ? (
            <i class="text-primary">
              <FaSolidCircleInfo />
            </i>
          ) : null}
          {api().type === 'success' ? (
            <i class="text-success">
              <FaSolidCircleCheck />
            </i>
          ) : null}
          {api().type === 'error' ? (
            <i class="text-error">
              <FaSolidCircleExclamation />
            </i>
          ) : null}
        </div>
      </Show>
      <div class="flex flex-col">
        <p
          {...api().titleProps}
          class="pb-1.5 text-lg font-bold text-light-headline dark:text-dark-headline"
        >
          {api().title}
        </p>
        <p {...api().descriptionProps}>{api().description}</p>
      </div>
      <button
        class="absolute  text-light-tertiary hover:opacity-50 top-4 right-4"
        {...api().closeTriggerProps}
      >
        <FaSolidCircleXmark />
      </button>
    </div>
  );
};

export default Toast;
