import { Component } from 'solid-js/types/render/component';
import { createEffect, createSignal, Show } from 'solid-js';
import { BiRegularMenu } from 'solid-icons/bi';
import { createMediaQuery } from '@solid-primitives/media';
import { Portal } from 'solid-js/web';
import NavBar from '~/components/Header/NavBar';
import Preference from '~/components/Header/Preference';

const SmallScreenNav: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const isSmallScreen = createMediaQuery('(max-width: 1024px)');
  createEffect(() => {
    if (isOpen() && !isSmallScreen()) {
      setIsOpen(false);
    }
  });

  return (
    <div>
      <BiRegularMenu onClick={() => setIsOpen((val) => !val)} class="text-3xl" />
      <Show when={isOpen()} keyed>
        <Portal>
          <div
            onClick={() => setIsOpen(false)}
            class="fixed top-0 bottom-0 right-0 left-0 bg-light-mask z-10"
          ></div>
          <div class="fixed flex flex-col top-0 bottom-0 left-0 w-96 bg-light-background dark:bg-dark-background_dark z-10">
            <div class="flex-auto mt-10">
              <NavBar onItemClick={() => setIsOpen(false)} />
            </div>
            <div class="flex-none">
              <Preference />
            </div>
          </div>
        </Portal>
      </Show>
    </div>
  );
};

export default SmallScreenNav;
