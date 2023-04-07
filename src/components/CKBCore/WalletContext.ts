import { Accessor, createContext, useContext } from 'solid-js';
import { CKBProvider } from '~/components/CKBCore/CKBProvider';

export interface WalletContext {
  connected: Accessor<boolean>;
  provider: Accessor<CKBProvider | undefined>;
  connect: () => Promise<void>;
}

export const walletContext = createContext<WalletContext>({
  connected: () => false,
  provider: () => undefined,
  connect: () => Promise.reject(void 0),
});

export const useWalletContext = () => {
  return useContext(walletContext);
};
