import CkbProvider, { CKBProvider } from '~/utils/ckb-provider';

export default class Student {
  private provider: CKBProvider;
  readonly address: string;

  constructor(ethAddress: string) {
    this.address = ethAddress;
    this.provider = new CkbProvider();
  }
}
