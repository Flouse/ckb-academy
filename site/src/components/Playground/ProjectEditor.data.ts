import { createResource } from 'solid-js';
import { projects } from '~/data/playground.data';
import { FileData } from '~/components/Playground/FileState';
import { createProjectState } from '~/components/Playground/index';
import { createFileTreeFromRepo } from '~/components/Playground/createFileTreeToGit';
import { RouteDataFuncArgs } from '@solidjs/router/dist/types';

const REPO_PATH = 'GitOfJason/ckb-lab-playground-projects';

export const LoadProjectEditorData = ({ params }: RouteDataFuncArgs<unknown>) => {
  const [result] = createResource(
    () => params.id,
    async (id) => {
      const project = projects.find((item) => item.id === id);
      if (project == undefined) {
        throw new Error('Found not project');
      }
      const fileTree = await createFileTreeFromRepo(REPO_PATH, {
        subPath: project.repoSubPath,
      });
      const readmeDocName = 'README.md';
      const readmeDoc = fileTree.find((file) => file.name == readmeDocName)?.doc;
      const currentFileId =
        fileTree.find((file) => RegExp('index\\.(js|ts|tsx|jsx)$').test(file.path))?.path ?? '';
      const files: FileData[] = [];
      for (const file of fileTree) {
        if (file.path == readmeDocName) {
          continue;
        }
        files.push({
          path: file.path,
          doc: file.doc,
          opened: file.path == currentFileId,
          id: file.path,
          fileName: file.name,
        });
      }

      return createProjectState({
        title: project?.title ?? '',
        fs: { files: files, readmeDoc: readmeDoc, currentFileId: currentFileId },
      });
    },
  );

  return {
    get loading() {
      return result.loading;
    },
    get error() {
      return result.error;
    },
    get project() {
      return result();
    },
  };
};

export type ProjectEditorState = ReturnType<typeof LoadProjectEditorData>;
