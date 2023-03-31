import { Component } from 'solid-js';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import HighlightCode from '~/components/HighlightCode';

export const TestnetConfigSection: Component = () => {
  const wallet = useWalletContext();

  return <HighlightCode code={JSON.stringify(wallet.provider()?.config.LUMOS_CONFIG, null, 2)} />;
};
