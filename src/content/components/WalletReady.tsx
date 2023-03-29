import { ParentComponent, Show } from 'solid-js';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import { MetaMaskInstallError } from '~/components/CKBCore/WalletProvider';
import { useToast } from '~/components/Toast/ToastContext';

export const WalletReady: ParentComponent = (props) => {
  const wallet = useWalletContext();
  const toast = useToast();

  const connectWallet = () => {
    wallet.connect().catch((err: Error) => {
      if (err instanceof MetaMaskInstallError) {
        toast.error({
          title: 'Error',
          description:
            'Please make sure that the MetaMask browser extension is installed before attempting to reconnect.',
        });
      } else {
        toast.error({
          title: 'Error',
          description: `${err.message}`,
        });
      }
    });
  };

  return (
    <Show
      when={wallet.connected()}
      keyed
      fallback={
        <div class="bg-light-hover dark:bg-dark-hover flex flex-col rounded-lg items-center my-10 py-16 px-4 text-sm">
          <span>This section requires connecting a wallet before it can be displayed.</span>
          <button onClick={connectWallet} class="button mt-4">
            Connect Wallet
          </button>
        </div>
      }
    >
      {props.children}
    </Show>
  );
};
