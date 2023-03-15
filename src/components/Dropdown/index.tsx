import { createMemo, createSignal, For, JSX, ParentComponent } from 'solid-js';
import { As, DropdownMenu } from '@kobalte/core';

export interface DropdownMenuProps {
  id: string;
  label: JSX.Element;
  icon?: JSX.Element;
  onSelect?: (id: string) => void;
}

export type DropdownProp = {
  menus: DropdownMenuProps[];
  selected?: string[];
  arrow?: boolean;
  class?: string;
};

const Dropdown: ParentComponent<DropdownProp> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const MenuItem = ({ item }: { item: DropdownMenuProps }) => {
    const isSelected = createMemo(() => {
      return (props.selected ?? []).findIndex((i) => i === item.id) >= 0;
    });

    return (
      <DropdownMenu.Item
        class="cursor-pointer px-4 py-2 hover:bg-light-hover dark:hover:bg-dark-hover"
        classList={{
          'bg-primary/20 hover:bg-primary/20 dark:bg-primary/10 dark:hover:bg-primary/10':
            isSelected(),
        }}
        onSelect={() => {
          item.onSelect?.(item.id);
        }}
      >
        {item.icon}
        {item.label}
      </DropdownMenu.Item>
    );
  };
  return (
    <DropdownMenu.Root
      isOpen={isOpen()}
      onOpenChange={(val) => setIsOpen(val)}
      gutter={props.arrow ? undefined : 10}
    >
      <DropdownMenu.Trigger class={props.class} asChild>
        <As component={'div'}>{props.children}</As>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content class="text-sm py-2 rounded-lg z-10 bg-light-background dark:bg-dark-background shadow-dropdown shadow-light-shadow/20 dark:shadow-dark-shadow">
          <For each={props.menus}>{(menu) => <MenuItem item={menu} />}</For>
          {props.arrow && <DropdownMenu.Arrow />}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
