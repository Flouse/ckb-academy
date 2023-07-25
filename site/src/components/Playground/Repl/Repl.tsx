import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { debounce } from '@solid-primitives/scheduled';
import {
  createEffect,
  createMemo,
  createSignal,
  on,
  onCleanup,
  onMount,
  useContext,
} from 'solid-js';
import 'xterm/css/xterm.css';
import { DirectoryEntry, FileSystemTree, WebContainer } from '@webcontainer/api';
import { FileSystemState } from '~/components/Playground';
import { FileState } from '~/components/Playground/FileState';
import { AppContext } from '~/AppContext';

interface Props {
  fileSystem: FileSystemState;
}

function treeFromFiles(files: FileState[]): FileSystemTree {
  const tree = {} as FileSystemTree;

  for (const file of files) {
    const pieces = file.path.split('/');
    let segment = tree;
    for (let i = 0; i < pieces.length - 1; i++) {
      const piece = pieces[i];
      if (!segment[piece]) {
        const x = { directory: {} };
        segment[piece] = x;
        segment = x.directory;
      } else {
        segment = (segment[piece] as DirectoryEntry).directory;
      }
    }
    segment[pieces[pieces.length - 1]] = {
      file: { contents: file.doc },
    };
  }
  return tree;
}

const terminalDarkTheme = {
  foreground: 'rgb(226,227,238)',
  background: 'rgba(0,0,0,0)',
  cursor: 'white',
};
const terminalLightTheme = {
  foreground: 'rgb(46,46,49)',
  background: 'rgba(0,0,0,0)',
  cursor: 'black',
};

export function Repl(props: Props) {
  const [lastUpdated, setLastUpdated] = createSignal(0);
  const context = useContext(AppContext);

  const terminal = new Terminal({});
  const fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);

  const debouncedFit = debounce(() => fitAddon.fit(), 17);
  const resizeObserver = new ResizeObserver(() => debouncedFit());

  const [container, setContainer] = createSignal<WebContainer>();

  let currentFiles: { [path: string]: string } = {};

  createEffect(() => {
    terminal.options.theme = context.isDark ? terminalDarkTheme : terminalLightTheme;
  });

  onCleanup(() => {
    resizeObserver.disconnect();
    fitAddon.dispose();
    terminal.dispose();
  });

  async function loadFiles(files: FileState[]) {
    if (container()) {
      const tree = treeFromFiles(files);
      await container()?.mount(tree);
    }
  }

  async function runJshCommand() {
    const shellProcess = await container()?.spawn('jsh');
    void shellProcess?.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      }),
    );
    const input = shellProcess?.input.getWriter();
    terminal.onData((data) => {
      input?.write(data);
    });
  }

  function updateCurrentFiles() {
    currentFiles = Object.fromEntries(
      props.fileSystem.fileList.map((file) => [file.path, file.doc]),
    );
  }

  const savedFiles = createMemo(() =>
    props.fileSystem.fileList.filter((file) => file.saved > lastUpdated()),
  );

  async function diffAndReload() {
    if (props.fileSystem.isEmpty || !container()) {
      return;
    }
    const toUpdate = props.fileSystem.fileList.filter(
      (file) => !currentFiles[file.path] || currentFiles[file.path] !== file.doc,
    );

    updateCurrentFiles();
    setLastUpdated(Date.now());
    await loadFiles(toUpdate);
  }

  createEffect(on([() => props.fileSystem, savedFiles, container], diffAndReload));

  onMount(async () => {
    if (window.webContainer) {
      setContainer(window.webContainer);
    } else {
      window.webContainer = await WebContainer.boot();
      setContainer(window.webContainer);
    }
    void runJshCommand();
    updateCurrentFiles();
    setLastUpdated(Date.now());
  });

  return (
    <div
      class="px-4 py-4"
      ref={(el) => {
        terminal.open(el);
        fitAddon.fit();
        resizeObserver.observe(el);
      }}
    />
  );
}
