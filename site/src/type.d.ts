import { WebContainer } from '@webcontainer/api';

declare module '*.mdx';
declare module '*.json';

declare global {
  interface Window {
    webContainer?: WebContainer;
    MonacoEnvironment: {
      getWorker: (_moduleId: unknown, label: string) => Worker;
    };
  }
}
