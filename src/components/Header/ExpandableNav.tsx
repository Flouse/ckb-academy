import { Component } from 'solid-js/types/render/component';
import { createEffect, createSignal } from 'solid-js';
import NavBar from '~/components/Header/NavBar';
import { Dialog } from '@kobalte/core';
import Preference from '~/components/Header/Preference';
import { BiRegularMenu } from 'solid-icons/bi';
import { createMediaQuery } from '@solid-primitives/media';

const ExpandableNav: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const isSmallScreen = createMediaQuery('(max-width: 1024px)');
  createEffect(() => {
    if (isOpen() && !isSmallScreen()) {
      setIsOpen(false);
    }
  });

  return (
    <Dialog.Root isOpen={isOpen()} onOpenChange={(val) => setIsOpen(val)} isModal={true}>
      <Dialog.Trigger>
        <BiRegularMenu class="text-3xl" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <div class="fixed z-10 bg-light-mask dark:bg-dark-mask" style={{ inset: 0 }}>
          <Dialog.Overlay />
          <div
            class="fixed bg-light-background dark:bg-dark-background_dark w-96"
            style={{ inset: 0 }}
          >
            <Dialog.Content class="flex flex-col h-full">
              <div class="flex-auto pt-12">
                <NavBar onItemClick={() => setIsOpen(false)} />
              </div>
              <div class="flex-none">
                <Preference />
              </div>
            </Dialog.Content>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ExpandableNav;
