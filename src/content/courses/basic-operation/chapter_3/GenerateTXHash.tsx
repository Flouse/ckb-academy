import { Component, createSignal } from 'solid-js';
import { useCourseContext } from '~/components/CourseCore/CourseContext';
import { BasicOperationStore } from '~/content/courses/basic-operation/store';
import { useToast } from '~/components/Toast/ToastContext';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import { bytes } from '@ckb-lumos/codec';
import { blockchain } from '@ckb-lumos/base';
import { utils } from '@ckb-lumos/lumos';

const GenerateTXHash: Component = () => {
  const [code, setCode] = createSignal<string>('');
  const course = useCourseContext<BasicOperationStore>();
  const toast = useToast();
  const wallet = useWalletContext();

  const onGenerate = () => {
    if (course.store.state.transactionCheckPass) {
      const serialized = bytes.hexify(
        blockchain.RawTransaction.pack(course.store.state.transactionInfo),
      );
      const rawTXHash = utils.ckbHash(serialized);

      course.store.updateState({ transactionSerialized: serialized, rawTXHash: rawTXHash });

      // let txSkeleton = helpers.TransactionSkeleton({ cellProvider: wallet.provider()?.indexer });
      // const raw = course.store.state.transactionInfo;
      // txSkeleton = txSkeleton.update('cellDeps', (d) => {
      //   return d.push(...raw.cellDeps);
      // });
      // console.log(helpers.transactionSkeletonToObject(txSkeleton));
    } else {
      toast.error({ title: 'Error', description: '请补充完上面的交易表格，然后点击保存按钮' });
    }
  };

  return (
    <div class="not-prose">
      <button onClick={onGenerate} class="button button-sm">
        生成 tx_hash
      </button>
      <div class="mt-4 border border-light-border border-dashed rounded-lg px-4 pt-3">
        <span>the serialized Transaction before hash function:</span>
        <p class="text-xs overflow-x-auto pb-4">{course.store.state.transactionSerialized}</p>
      </div>

      <div class="bg-light-divider px-4 py-2 rounded-lg mt-2">
        tx_hash: {course.store.state.rawTXHash}
      </div>
    </div>
  );
};

export default GenerateTXHash;
