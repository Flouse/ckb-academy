import { Component } from 'solid-js';
import { CourseContext, useCourseContext } from '~/components/Course/CourseContext';

const Exercises: Component = () => {
  const context = useCourseContext(CourseContext);
  return (
    <div class="px-10 py-10">
      <p>
        To complete this chapter, you need to enter the answer in the input box below and confirm
        whether the calculation result is correct.
      </p>

      <input
        class="bg-light-divider/5 px-4 py-2 rounded mt-6 font-bold placeholder:font-normal"
        placeholder="please enter your result"
      />

      <div class="button mt-6">Run Store function</div>

      <div onClick={() => context.finishChapter()} class="button mt-6">
        Confirm
      </div>
    </div>
  );
};

export default Exercises;
