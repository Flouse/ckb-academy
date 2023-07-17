import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import Markdown from 'vite-plugin-solid-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import rehypeHighlight from 'rehype-highlight';

export default defineConfig({
  plugins: [
    Markdown({
      remarkPlugins: [remarkGfm, remarkDirective, remarkDirectiveRehype],
      rehypePlugins: [rehypeHighlight],
    }),
    solid({ ssr: false, extensions: ['.mdx', '.md'] }),
  ],
  ssr: {
    external: ['monaco-editor'],
  },
  server: {
    open: process.env.NODE_ENV === 'development',
  },
  optimizeDeps: {
    entries: ['./src/**/*.{js,jsx,ts,tsx,mdx,md}'],
    exclude: ['solid-mdx'],
  },
});
