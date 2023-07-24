import { createSignal } from 'solid-js';
import { createFileState, FileData, FileState } from '~/components/Playground/FileState';
import { createStore } from 'solid-js/store';

export type ProjectData = Readonly<{
  title: string;
  fs: FileSystemData;
}>;

export function createProjectState(data: ProjectData) {
  const [title] = createSignal(data.title);
  const [getFileSystem] = createSignal(createFileSystem(data?.fs));
  return {
    get title() {
      return title();
    },
    get fileSystem() {
      return getFileSystem();
    },
  };
}

export type ProjectsState = ReturnType<typeof createProjectState>;

export type FileSystemData = Readonly<{
  currentFileId?: string;
  readmeDoc?: string;
  files: FileData[];
}>;

export function createFileSystem(data?: FileSystemData) {
  const fromData = (data: FileSystemData) =>
    Object.fromEntries(
      data.files.map((file) => {
        return [file.id, createFileState(file)];
      }),
    );

  const [files] = createStore<{ [id: string]: FileState }>(data ? fromData(data) : {});

  const [currentFileId, setCurrentFileId] = createSignal<string | undefined>(
    data?.currentFileId || data?.files?.find((file) => file.opened)?.id,
  );

  return {
    get fileList(): FileState[] {
      return Object.values(files);
    },

    get isEmpty() {
      return Object.values(files).length === 0;
    },

    get readmeDoc() {
      return data?.readmeDoc ?? '';
    },

    get currentFileId() {
      return currentFileId();
    },

    setCurrentFileId,
  };
}

export type FileSystemState = ReturnType<typeof createFileSystem>;
