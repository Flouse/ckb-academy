import { Component } from 'solid-js';
import { useWalletContext } from '~/components/CKBCore/WalletContext';
import HighlightCode from '~/components/HighlightCode';

const ChainInfo: Component = () => {
  const wallet = useWalletContext();
  return (
    <div class="w-[800px] max-h-[600px] min-h-[300px]">
      <HighlightCode code={JSON.stringify(wallet.provider()?.config.LUMOS_CONFIG, null, 2)} />
    </div>
  );
};

export default ChainInfo;
