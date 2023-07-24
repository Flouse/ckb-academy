import { Component, onCleanup, Show } from 'solid-js';

import createCodemirror from '../codemirror/createCodemirror';
import { FileState, getFileType, isFilePath } from '~/components/Playground/FileState';
import { Text } from '@codemirror/state';

interface Props {
  fileState: FileState;
}

export const FileEditor: Component<Props> = (props) => {
  const { view } = createCodemirror({
    language: getFileType(props.fileState.path),
    startingDoc: props.fileState.doc,
    rootClass: 'h-full w-full',
    onUpdate: (doc: Text) => {
      props.fileState.setDoc(doc);
    },
  });

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      props.fileState.save();
    }
  }

  onCleanup(() => {
    view.destroy();
  });

  return (
    <Show when={isFilePath(props.fileState.path)} fallback={<div>Not Supported</div>}>
      <div class="overflow-hidden h-full" onKeyDown={onKeyDown}>
        {view.dom}
      </div>
    </Show>
  );
};
