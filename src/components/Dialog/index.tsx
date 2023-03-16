import { Accessor, createMemo, createUniqueId, JSXElement, ParentComponent, Show } from 'solid-js';
import { FaSolidCircleXmark } from 'solid-icons/fa';
import { Portal } from 'solid-js/web';
import * as dialog from '@zag-js/dialog';

import { normalizeProps, useMachine } from '@zag-js/solid';

interface ICreateDialogProps {
  id?: string;
  defaultOpen?: boolean;
  closeOnOutsideClick?: boolean;
}

interface IDialogContext {
  isOpen: boolean;

  open(): void;

  close(): void;

  backdropProps: any;
  containerProps: any;
  contentProps: any;
  titleProps: any;
  descriptionProps: any;
  closeTriggerProps: any;
}

export function createDialog(props?: ICreateDialogProps): Accessor<IDialogContext> {
  const [state, send] = useMachine(
    dialog.machine({
      id: props?.id ?? createUniqueId(),
      defaultOpen: props?.defaultOpen,
      closeOnOutsideClick: props?.closeOnOutsideClick,
    }),
  );

  return createMemo(() => dialog.connect(state, send, normalizeProps));
}

interface IDialogProps {
  context: Accessor<IDialogContext>;
  onOk?: (close?: () => void) => void;
  onCancel?: (close?: () => void) => void;
  okText?: JSXElement;
  cancelText?: JSXElement;
  footer?: JSXElement;
  title?: JSXElement;
  closable?: boolean;
}

const Dialog: ParentComponent<IDialogProps> = (props) => {
  const onCancel = () => {
    if (props.onCancel) {
      props.onCancel?.call(() => props.context().close());
    } else {
      props.context().close();
    }
  };

  const onOk = () => {
    if (props.onOk) {
      props.onCancel?.(() => props.context().close());
    } else {
      props.context().close();
    }
  };

  return (
    <>
      <Show when={props.context().isOpen} keyed>
        <Portal>
          <div
            {...props.context().backdropProps}
            class="fixed top-0 bottom-0 left-0 right-0 bg-light-mask dark:bg-dark-mask z-10"
          />
          <div {...props.context().containerProps} class="relative h-full">
            <div
              {...props.context().contentProps}
              class="rounded-2xl shadow-2xl shadow-light-shadow dark:shadow-dark-shadow flex flex-col fixed max-h-full max-w-full w-max top-[50%] translate-y-[-50%] translate-x-[-50%]  left-[50%] z-10 bg-light-background dark:bg-dark-background"
            >
              <Show when={props.closable !== false} keyed>
                <span class="absolute text-lg right-6 top-6 hover:opacity-90 transition-all cursor-pointer">
                  <FaSolidCircleXmark onClick={onCancel} />
                </span>
              </Show>

              <Show when={typeof props.title === 'string'} keyed fallback={props.title}>
                <div class=" flex-none pl-6 pr-16 py-4 text-lg text-light-headline dark:text-dark-headline font-medium border-b border-light-divider dark:border-dark-divider">
                  {props.title}
                </div>
              </Show>
              <div class="m-6 h-full overflow-auto">{props.children}</div>
              <Show when={props.footer === undefined} keyed fallback={props.footer}>
                <div class="flex-none space-x-4 flex items-center justify-end p-6">
                  <button class="button px-6 py-2 text-sm rounded-lg" onClick={onCancel}>
                    {props.cancelText ?? 'Cancel'}
                  </button>
                  <button onClick={onOk} class="button-primary px-6 py-2 text-sm rounded-lg">
                    {props.okText ?? 'Confirm'}
                  </button>
                </div>
              </Show>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
};

export default Dialog;
