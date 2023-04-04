import { Component, createSignal, For, JSX, lazy, Match, Show, Switch } from 'solid-js';
import {
  BiRegularArrowToLeft,
  BiRegularCalculator,
  BiRegularCog,
  BiRegularWallet,
  BiSolidCategory,
  BiSolidVirus,
} from 'solid-icons/bi';
import Dialog, { createDialog } from '~/components/Dialog';
import { ConnectWallet } from '~/components/ConnectWallet';

interface ToolItem {
  name: string;
  icon?: JSX.Element;
  component?: Component;
  isDialog?: boolean;
  useWallet?: boolean;
}

const ToolBox: Component = () => {
  const [tool, setTool] = createSignal<ToolItem>();
  const dialog = createDialog({ closeOnOutsideClick: false });
  const tools: ToolItem[] = [
    {
      name: 'Hex To Decimal',
      icon: <BiRegularCalculator />,
      component: lazy(() => import('./Tools/HexToDecimal')),
    },
    {
      name: 'Chain Info',
      component: lazy(() => import('./Tools/ChainInfo')),
      icon: <BiRegularCog />,
      isDialog: true,
      useWallet: true,
    },
    {
      name: 'Live Cells',
      component: lazy(() => import('./Tools/LiveCells')),
      icon: <BiSolidVirus />,
      isDialog: true,
      useWallet: true,
    },
    {
      name: 'Wallet',
      icon: <BiRegularWallet />,
    },
  ];

  return (
    <>
      <div class="h-full flex flex-col">
        <h6 class="flex text-xs font-bold items-center py-3 px-4 divide-x divide-light-border dark:divide-dark-border border-b border-light-border dark:border-dark-border">
          <i class="mr-2">
            <BiSolidCategory />
          </i>
          CKB ToolBox
        </h6>
        <div class="flex-auto relative">
          <Show when={tool() && tool()?.isDialog != true} keyed>
            <div class="bg-light-background dark:bg-dark-background absolute left-0 right-0 bottom-0 top-0">
              <div class="flex items-center text-xs px-4 py-2 border-b border-light-border dark:border-dark-border border-dotted">
                <i class="text-lg mr-2 link" onClick={() => setTool(undefined)}>
                  <BiRegularArrowToLeft />
                </i>
                {tool()?.name}
              </div>
              <div class="px-4">{tool()?.component?.({}) ?? null}</div>
            </div>
          </Show>
          <div class="py-4">
            <For each={tools}>
              {(item) => (
                <div
                  onClick={() => {
                    if (item.component) {
                      setTool(item);
                      if (item.isDialog == true) {
                        dialog().open();
                      }
                    } else {
                      alert('Not online for now');
                    }
                  }}
                  class="text-xs hover:bg-light-hover dark:hover:bg-dark-hover cursor-pointer py-1.5 px-4 flex  items-center"
                >
                  <i class="text-xl mr-2">{item.icon}</i>
                  {item.name}
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
      <Show when={tool() && tool()?.isDialog === true} keyed>
        <Dialog context={dialog} footer={null} title={tool()?.name}>
          <Switch>
            <Match when={tool()?.useWallet === true} keyed>
              <ConnectWallet class="py-8">{tool()?.component?.({}) ?? null}</ConnectWallet>
            </Match>
            <Match when={tool()?.useWallet !== true} keyed>
              {tool()?.component?.({}) ?? null}
            </Match>
          </Switch>
        </Dialog>
      </Show>
    </>
  );
};

export default ToolBox;
