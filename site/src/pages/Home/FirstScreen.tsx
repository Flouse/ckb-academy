import { Motion } from '@motionone/solid';
import { spring } from 'motion';
import { Component } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { NavLink } from '@solidjs/router';

const FirstScreen: Component = () => {
  const [tr] = useI18n();

  return (
    <section
      style={{ 'background-image': 'url(/images/bg-home-main.jpg)' }}
      class="overflow-hidden bg-fixed"
    >
      <div class="backdrop-blur-md -z-10">
        <div class="container flex items-center mx-auto py-40 text-white">
          <Motion
            animate={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{
              delay: 0.1,
              duration: 0.5,
              easing: spring(),
            }}
          >
            <h4 class="text-7xl mb-12 font-bold">{tr('home.first_screen.heading')}</h4>
            <p class="text-3xl mb-2 font-medium">{tr('home.first_screen.sub_heading')}</p>
            <p class="text-3xl mb-10 font-medium">{tr('home.first_screen.sub_heading_modifier')}</p>
            <NavLink
              href="/courses"
              class="button-basic button-xl bg-gradient-primary hover:opacity-80 text-white font-bold"
            >
              {tr('home.first_screen.button_text')}
            </NavLink>
          </Motion>
        </div>
      </div>
    </section>
  );
};
export default FirstScreen;
