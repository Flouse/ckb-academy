import { Component, onMount } from 'solid-js';
import '~/assets/css/github-code.css';
import { default as highlight } from 'highlight.js';

interface Props {
  code: string;
}

const HighlightCode: Component<Props> = (props) => {
  let codeRef: HTMLElement | ((el: HTMLElement) => void) | undefined;

  onMount(() => {
    highlight.highlightElement(codeRef as HTMLElement);
  });
  return (
    <pre class="bg-light-tertiary/10 dark:bg-black/50 rounded-lg">
      <code ref={codeRef}>{props.code}</code>
    </pre>
  );
};

export default HighlightCode;
