import { createEffect, createMemo, createResource, createSignal, ParentComponent } from 'solid-js';
import { WalletContext, walletContext } from '~/components/CKBCore/WalletContext';
import detectEthereum from '@metamask/detect-provider';
import { CKBProvider } from '~/components/CKBCore/CKBProvider';

interface ethereum {
  on: (event: string, listen: (data?: never) => void) => void;
  once: (event: string, listen: (data?: never) => void) => void;
  request: <T>(params: { method: string }) => Promise<T>;
  chainId: string;
}

export const WalletProvider: ParentComponent = (props) => {
  const [provider, setProvider] = createSignal<CKBProvider>();
  const [ethereum] = createResource<ethereum | undefined, unknown>(async () => {
    const res = await detectEthereum();
    return res as ethereum | undefined;
  });

  const [ethAccounts] = createResource<string[], ethereum | undefined>(
    () => ethereum(),
    async (ethereum) => {
      return ethereum?.request?.({ method: 'eth_accounts' }) ?? [];
    },
  );

  createEffect(() => {
    ethereum()?.on('accountsChanged', (accounts: string[] | undefined) => {
      if (accounts && accounts.length > 0) {
        setProvider(new CKBProvider(accounts[0]));
      } else {
        setProvider(undefined);
      }
    });
  });

  createEffect(() => {
    const accounts = ethAccounts() ?? [];
    if (accounts.length > 0) {
      setProvider(new CKBProvider(accounts[0]));
    }
  });

  const connect = async () => {
    if (provider() === undefined) {
      if (ethereum()) {
        const accounts = await ethereum()?.request<string[]>({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setProvider(new CKBProvider(accounts[0]));
        } else {
          setProvider(undefined);
        }
      } else {
        throw new MetaMaskInstallError();
      }
    }
  };

  const connected = createMemo(() => provider() != undefined);

  const context: WalletContext = {
    connected: connected,
    provider: provider,
    connect: connect,
  };

  return <walletContext.Provider value={context}>{props.children}</walletContext.Provider>;
};

export class MetaMaskInstallError extends Error {}
