import { Component } from 'solid-js';
import NavBar from '~/components/Header/NavBar';
import Preference from '~/components/Header/Preference';
import SmallScreenNav from '~/components/Header/SmallScreenNav';
import Logo from '~/components/Header/Logo';

const Index: Component = () => {
  return (
    <div class="sticky top-0 z-10 bg-light-background dark:bg-dark-background_dark w-full px-10 shadow-xl shadow-light-shadow dark:shadow-dark-shadow">
      <div class="container mx-auto flex items-center h-28">
        <div class="flex-none">
          <Logo />
        </div>
        <div class="flex-auto hidden lg:flex items-center">
          <div class="flex-auto">
            <NavBar />
          </div>
          <div class="flex-none">
            <Preference />
          </div>
        </div>
        <div class="lg:hidden flex-auto flex justify-end items-center">
          <SmallScreenNav />
        </div>
      </div>
    </div>
  );
};

export default Index;
