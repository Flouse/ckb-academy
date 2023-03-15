export interface ICKBProvider {
  send(): void;
}

export default class CkbProvider implements ICKBProvider {
  send() {
    console.log('send');
  }
}
