import { Component } from 'solid-js/types/render/component';
import { useI18n } from '@solid-primitives/i18n';
import { createMemo, For } from 'solid-js';
import { NavLink } from '@solidjs/router';
import './NavBar.css';

interface INavBarItem {
  title: string;
  to: string;
  target?: '_top' | '_blank' | '_parent' | '_self';
}

interface INavBarProps {
  onItemClick?: () => void;
}

const NavBar: Component<INavBarProps> = (props) => {
  const [tr] = useI18n();
  const items = createMemo<INavBarItem[]>(() => [
    {
      title: tr('global.nav.courses', {}, 'Courses'),
      to: '/courses',
    },
    {
      title: tr('global.nav.library', {}, 'Library'),
      to: '/library',
    },
    {
      title: tr('global.nav.playground', {}, 'Playground'),
      to: '/playground',
    },
    {
      title: tr('global.nav.archive', {}, 'Archive'),
      to: '/archive',
    },
    {
      title: 'Github',
      to: 'https://github.com/Flouse/ckb-school',
      target: '_blank',
    },
  ]);

  return (
    <nav id="navbar">
      <For each={items()}>
        {(item) => (
          <NavLink
            onclick={() => props.onItemClick?.()}
            activeClass="active"
            href={item.to}
            target={item.target}
          >
            {item.title}
          </NavLink>
        )}
      </For>
    </nav>
  );
};

export default NavBar;
