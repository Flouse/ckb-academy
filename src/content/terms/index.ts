import { Terms } from '~/types/term';

export const terms: Terms = {
  ckb: {
    to: 'https://docs.nervos.org/docs/basics/glossary/#ckb',
    content: () => import('./ckb.mdx'),
  },
  cell: {
    to: 'https://docs.nervos.org/docs/basics/glossary/#cell',
    content: () => import('./cell.mdx'),
  },
  'ckb-vm': {
    to: 'https://docs.nervos.org/docs/basics/glossary/#ckb-vm',
    content: () => import('./ckb-vm.mdx'),
  },
};
