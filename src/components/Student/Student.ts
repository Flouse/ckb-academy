import CkbProvider, { ICKBProvider } from '~/utils/ckb-provider';

export default class Student {
  private provider: ICKBProvider;
  readonly address: string;

  constructor(ethAddress: string) {
    this.address = ethAddress;
    this.provider = new CkbProvider();
  }
}
