import { Component, createSignal, For, JSX, lazy, Show } from 'solid-js';
import {
  BiRegularArrowToLeft,
  BiRegularCalculator,
  BiRegularCog,
  BiRegularSearch,
  BiRegularWallet,
  BiSolidCategory,
} from 'solid-icons/bi';

interface ToolItem {
  name: string;
  icon?: JSX.Element;
  component?: Component;
}

const ToolBox: Component = () => {
  const [tool, setTool] = createSignal<ToolItem>();
  const tools: ToolItem[] = [
    {
      name: 'Hex To Decimal',
      icon: <BiRegularCalculator />,
      component: lazy(() => import('./Tools/HexToDecimal')),
    },
    {
      name: 'Chain Info',
      icon: <BiRegularCog />,
    },
    {
      name: 'Wallet',
      icon: <BiRegularWallet />,
    },
    {
      name: 'Query Cells',
      icon: <BiRegularSearch />,
    },
  ];

  return (
    <div class="h-full flex flex-col">
      <h6 class="flex text-xs font-bold items-center py-3 px-4 divide-x divide-light-border dark:divide-dark-border border-b border-light-border dark:border-dark-border">
        <i class="mr-2">
          <BiSolidCategory />
        </i>
        CKB ToolBox
      </h6>
      <div class="flex-auto relative">
        <Show when={tool()} keyed>
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
  );
};

export default ToolBox;
