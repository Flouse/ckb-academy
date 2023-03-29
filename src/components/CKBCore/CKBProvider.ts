import { Address, Cell, Script } from '@ckb-lumos/base';
import * as helpers from '@ckb-lumos/helpers';
import { Indexer } from '@ckb-lumos/ckb-indexer';
import { RPC } from '@ckb-lumos/rpc';
import { ckbConfig, CKBConfig } from '~/components/CKBCore/CKBConfig';
import { NervosFunctions } from '~/components/CKBCore/NervosFunctions';
import { BI } from '@ckb-lumos/bi';

export class CKBProvider {
  readonly ethAddress: string;

  ckbAddress: Address;

  config: CKBConfig;

  indexer: Indexer;
  ckbRpc: RPC;
  private readonly nervosClient: NervosFunctions;

  constructor(ethAddress: string) {
    this.ethAddress = ethAddress;
    this.config = ckbConfig;
    this.indexer = new Indexer(this.config.CKB_INDEXER_URL, this.config.CKB_RPC_URL);
    this.ckbRpc = new RPC(this.config.CKB_RPC_URL);
    this.ckbAddress = this.generateL1Address(this.ethAddress);
    this.nervosClient = new NervosFunctions(this.config.NERVOS_FUNCTIONS_URL);
    void this.getTestToken();
  }

  generateL1Address(account: string) {
    const omniLock: Script = {
      codeHash: this.config.LUMOS_CONFIG.SCRIPTS.OMNILOCK.CODE_HASH,
      hashType: this.config.LUMOS_CONFIG.SCRIPTS.OMNILOCK.HASH_TYPE,
      args: `0x01${account.substring(2)}00`,
    };
    return helpers.encodeToAddress(omniLock, {
      config: this.config.LUMOS_CONFIG,
    });
  }

  async getTestToken() {
    const liveCells = await this.getLiveCells();
    if (liveCells.length == 0) {
      await this.nervosClient.faucet(this.ckbAddress);
    }
  }

  async getLiveCells() {
    const cells: Cell[] = [];
    const collector = this.indexer.collector({
      lock: helpers.parseAddress(this.ckbAddress, { config: this.config.LUMOS_CONFIG }),
      type: 'empty',
      outputDataLenRange: ['0x0', '0x1'],
    });
    for await (const cell of collector.collect()) {
      cells.push(cell);
    }
    return cells;
  }

  async getNewBlocks(size?: number) {
    size = size || 9;
    const numbers: string[] = [];
    const blockNumber = await this.ckbRpc.getTipBlockNumber();
    numbers.push(blockNumber);
    for (let i = 1; i < size; i++) {
      const next = BI.from(blockNumber).sub(BI.from(i)).toHexString();
      numbers.push(next);
    }
    return Promise.all(
      numbers.map((number) => {
        return this.ckbRpc.getBlockByNumber(number);
      }),
    );
  }
}
