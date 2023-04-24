import { Annotation } from '~/types/course';

export const keywordAnnotationList: Record<string, Annotation> = {
  ckb: {
    url: 'https://docs.nervos.org/docs/basics/glossary/#ckb',
    content: () => import('./ckb.mdx'),
  },
  cell: {
    url: 'https://docs.nervos.org/docs/basics/glossary/#cell',
    content: () => import('./cell.mdx'),
  },
  'ckb-vm': {
    url: 'https://docs.nervos.org/docs/basics/glossary/#ckb-vm',
    content: () => import('./ckb-vm.mdx'),
  },
};
