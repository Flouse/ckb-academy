import { Component, createEffect } from 'solid-js';
import '~/assets/css/github-code.css';
import { default as highlight } from 'highlight.js';
import { innerHTML } from 'solid-js/web';

interface Props {
  code: string;
  class?: string;
  language?: string;
}

const HighlightCode: Component<Props> = (props) => {
  let codeRef: HTMLElement | undefined;

  createEffect(() => {
    if (codeRef) {
      const langs = props.language ? [props.language] : undefined;
      innerHTML(codeRef, highlight.highlightAuto(props.code, langs)._emitter.toHTML());
    }
  });

  return (
    <pre
      classList={{ [props?.class || '']: props.class != undefined }}
      class="bg-light-tertiary/10 dark:bg-black/50 rounded-lg p-4"
    >
      <code ref={codeRef} />
    </pre>
  );
};

export default HighlightCode;
