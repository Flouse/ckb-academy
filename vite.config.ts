import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import Markdown from 'vite-plugin-solid-markdown';
import remarkGfm from 'remark-gfm';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import rehypeHighlight from 'rehype-highlight';

export default defineConfig({
  plugins: [
    Markdown({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    }),
    solid({ ssr: false, extensions: ['.mdx', '.md'] }),
  ],
  ssr: {
    external: ['monaco-editor'],
  },
});
