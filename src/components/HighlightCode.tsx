import { Component, onMount } from 'solid-js';
import '~/assets/css/github-code.css';
import { default as highlight } from 'highlight.js';

interface IProps {
  code: string;
}

const HighlightCode: Component<IProps> = (props) => {
  onMount(() => {
    document.querySelectorAll('pre code').forEach((el) => {
      highlight.highlightElement(el as HTMLElement);
    });
  });
  return (
    <pre class="bg-light-tertiary/10 dark:bg-black/50 rounded-lg">
      <code class="">{props.code}</code>
    </pre>
  );
};

export default HighlightCode;
