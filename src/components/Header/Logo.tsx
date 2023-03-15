import { Component } from 'solid-js/types/render/component';
import { NavLink } from '@solidjs/router';
import './NavBar.css';
import { BiSolidLeftArrow } from 'solid-icons/bi';

const Logo: Component = () => {
  return (
    <div class="flex items-center mr-24">
      <NavLink
        href="/"
        class="flex-none text-light-headline dark:text-dark-headline text-2xl font-bold flex items-center"
      >
        <img alt={'logo'} src="/images/logo.png" width={46} class="mr-4" />
        <span
          class="bg-clip-text text-transparent bg-gradient-to-tl 
          from-light-headline dark:from-dark-headline dark:to-dark-tertiary to-light-tertiary"
        >
          CKB • SCHOOL
        </span>
      </NavLink>
      <div
        class="relative pl-1 pr-1.5 py-0.5 ml-4 flex items-center text-warning text-xs 
        rounded bg-gradient-to-r from-warning to-error"
      >
        <BiSolidLeftArrow class="absolute -left-1.5" />
        <span class="text-white">Building</span>
      </div>
    </div>
  );
};

export default Logo;
