import { ParentComponent } from 'solid-js';

const Quote: ParentComponent = (props) => {
  return (
    <div
      class="not-prose my-10  relative grid gap-4 rounded-lg text-sm text-light-tertiary dark:text-dark-tertiary dark:bg-dark-tertiary/5 bg-light-tertiary/5 px-16 py-10 before:content-['“'] after:content-['”']
      before:font-bold before:text-6xl before:absolute before:left-5 before:top-5 before:font-serif before:text-light-headline/20 dark:before:text-dark-headline/20
      after:font-bold after:text-6xl after:absolute after:right-5 after:bottom-0 after:font-serif after:text-light-headline/20 dark:after:text-dark-headline/20
      "
    >
      {props.children}
    </div>
  );
};

export default Quote;
