import { createMemo, createUniqueId, JSX, ParentComponent, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import * as hoverCard from '@zag-js/hover-card';
import { normalizeProps, useMachine } from '@zag-js/solid';

interface HoverCardProps {
  content: JSX.Element | ((close?: () => void) => JSX.Element);
  arrow?: boolean;
  arrowSize?: number;
  class?: string;
  openDelay?: number;
  closeDelay?: number;
  defaultOpen?: boolean;
  onOpenChange?: (changed: boolean) => void;
}

const HoverCard: ParentComponent<HoverCardProps> = (props) => {
  const [state, send] = useMachine(
    hoverCard.machine({
      id: createUniqueId(),
      openDelay: props.openDelay ?? 100,
      defaultOpen: props.defaultOpen,
      closeDelay: props.closeDelay,
      onOpenChange: props.onOpenChange,
    }),
  );
  const api = createMemo(() => hoverCard.connect(state, send, normalizeProps));

  const arrowSize = createMemo<number>(() => {
    const size = props.arrow ? 8 : 0;
    return size && props.arrowSize ? props.arrowSize : size;
  });
  return (
    <>
      <div {...api().triggerProps}>{props.children}</div>
      <Show when={api().isOpen}>
        <Portal>
          <div
            classList={{ [props?.class || '']: props.class != null }}
            class="px-4 py-2 z-10 rounded text-sm bg-light-background dark:bg-dark-background shadow-dropdown shadow-light-shadow/10 dark:shadow-dark-shadow"
            {...api().positionerProps}
          >
            <div {...api().contentProps} style={{ '--arrow-size': `${arrowSize()}px` }}>
              <Show when={props.arrow}>
                <div {...api().arrowProps}>
                  <div
                    {...api().arrowTipProps}
                    data-part="arrow"
                    class="data-[part=arrow]:!bg-light-background data-[part=arrow]:dark:!bg-dark-background"
                  />
                </div>
              </Show>

              {typeof props.content === 'function'
                ? props.content?.(() => api().close())
                : props.content}
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
};

export default HoverCard;
