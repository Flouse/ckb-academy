import { createSignal } from 'solid-js';
import { Text } from '@codemirror/state';

export const fileTypes = ['ts', 'js', 'tsx', 'jsx', 'json', 'md', 'html', 'css', 'astro'] as const;
export type FileType = (typeof fileTypes)[number];

export type FilePath = `${string}.${FileType}` | string;

export function isFilePath(path: string): path is FilePath {
  return fileTypes.some((type) => path.endsWith(`.${type}`));
}

export function getFileType(path: FilePath): FileType {
  const parts = path.split('.');
  return parts[parts.length - 1] as FileType;
}

export type FileData = Readonly<{
  id: string;
  doc: string;
  path: string;
  fileName: string;
  opened: boolean;
}>;

export function createFileState({ id, doc, path, opened, fileName }: FileData) {
  const [getDocument, setDocument] = createSignal(doc);
  const [getCompareDoc, setCompareDoc] = createSignal(doc);
  const [getPath] = createSignal(path);
  const [getName] = createSignal(fileName);
  const [getOpened, setOpened] = createSignal(opened);
  const [saved, setSaved] = createSignal(0);
  const [edited, setEdited] = createSignal(false);
  const save = () => {
    setSaved(Date.now());
    setEdited(false);
    setCompareDoc(getDocument());
  };

  return {
    get doc() {
      return getDocument();
    },
    get path() {
      return getPath();
    },

    get name() {
      return getName();
    },
    get opened() {
      return getOpened();
    },
    get saved() {
      return saved();
    },
    get edited() {
      return edited();
    },
    id,
    save,
    close() {
      setOpened(false);
    },
    open() {
      setOpened(true);
    },
    setDoc(newDoc: Text) {
      const string = newDoc.sliceString(0);
      setEdited(string !== getCompareDoc());
      setDocument(string);
    },
  };
}

export type FileState = ReturnType<typeof createFileState>;
