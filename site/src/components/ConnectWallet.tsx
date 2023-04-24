import { ParentComponent, Show } from 'solid-js';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import { MetaMaskInstallError } from '~/components/CKBCore/WalletProvider';
import { useToast } from '~/components/Toast/ToastContext';

interface Props {
  class?: string;
}

export const ConnectWallet: ParentComponent<Props> = (props) => {
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
        <div
          classList={{ [`${props?.class ?? ''}`]: props.class !== undefined }}
          class="flex flex-col rounded-lg items-center text-sm"
        >
          <span>Please connect the wallet first</span>
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
