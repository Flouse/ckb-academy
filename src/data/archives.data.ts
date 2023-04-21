import { Archive, ArchiveCategory } from '~/types/library';
import { contributorsData } from '~/data/contributors.data';

export const archives: Array<Archive> = [
  {
    id: '6f5f82fcd2417b92',
    title: 'Nervos CKB Official Docs',
    description: 'The most authoritative official guide',
    category: ArchiveCategory.Article,
    cover: '/images/archive-covers/official-docs.png',
    recommended: true,
    author: [contributorsData.NervosNetwork],
    url: 'https://docs.nervos.org/',
  },
  {
    id: '8435be4e3354b78e',
    title: 'Nervos Network RFCs',
    description: 'This is a set of proposals, standards, and documentation related to Nervos Network.',
    recommended: true,
    cover: '/images/archive-covers/ckb-rfcs.png',
    category: ArchiveCategory.Article,
    author: [contributorsData.NervosNetwork],
    url: 'https://github.com/nervosnetwork/rfcs',
  },

  {
    id: '72612720829c3207',
    title: 'Nervos CKB Glossary',
    description: 'The most comprehensive CKB ecological vocabulary',
    category: ArchiveCategory.Article,
    cover: '/images/archive-covers/ckb-glossary.png',
    author: [contributorsData.NervosNetwork],
    url: 'https://docs.nervos.org/docs/basics/glossary',
  },

  {
    id: '9d0b9bbfbc7c6663',
    title: 'Cryptape Blog',
    description: 'Get the latest scoop on all things blockchain',
    category: ArchiveCategory.Blog,
    cover: '/images/archive-covers/cryptape-blog.png',
    author: [contributorsData.NervosNetwork],
    url: 'https://blog.cryptape.com/',
  },

  {
    id: '01ad7c82aef1f0b9',
    title: 'Breaking the Security-Performance Tradeoff in Nakamoto Consensu',
    description:
      'An extended presentation by Dr. Ren Zhang elaborates on the innovative features of NC-Max',
    category: ArchiveCategory.Video,
    cover: '/images/archive-covers/consensus.png',
    author: [contributorsData.NervosNetwork],
    url: 'https://blog.cryptape.com/lay-down-the-common-metrics-evaluating-proof-of-work-consensus-protocols-security',
  },

  {
    id: '634fc4e9aff9557f',
    title: 'Nervos CKB - Consensus Mechanism',
    description:
      'Dr. Ren Zhang explains the design logic of Nervos consensus protocol — NC-Max, a variant of Nakamoto Consensus with higher throughput.',
    category: ArchiveCategory.Video,
    cover: '/images/archive-covers/consensus.png',
    author: [contributorsData.NervosNetwork],
    url: 'https://www.youtube.com/watch?v=HSXzbgVRH_M&list=PLRke1-EE4VWFMz-7sMYURt6woRLqmkDR6&index=6',
  },
  {
    id: 'f7e0fd7058b24818',
    title: 'Three Major Innovations in NC-Max',
    description: 'An exploration into the three major innovations in NC-Max',
    category: ArchiveCategory.Video,
    cover: '/images/archive-covers/consensus.png',
    author: [contributorsData.NervosNetwork],
    url: 'https://www.youtube.com/watch?v=79vjzBXIb_g',
  },
  {
    id: '93c11336ddd42c23',
    title: 'ZKPodcast: Testing PoW Consensus Algorithm Security with Ren Zhang from Nervos',
    description:
      'A podcast session hosted by ZKPoscast where Dr. Zhang Ren chats about an earlier work he did on evaluating PoW consensus protocol security and explore his more recent work on NC-Max.',
    category: ArchiveCategory.Video,
    cover: '/images/archive-covers/consensus.png',
    author: [contributorsData.NervosNetwork],
    url: 'https://www.youtube.com/watch?v=iJK_6BbLTAc',
  },
];
