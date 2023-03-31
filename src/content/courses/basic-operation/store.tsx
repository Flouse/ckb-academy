import { CourseStoreBase } from '~/components/CourseCore/CourseStore';
import { CKBComponents } from '@ckb-lumos/rpc/lib/types/api';

export interface BasicOperationState extends Object {
  transactionInfo: CKBComponents.RawTransaction;
  transactionCheckPass: boolean;
  transactionSerialized: string;
  rawTXHash: string;
}

const transactionInfo: CKBComponents.RawTransaction | any = {
  version: '0x0',
  headerDeps: [],
  cellDeps: [
    {
      outPoint: {
        txHash: '将此处补充完整',
        index: '将此处补充完整',
      },
      depType: '将此处补充完整',
    },
  ],
  inputs: [
    {
      since: '0x0',
      previousOutput: {
        txHash: '将此处补充完整',
        index: '将此处补充完整',
      },
    },
  ],
  outputs: [
    {
      capacity: '将此处补充完整',
      lock: {
        codeHash: '将此处补充完整',
        hashType: '将此处补充完整',
        args: '将此处补充完整',
      },
    },
  ],
  outputsData: ['0x0'],
  witnesses: ['0x0'],
};

export class BasicOperationStore extends CourseStoreBase<BasicOperationState> {
  protected initState(): BasicOperationState {
    return {
      transactionInfo: transactionInfo,
      transactionCheckPass: false,
      transactionSerialized: '',
      rawTXHash: '',
    };
  }
}
