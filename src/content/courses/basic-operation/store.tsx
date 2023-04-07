import { CourseStoreBase } from '~/components/CourseCore/CourseStore';
import * as helpers from '@ckb-lumos/helpers';
import * as commons from '@ckb-lumos/common-scripts';
import { blockchain, Cell, OutPoint, Output, Transaction, utils } from '@ckb-lumos/base';
import { bytes } from '@ckb-lumos/codec';
import { CKBProvider } from '~/components/CKBCore/CKBProvider';
import { validators } from '@ckb-lumos/toolkit';
import { Block } from '@ckb-lumos/lumos';

export interface BasicOperationState {
  transactionTemplate: Transaction;
  rawTransaction: Transaction;
  txSkeleton: helpers.TransactionSkeletonType;
  transactionSerialized?: string;
  rawTXHash?: string;
  message?: string;
  signedMessage?: string;
  witnesses?: string;
  txHash?: string;
  block?: Block;
}

const transactionTemplate: Transaction | any = {
  version: '0x0',
  headerDeps: [],
  cellDeps: [
    {
      outPoint: {
        txHash: 'Fill in the blanks here',
        index: 'Fill in the blanks here',
      },
      depType: 'Fill in the blanks here',
    },
    {
      outPoint: {
        txHash: 'Fill in the blanks here',
        index: 'Fill in the blanks here',
      },
      depType: 'Fill in the blanks here',
    },
  ],
  inputs: [
    {
      since: '0x0',
      previousOutput: {
        txHash: 'Fill in the blanks here',
        index: 'Fill in the blanks here',
      },
    },
  ],
  outputs: [
    {
      capacity: 'Fill in the blanks here',
      lock: {
        codeHash: 'Fill in the blanks here',
        hashType: 'Fill in the blanks here',
        args: 'Fill in the blanks here',
      },
    },
  ],
  outputsData: ['0x'],
  witnesses: ['0x'],
};

export class BasicOperationStore extends CourseStoreBase<BasicOperationState> {
  protected initState(): BasicOperationState {
    return {
      transactionTemplate: transactionTemplate,
      rawTransaction: transactionTemplate,
      txSkeleton: helpers.TransactionSkeleton(),
    };
  }

  generateRawTransaction(transaction: Transaction) {
    this.validateTransaction(transaction);
    this.updateState({ transactionTemplate: transaction, rawTransaction: transaction });
  }

  generateRawTXHash(): void {
    try {
      this.validateTransaction(this.state.rawTransaction);
      const transactionSerialized = bytes.hexify(
        blockchain.RawTransaction.pack(this.state.rawTransaction),
      );
      const rawTXHash = utils.ckbHash(transactionSerialized);
      this.updateState({ transactionSerialized, rawTXHash });
    } catch (_) {
      throw new Error('Please fill the transaction form above and click Save button');
    }
  }

  async generateMessage(provider: CKBProvider) {
    try {
      this.validateTransaction(this.state.rawTransaction);
    } catch (err) {
      throw new Error('RawTransaction validate error');
    }
    let txSkeleton = await this.createSkeleton(this.state.rawTransaction, provider);
    const CONFIG = provider.config.LUMOS_CONFIG;
    if (txSkeleton.inputs.size > 0) {
      txSkeleton = commons.omnilock.prepareSigningEntries(txSkeleton, { config: CONFIG });
      this.updateState({ txSkeleton, message: txSkeleton.signingEntries.get(0)?.message });
    } else {
      throw new Error('No alive cells found from OutPoints');
    }
  }

  async signTransaction(provider: CKBProvider) {
    if (this.state.message === undefined) {
      throw new Error('Message not generate');
    }
    const params = [provider.ethAddress, this.state.message];
    const signedMessage: string = await provider.ethProvider.send('personal_sign', params);
    this.updateState({ signedMessage });
  }

  serializeWitnesses(signedMessage: string) {
    if (signedMessage === '' || signedMessage !== this.state.signedMessage) {
      throw new Error('Message error');
    }
    let v = Number.parseInt(signedMessage.slice(-2), 16);
    if (v >= 27) v -= 27;
    signedMessage = '0x' + signedMessage.slice(2, -2) + v.toString(16).padStart(2, '0');
    const witnesses = bytes.hexify(
      blockchain.WitnessArgs.pack({
        lock: commons.omnilock.OmnilockWitnessLock.pack({
          signature: bytes.bytify(signedMessage).buffer,
        }),
      }),
    );

    this.updateState({ witnesses });
  }

  updateRawTransaction(rawTransaction: Transaction) {
    this.validateTransaction(rawTransaction);
    let txSkeleton = this.state.txSkeleton;
    for (let i = 0; i < txSkeleton.inputs.toArray().length; i++) {
      txSkeleton = txSkeleton.update('witnesses', (witnesses) => {
        return witnesses.set(i, rawTransaction.witnesses[i]);
      });
    }
    this.updateState({ rawTransaction, txSkeleton });
  }

  async getBlock(provider: CKBProvider) {
    if (this.state.txHash === undefined) {
      throw new Error('tx hash is empty.');
    }
    const tx = await provider.ckbRpc.getTransaction(this.state.txHash);
    if (tx.txStatus.status === 'committed') {
      const block = await provider.ckbRpc.getBlock(tx.txStatus.blockHash ?? '');
      this.updateState({ block });
    } else {
      throw new Error(`tx_status:${tx.txStatus.status}`);
    }
  }

  validateTransaction(transaction: Transaction) {
    return validators.ValidateTransaction(transaction);
  }

  async sendTransaction(provider: CKBProvider) {
    try {
      this.validateTransaction(this.state.rawTransaction);
    } catch (e) {
      throw new Error('RawTransaction validate error');
    }
    const tx = helpers.createTransactionFromSkeleton(this.state.txSkeleton);
    const txHash = await provider.ckbRpc.sendTransaction(tx, 'passthrough');
    this.updateState({ txHash: txHash });
  }

  private async createSkeleton(transaction: Transaction, provider: CKBProvider) {
    let txSkeleton = helpers.TransactionSkeleton();
    const outpoints = transaction.inputs.map((input) => input.previousOutput);
    const input_cells = await this.getInputCellsByOutpoints(outpoints, provider);
    const output_cells = this.getOutputCellsByOutputs(transaction.outputs);
    txSkeleton = txSkeleton.update('inputs', (inputs) => inputs.push(...input_cells));
    txSkeleton = txSkeleton.update('outputs', (outputs) => outputs.push(...output_cells));
    txSkeleton = txSkeleton.update('cellDeps', (cellDeps) =>
      cellDeps.push(...transaction.cellDeps),
    );
    const witness = bytes.hexify(
      blockchain.WitnessArgs.pack({
        lock: bytes.hexify(
          new Uint8Array(
            commons.omnilock.OmnilockWitnessLock.pack({
              signature: new Uint8Array(65).buffer,
            }).byteLength,
          ),
        ),
      }),
    );
    for (let i = 0; i < txSkeleton.inputs.toArray().length; i++) {
      txSkeleton = txSkeleton.update('witnesses', (witnesses) => witnesses.push(witness));
    }
    return txSkeleton;
  }

  private getOutputCellsByOutputs(outputs: Output[]) {
    return outputs.map((output) => {
      return {
        cellOutput: output,
        data: '0x',
      } as Cell;
    });
  }

  private async getInputCellsByOutpoints(outpoints: OutPoint[], provider: CKBProvider) {
    const cells: Cell[] = [];
    const liveCells = await provider.getLiveCells();
    liveCells?.forEach((cell) => {
      const index = outpoints.findIndex((item) => {
        return item.index === cell.outPoint?.index && item.txHash === cell.outPoint?.txHash;
      });
      if (index >= 0) {
        cells.push(cell);
      }
    });
    return cells;
  }
}
