import {
  Component,
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  splitProps,
  useContext,
} from 'solid-js';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import { AppContext } from '~/AppContext';

window.MonacoEnvironment = {
  getWorker: function (_moduleId: unknown, label: string) {
    switch (label) {
      case 'css':
        return new cssWorker();
      case 'json':
        return new jsonWorker();
      case 'typescript':
      case 'javascript':
        return new tsWorker();
      default:
        return new editorWorker();
    }
  },
};

type CodeEditorOption = {
  value: string;
  onChange: (value: string) => void;
  class?: string;
} & monaco.editor.IStandaloneEditorConstructionOptions;

const lightTheme: monaco.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: {
    'scrollbar.shadow': '#00000000',
    'editor.background': '#00000000',
    'editor.lineHighlightBackground': '#d5dae1',
  },
};

const darkTheme: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: {
    'scrollbar.shadow': '#00000000',
    'editor.background': '#00000000',
  },
};

monaco.editor.defineTheme('light', lightTheme);
monaco.editor.defineTheme('dark', darkTheme);

export const CodeEditor: Component<CodeEditorOption> = (props) => {
  let ref: HTMLElement | any;

  const [editor, setEditor] = createSignal<monaco.editor.IStandaloneCodeEditor>();
  const appContext = useContext(AppContext);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  props = mergeProps(
    {
      automaticLayout: true,
      lineNumbers: 'off',
      minimap: {
        enabled: false,
      },
    },
    props,
  );
  const [local, others] = splitProps(props, ['class']);

  onMount(() => {
    const _editor = monaco.editor.create(ref as HTMLElement, others);
    _editor.onDidChangeModelContent(() => {
      props.onChange(_editor.getValue());
    });
    setEditor(_editor);
  });

  createEffect(() => {
    editor()?.updateOptions({
      theme: appContext.isDark ? 'dark' : 'light',
    });
  });

  onCleanup(() => {
    editor()?.dispose();
  });

  return (
    <div
      class="py-4 rounded-lg bg-light-tertiary/10 dark:bg-dark-background_dark"
      classList={{ [`${local?.class ?? ''}`]: local.class != undefined }}
    >
      <div ref={ref} class="h-full" />
    </div>
  );
};

export default CodeEditor;
