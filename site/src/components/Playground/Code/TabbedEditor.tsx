import { FileSystemState } from '~/components/Playground';
import { Component, createEffect, createMemo, For, Show, on } from 'solid-js';
import { FileState } from '~/components/Playground/FileState';
import { FileEditor } from '~/components/Playground/Code/FileEditor';
import TreeView from '~/components/Playground/Code/TreeView';

interface Props {
  fileSystem: FileSystemState;
}

export const TabbedEditor: Component<Props> = (props) => {
  const openedFiles = createMemo<FileState[]>(() => {
    return props.fileSystem.fileList.filter((file) => file.opened);
  });

  createEffect(
    on(openedFiles, (files, prevFiles) => {
      if (
        prevFiles &&
        files.length < prevFiles.length &&
        files.length >= 1 &&
        !files.find((f) => f.id === props.fileSystem.currentFileId)
      ) {
        const index = prevFiles.findIndex((file) => file.id === props.fileSystem.currentFileId);
        props.fileSystem.setCurrentFileId(files[index > 0 ? index - 1 : 0].id);
      }
    }),
  );

  function tabClicked(fileId: string) {
    if (props.fileSystem.currentFileId === fileId) {
      return;
    } else {
      props.fileSystem.setCurrentFileId(fileId);
    }
  }

  return (
    <div class="flex">
      <div class=" flex-none w-60 py-2 overflow-auto">
        <TreeView fileSystem={props.fileSystem} />
      </div>
      <div class="flex-auto flex flex-col overflow-hidden border-l border-light-divider dark:border-dark-divider">
        <div class='flex-none flex relative overflow-x-auto before:absolute before:w-full z-10 before:left-0 before:bottom-0 before:h-[1px] dark:before:bg-dark-divider before:bg-light-divider before:content-[""]'>
          <For each={openedFiles()}>
            {(fileState) => {
              return (
                <TabListItem
                  pathName={fileState.name}
                  selected={props.fileSystem.currentFileId == fileState.id}
                  closeable={openedFiles().length > 1}
                  tabClicked={() => tabClicked(fileState.id)}
                  edited={fileState.edited}
                  closeClicked={() =>
                    props.fileSystem.fileList.find((f) => f.id === fileState.id)?.close()
                  }
                />
              );
            }}
          </For>
        </div>
        <For each={props.fileSystem.fileList}>
          {(fileState) => (
            <Show when={fileState.id === props.fileSystem.currentFileId}>
              <FileEditor fileState={fileState} />
            </Show>
          )}
        </For>
      </div>
    </div>
  );
};

const TabListItem: Component<{
  pathName?: string;
  selected: boolean;
  tabClicked?: () => void;
  closeClicked: () => void;
  closeable: boolean;
  edited: boolean;
}> = (props) => {
  function mouseDown(e: MouseEvent) {
    e.preventDefault();
  }

  return (
    <div
      class="px-4 py-4 flex items-center justify-center relative"
      classList={{
        'font-medium before:absolute before:w-full before:rounded-lg before:left-0 before:bottom-0 before:h-[3px] before:bg-primary before:content-[""]':
          props.selected,
      }}
    >
      <Show when={props.edited}>
        <div class="mr-2">*</div>
      </Show>
      <button
        role="tab"
        class="whitespace-nowrap"
        aria-selected={props.selected}
        onClick={props.tabClicked}
      >
        {props.pathName}
      </button>
      <Show when={props.closeable}>
        <button class="ml-2" onClick={props.closeClicked} onMouseDown={mouseDown}>
          ✕
        </button>
      </Show>
    </div>
  );
};
