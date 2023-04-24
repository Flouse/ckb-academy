import { HexString } from '@ckb-lumos/lumos';
import { BI } from '@ckb-lumos/bi';

export function shannonToCKB(shannon: HexString | undefined) {
  const def = BI.from(0);
  if (shannon === undefined) return def;
  if (BI.from(shannon).toNumber() === 0) return def;
  return BI.from(shannon).div(BI.from(10 ** 8));
}

export function CKBToShannon(ckb: string | undefined) {
  const def = BI.from(0);
  if (ckb === undefined) return def;
  if (BI.from(ckb).toNumber() === 0) return def;
  return BI.from(ckb).mul(BI.from(10 ** 8));
}
