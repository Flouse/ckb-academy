import { createMemo, createUniqueId, ParentComponent, Show } from 'solid-js';
import * as tooltip from '@zag-js/tooltip';
import { normalizeProps, useMachine } from '@zag-js/solid';
import './index.css';
import { Placement } from '@zag-js/toast/dist/toast.types';
import { Portal } from 'solid-js/web';

interface Props {
  content: string;
  openDelay?: number;
  closeDelay?: number;
  placement?: Placement;
  closeOnPointerDown?: boolean;
}

const Tooltip: ParentComponent<Props> = (props) => {
  const [state, send] = useMachine(
    tooltip.machine({
      id: createUniqueId(),
      openDelay: props.openDelay || 100,
      closeDelay: props.closeDelay || 100,
      closeOnPointerDown: props.closeOnPointerDown || true,
      positioning: {
        strategy: 'fixed',
        placement: props.placement,
      },
    }),
  );

  const api = createMemo(() => tooltip.connect(state, send, normalizeProps));
  return (
    <>
      <button {...api().triggerProps}>{props.children}</button>
      <Show when={api().isOpen}>
        <Portal>
          <div {...api().positionerProps} class="tooltip z-10">
            <div {...api().arrowProps}>
              <div {...api().arrowTipProps} />
            </div>
            <div
              {...api().contentProps}
              class="bg-black dark:bg-white text-xs text-white dark:text-black rounded-md px-2 py-1"
            >
              {props.content}
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
};

export default Tooltip;
