import { Motion } from '@motionone/solid';
import { spring } from 'motion';
import { Component } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

const FirstScreen: Component = () => {
  const [tr] = useI18n();

  const toAboutCourse = () => {
    const anchor = document.getElementById('about-course');
    anchor && anchor.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

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
            <p class="text-4xl mb-2 font-medium">{tr('home.first_screen.sub_heading')}</p>
            <p class="text-2xl mb-10">{tr('home.first_screen.sub_heading_modifier')}</p>
            <span
              onClick={toAboutCourse}
              class="button-basic bg-gradient-primary hover:opacity-80 text-white text-2xl font-bold"
            >
              {tr('home.first_screen.button_text')}
            </span>
          </Motion>
        </div>
      </div>
    </section>
  );
};
export default FirstScreen;
