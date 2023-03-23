export interface CKBProvider {
  send(): void;
}

export default class CkbProvider implements CKBProvider {
  send() {
    console.log('send');
  }
}
