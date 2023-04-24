import { Component, createMemo, Show } from 'solid-js';
import { useCourseContext } from '~/components/CourseCore/CourseContext';
import { BasicOperationStore } from '~/content/courses/basic-operation/store';
import { useToast } from '~/components/Toast/ToastContext';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import { BI } from '@ckb-lumos/bi';

const CheckBlock: Component = () => {
  const course = useCourseContext<BasicOperationStore>();
  const toast = useToast();
  const wallet = useWalletContext();

  const getBlock = async () => {
    try {
      await course.store.getBlock(wallet.provider()!);
    } catch (err) {
      if (err instanceof Error) {
        toast.error({ title: 'Error', description: err.message });
      } else {
        console.error(err);
      }
    }
  };

  const block = createMemo(() => course.store.state.block);

  return (
    <div class="not-prose py-2">
      <button onClick={() => void getBlock()} class="button button-sm">
        Check the block where the transaction was packaged
      </button>
      <div class="border border-light-border border-dashed rounded-lg px-4 py-2 mt-4">
        <Show when={block() !== undefined} keyed fallback={'...'}>
          <div
            onClick={() => {
              window.open(
                `https://pudge.explorer.nervos.org/transaction/${course.store.state.txHash ?? ''}`,
              );
            }}
            class="flex flex-col hover:cursor-pointer"
          >
            <span class="font-bold">Block：{BI.from(block()!.header.number).toString(10)}</span>
            <p class="truncate text-xs">Hash：{block()!.header.hash}</p>
            <span class="truncate border-b border-dashed pb-2 mb-2 border-light-border dark:border-dark-border text-xs">
              Time：{new Date(BI.from(block()!.header.timestamp).toNumber()).toLocaleString()}
            </span>
            <span class="truncate text-xs mb-2">
              Transactions：Count {block()!.transactions.length}
            </span>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default CheckBlock;
