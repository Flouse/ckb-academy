import { Component, createMemo, createSignal, For, Show } from 'solid-js';
import { FileState, isFilePath } from '~/components/Playground/FileState';
import { FileSystemState } from '~/components/Playground';
import { BiRegularChevronDown, BiRegularChevronRight } from 'solid-icons/bi';

const FolderTree: Component<{
  folderPath?: string;
  list: FileState[];
  fileSystem: FileSystemState;
  deep: number;
}> = (props) => {
  type Folder = {
    folderPath: string;
    files: FileState[];
  };

  const [unfoldFolder, setUnfoldFolder] = createSignal(false);

  const folderName = () => {
    if (props.folderPath) {
      const pieces = props.folderPath.split('/');
      return pieces[pieces.length - 1];
    }
  };

  const getUnfoldFolder = createMemo(() => {
    return folderName() == undefined ? true : unfoldFolder();
  });

  const list = createMemo<Array<FileState | Folder>>(() => {
    const folders: {
      [folderPath: string]: FileState[];
    } = {};
    const fileList: FileState[] = [];
    for (const file of props.list) {
      const subPath = props.folderPath ? file.path.replace(props.folderPath + '/', '') : file.path;
      const firstSlash = subPath.indexOf('/');
      if (firstSlash === -1) {
        fileList.push(file);
      } else {
        const subFolder = subPath.substring(0, firstSlash);
        const folderPath = props.folderPath ? `${props.folderPath}/${subFolder}` : subFolder;
        folders[folderPath] = folders[folderPath] ? [...folders[folderPath], file] : [file];
      }
    }
    const folderList: Folder[] = Object.keys(folders).map((path) => ({
      folderPath: path,
      files: folders[path],
    }));
    return [...folderList, ...fileList];
  });

  const fileClicked = (file: FileState) => {
    if (isFilePath(file.path)) {
      file.open();
      props.fileSystem.setCurrentFileId(file.id);
    }
  };

  return (
    <>
      {folderName() ? (
        <div
          class="px-4 py-1 cursor-pointer"
          onClick={() => {
            setUnfoldFolder(!unfoldFolder());
          }}
        >
          <span
            class="flex justify-start items-center"
            style={{ 'padding-left': `${(props.deep - 1) * 24}px` }}
          >
            <i class="mr-2">
              {unfoldFolder() ? <BiRegularChevronDown /> : <BiRegularChevronRight />}
            </i>
            {folderName()}
          </span>
        </div>
      ) : null}
      <Show when={getUnfoldFolder()}>
        <ul>
          <For each={list()}>
            {(item) =>
              'path' in item ? (
                <li
                  class="px-4 py-1 cursor-pointer"
                  classList={{
                    'bg-light-hover dark:bg-dark-hover': props.fileSystem.currentFileId == item.id,
                  }}
                  onClick={() => fileClicked(item)}
                >
                  <span style={{ 'padding-left': `${props.deep * 24}px` }}>
                    {item.path.replace(props.folderPath + '/', '')}
                  </span>
                </li>
              ) : (
                <FolderTree
                  folderPath={item.folderPath}
                  list={item.files}
                  fileSystem={props.fileSystem}
                  deep={props.deep + 1}
                />
              )
            }
          </For>
        </ul>
      </Show>
    </>
  );
};

const TreeView: Component<{ fileSystem: FileSystemState }> = (props) => {
  return <FolderTree deep={0} list={props.fileSystem.fileList} fileSystem={props.fileSystem} />;
};

export default TreeView;
