import { Component, Show } from 'solid-js';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import { MetaMaskInstallError } from '~/components/CKBCore/WalletProvider';
import { useToast } from '~/components/Toast/ToastContext';
import { BiSolidCheckCircle } from 'solid-icons/bi';
import { useCourseContext } from '~/components/CourseCore/CourseContext';

export const ConnectWallet: Component = () => {
  const wallet = useWalletContext();
  const course = useCourseContext();
  const toast = useToast();

  const connectWallet = () => {
    wallet
      .connect()
      .then(() => {
        course.finishChapter();
      })
      .catch((err: Error) => {
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
    <div class="not-prose">
      <Show
        when={wallet.connected()}
        keyed
        fallback={
          <button onClick={connectWallet} class="button-success-solid">
            Click Connect Wallet
          </button>
        }
      >
        <div class="flex flex-col bg-light-hover dark:bg-dark-hover rounded-lg p-4">
          <span class="flex items-center font-bold border-b pb-2 border-light-border dark:border-dark-border">
            <i class="mr-2 text-2xl text-success">
              <BiSolidCheckCircle />
            </i>
            Wallet connected
          </span>
          <div class="text-xs flex flex-col pt-2">
            <span class="font-medium">CKB Address：</span>
            <span class="break-all">{wallet.provider()?.ethAddress}</span>
            <span class="break-all">{wallet.provider()?.ckbAddress}</span>
          </div>
        </div>
      </Show>
    </div>
  );
};
