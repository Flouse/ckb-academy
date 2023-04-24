import { predefined } from '@ckb-lumos/config-manager';

export type CKBConfig = {
  LUMOS_CONFIG: typeof predefined.AGGRON4;
  CKB_INDEXER_URL: string;
  CKB_RPC_URL: string;
  SCANNER_URL: string;
  NERVOS_FUNCTIONS_URL: string;
};

export const ckbConfig: CKBConfig = {
  LUMOS_CONFIG: predefined.AGGRON4,
  CKB_INDEXER_URL: 'https://testnet.ckb.dev/indexer',
  CKB_RPC_URL: 'https://testnet.ckb.dev',
  SCANNER_URL: 'https://pudge.explorer.nervos.org',
  NERVOS_FUNCTIONS_URL: 'https://nervos-functions.vercel.app',
};
