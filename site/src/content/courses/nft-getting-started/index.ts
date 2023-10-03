import { Course, CourseSource, CourseType } from '~/types/course';
import { contributorsData } from '~/data/contributors.data';

const nftQuickStart: Course = {
  id: 'nft-getting-started',
  author: [
    // see https://github.com/RetricSu/zero2ckb-web/graphs/contributors
    contributorsData.JordanMack,
  ],
  name: 'Getting Started With NFTs',
  coverPicture: '/images/course/lesson3.png',
  type: CourseType.Article,
  source: CourseSource.Local,
  updateTime: '2023/09/30',
  description:
    'Learn about the different types of NFT standards that are used in the Nervos ecosystem, and find out what you need to start building with NFTs in your dapps.',
  chapters: [
    {
      id: 'chapter_1',
      title: 'Introduction',
      article: () => import('./chapter_1.mdx'),
    },
    {
      id: 'chapter_2',
      title: 'Standards Introduction',
      article: () => import('./chapter_2.mdx'),
    },
    {
      id: 'chapter_3',
      title: 'CoTA Strengths and Use Cases',
      article: () => import('./chapter_3.mdx'),
    },
    {
      id: 'chapter_4',
      title: 'Spore Strengths and Use Cases',
      article: () => import('./chapter_4.mdx'),
    },
    {
      id: 'chapter_5',
      title: 'Comparing Standards',
      article: () => import('./chapter_5.mdx'),
    },
    {
      id: 'chapter_6',
      title: 'Next Steps',
      article: () => import('./chapter_6.mdx'),
    },
  ],
};

export default nftQuickStart;
