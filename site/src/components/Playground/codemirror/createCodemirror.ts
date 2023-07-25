import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { Compartment, Extension, StateField, Text } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { FileType } from '~/components/Playground/FileState';
import { createEffect, useContext } from 'solid-js';
import { AppContext } from '~/AppContext';
import { defaultDark } from '~/components/Playground/codemirror/defaultDark';
import { defaultLight } from '~/components/Playground/codemirror/defaultLight';

const languageExtensions: { [Language in FileType]: () => Extension } = {
  js: () => javascript(),
  ts: () => javascript({ typescript: true }),
  jsx: () => javascript({ jsx: true }),
  tsx: () => javascript({ jsx: true, typescript: true }),
  css: () => css(),
  json: () => json(),
  html: () => html(),
  astro: () => html(),
  md: () =>
    markdown({
      codeLanguages: languages,
      defaultCodeLanguage: javascript({ jsx: true, typescript: true }),
      base: markdownLanguage,
    }),
};

interface Options {
  language: FileType;
  rootClass?: string;
  startingDoc: string;
  onUpdate?: (text: Text) => void;
}

const createCodemirror = (options: Options) => {
  const languageExtension = languageExtensions[options.language]();
  const context = useContext(AppContext);
  const themeCompartment = new Compartment();
  const extensions = [
    basicSetup,
    languageExtension,
    EditorView.editorAttributes.of({
      class: options?.rootClass ?? '',
    }),
    themeCompartment.of(defaultLight),
    StateField.define({
      create: () => null,
      update: (_, transaction) => {
        if (transaction.docChanged) {
          options.onUpdate?.(transaction.newDoc);
        }
        return null;
      },
    }),
  ];
  const view = new EditorView({
    extensions,
    doc: options.startingDoc,
  });

  createEffect(() => {
    const effect = themeCompartment.reconfigure(context.isDark ? defaultDark : defaultLight);
    view.dispatch({ effects: [effect] });
  });

  return { view };
};
export default createCodemirror;
