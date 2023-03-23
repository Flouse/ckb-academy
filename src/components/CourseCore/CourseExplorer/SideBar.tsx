import { Component, createSignal, For } from 'solid-js';
import { BiRegularCoffee } from 'solid-icons/bi';

const SideBar: Component = () => {
  const [tab, setTab] = createSignal('tools');

  const tabs: { name: string; id: string }[] = [
    { id: 'tools', name: 'Tools' },
    { id: 'library', name: 'Library' },
  ];

  return (
    <div class="h-full flex flex-col">
      <ul class="flex divide-x divide-light-border dark:divide-dark-border border-b border-light-border dark:border-dark-border">
        <For each={tabs}>
          {(item) => (
            <li
              onClick={() => setTab(item.id)}
              class="relative cursor-pointer flex-1 after:absolute after:-bottom-0 after:left-0 after:content-[''] after:h-0.5 after:w-full  flex items-center text-sm justify-center py-2"
              classList={{
                'after:bg-light-border dark:after:bg-dark-border': tab() == item.id,
              }}
            >
              {item.name}
            </li>
          )}
        </For>
      </ul>
      <div class="flex-auto flex items-center justify-center">
        <div class="flex flex-col items-center text-light-divider dark:text-dark-divider">
          <i>
            <BiRegularCoffee class="text-4xl" />
          </i>
          <span>No data...</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
