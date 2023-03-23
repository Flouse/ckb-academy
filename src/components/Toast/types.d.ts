import { Options, Placement } from '@zag-js/toast/dist/toast.types';

type MaybeFunction<Value, Args> = Value | ((arg: Args) => Value);
export type ToastContext = {
  count: number;
  isVisible(id: string): boolean;

  create(options: Options): string | undefined;

  upsert(options: Options): string | undefined;

  dismiss(id?: string): void;

  remove(id?: string): void;

  dismissByPlacement(placement: Placement): void;

  update(id: string, options: Options): string | undefined;

  loading(options: Options): string | undefined;

  success(options: Options): string | undefined;
  info(options: Options): string | undefined;

  error(options: Options): string | undefined;

  promise<T>(
    promise: Promise<T>,
    options: {
      loading: Options;
      success: MaybeFunction<Options, T>;
      error: MaybeFunction<Options, Error>;
    },
    shared?: Options,
  ): Promise<T>;

  pause(id?: string): void;

  resume(id?: string): void;
};
