import { Component, createSignal, For, onMount } from 'solid-js';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import { Block, Transaction } from '@ckb-lumos/lumos';
import { BI } from '@ckb-lumos/bi';
import HighlightCode from '~/components/HighlightCode';
import Dialog, { createDialog } from '~/components/Dialog';

export const BlocksSection: Component = () => {
  const wallet = useWalletContext();
  const [blocks, setBlocks] = createSignal<Block[]>([]);
  const [transaction, setTransaction] = createSignal<Transaction>();
  const dialog = createDialog();

  onMount(() => {
    void getBlocks();
  });

  const getBlocks = async () => {
    const res = (await wallet.provider()?.getNewBlocks()) ?? [];
    setBlocks(res);
  };

  const onWatchTransaction = (transaction: Transaction) => {
    setTransaction(transaction);
    dialog().open();
  };

  return (
    <div class="py-4">
      <div class="not-prose grid grid-cols-3 gap-4">
        <For each={blocks()}>
          {(block) => (
            <BlockItem
              block={block}
              onTransactionClick={() => onWatchTransaction(block.transactions[0])}
            />
          )}
        </For>
      </div>
      <div class="flex justify-center mt-6">
        <button class="button button-sm" onClick={() => void getBlocks()}>
          Fetch Blocks
        </button>
      </div>
      <Dialog bodyClass="w-[800px]" footer={null} title={null} context={dialog}>
        <HighlightCode code={JSON.stringify(transaction(), null, 2)} />
      </Dialog>
    </div>
  );
};

const BlockItem: Component<{ block: Block; onTransactionClick: () => void }> = (props) => {
  return (
    <div class="py-4 px-4 border-2 border-light-border dark:border-dark-border dark:hover:bg-dark-hover hover:bg-light-hover rounded-lg flex flex-col">
      <span class="font-bold">Block：{BI.from(props.block.header.number).toString(10)}</span>
      <p class="truncate text-xs">Hash：{props.block.header.hash}</p>
      <span class="truncate border-b-2 pb-2 mb-2 border-light-border dark:border-dark-border text-xs">
        Time：{new Date(BI.from(props.block.header.timestamp).toNumber()).toLocaleString()}
      </span>
      <span class="truncate text-xs mb-2">
        Transactions：Count {props.block.transactions.length}
      </span>
      <span onClick={props.onTransactionClick} class="truncate cursor-pointer text-sm">
        {props.block.transactions[0].hash}
      </span>
    </div>
  );
};
