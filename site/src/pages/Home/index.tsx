import { Component, ParentProps } from 'solid-js';
import FirstScreen from '~/pages/Home/FirstScreen';

import Course from '~/pages/Home/Course';
import Ecosystem from '~/pages/Home/Ecosystem';
import Contribute from '~/pages/Home/Contribute';

const Index: Component<ParentProps> = () => {
  return (
    <>
      <FirstScreen />
      <Course />
      <Ecosystem />
      <Contribute />
    </>
  );
};
export default Index;
