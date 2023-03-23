import {
  createContext,
  createMemo,
  createUniqueId,
  For,
  ParentComponent,
  useContext,
} from 'solid-js';

import * as zagToast from '@zag-js/toast';
import { normalizeProps, useMachine } from '@zag-js/solid';
import Toast from '~/components/Toast/index';
import { Options, Toaster } from '@zag-js/toast/dist/toast.types';
import { ToastContext } from '~/components/Toast/types';

const toastContext = createContext<ToastContext>();
export const useToast = () => useContext(toastContext)!;
export const toast: Toaster = zagToast.api()!;

const ToastProvider: ParentComponent = (props) => {
  const [state, send] = useMachine(
    zagToast.group.machine({ offsets: '10px', id: createUniqueId() }),
  );
  const api = createMemo(() => zagToast.group.connect(state, send, normalizeProps));
  const context: ToastContext = {
    ...api(),
    create: (options: Options) => {
      return api().create({
        ...options,
        type: 'custom',
        placement: options.placement ?? 'top-end',
      });
    },
    success: (options: Options) => {
      return api().success({ ...options, placement: options.placement ?? 'top-end' });
    },
    error: (options: Options) => {
      return api().error({ ...options, placement: options.placement ?? 'top-end' });
    },
    info: (options: Options) => {
      return api().create({ ...options, type: 'info', placement: options.placement ?? 'top-end' });
    },
    loading: (options: Options) => {
      return api().loading({ ...options, placement: options.placement ?? 'top-end' });
    },
  };

  return (
    <toastContext.Provider value={context}>
      <For each={Object.entries(api().toastsByPlacement)}>
        {([placement, toasts]) => {
          return (
            <div {...api().getGroupProps({ placement: placement as zagToast.Placement })}>
              <For each={toasts}>{(toast) => <Toast actor={toast} />}</For>
            </div>
          );
        }}
      </For>
      {props.children}
    </toastContext.Provider>
  );
};

export default ToastProvider;
