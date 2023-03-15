import { Component, For, JSX } from 'solid-js';
import {
  FaBrandsGolang,
  FaBrandsRust,
  FaSolidBridge,
  FaSolidWallet,
  FaSolidWindowRestore,
} from 'solid-icons/fa';
import { Motion } from '@motionone/solid';

import { spring } from 'motion';
import { useI18n } from '@solid-primitives/i18n';
import { IBaseLink } from '~/types/interfaces';
import { A } from 'solid-start';

interface ITool extends IBaseLink {
  icon?: JSX.Element;
}

const tools: ITool[] = [
  {
    title: 'Rust SDK for CKB',
    to: 'https://github.com/nervosnetwork/ckb-sdk-rust',
    icon: () => <FaBrandsRust />,
  },
  {
    title: 'Go SDK for CKB',
    to: 'https://github.com/nervosnetwork/ckb-sdk-go',
    icon: () => <FaBrandsGolang />,
  },
  {
    title: 'Javascript SDK - Lumos',
    icon: () => <FaBrandsGolang />,
    to: 'https://github.com/ckb-js/lumos',
  },
  {
    title: 'Godwoken - Layer 2 solutions',
    icon: () => <FaSolidBridge />,
    to: 'https://github.com/godwokenrises/godwoken',
  },
  {
    title: 'CKB Wallet - Neuron',
    icon: () => <FaSolidWallet />,
    to: 'https://github.com/nervosnetwork/neuron',
  },
  {
    title: 'Ckb Explorer',
    icon: () => <FaSolidWindowRestore />,
    to: 'https://github.com/Magickbase/ckb-explorer',
  },
];
const Ecosystem: Component = () => {
  const [tr] = useI18n();
  return (
    <section class="bg-primary text-white">
      <div class="container flex flex-col py-36 mx-auto relative">
        <Motion.div
          animate={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{
            delay: 0.5,
            duration: 0.5,
            easing: spring(),
          }}
          class="flex flex-col"
        >
          <p class="text-7xl mb-6 font-bold ">{tr('home.ecosystem.heading')}</p>
          <p class="text-3xl font-medium">{tr('home.ecosystem.sub_heading')}</p>
          <p class="text-xl mt-2">{tr('home.ecosystem.sub_heading_modifier')}</p>
          <div class="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-10">
            <For each={tools}>
              {(item) => (
                <A
                  href={item.to}
                  target="_blank"
                  class="bg-white/10 text-white flex flex-col font-medium items-center rounded px-10 py-16 hover:bg-white hover:opacity-100 hover:text-primary"
                >
                  {item.icon && <span class="text-6xl mb-4">{item.icon}</span>}
                  {item.title}
                </A>
              )}
            </For>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};
export default Ecosystem;
