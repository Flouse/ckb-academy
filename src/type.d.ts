declare module '*.mdx';
declare module '*.json';

interface Window {
  MonacoEnvironment: {
    getWorker: (_moduleId: unknown, label: string) => Worker;
  };
}
