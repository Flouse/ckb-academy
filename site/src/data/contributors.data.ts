import { Contributor } from '~/types';

enum Contributors {
  Jason,
  NervosNetwork,
  RetricSu,
  Ssslllsss,
  ChemaSsp,
  Xying21,
  Cryptape,
  Xxuejie,
  JordanMack,
}

export const contributorsData: Record<keyof typeof Contributors, Contributor> = {
  Jason: {
    name: 'Jason',
    avatar: 'https://avatars.githubusercontent.com/u/124339951?v=4',
  },
  NervosNetwork: {
    name: 'Nervos Network',
    avatar: 'https://pbs.twimg.com/profile_images/1339253102453657612/xig_PnCw_400x400.jpg',
  },
  RetricSu: {
    name: 'RetricSu',
    avatar: 'https://avatars.githubusercontent.com/u/23436060?v=4',
  },
  Ssslllsss: {
    name: 'ssslllsss',
    avatar: 'https://avatars.githubusercontent.com/u/64396829?v=4',
  },
  ChemaSsp: {
    name: 'ChemaESP',
    avatar: 'https://avatars.githubusercontent.com/u/107578801?v=4',
  },
  Xying21: {
    name: 'xying21',
    avatar: 'https://avatars.githubusercontent.com/u/77367387?v=4',
  },
  Cryptape: {
    name: 'Cryptape',
    avatar:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1640832062246/oh_gK6oio.png?w=200&h=200&fit=crop&crop=faces&auto=compress,format&format=webp',
  },
  Xxuejie: {
    name: 'Xuejie Xiao',
    avatar: 'https://avatars.githubusercontent.com/u/340446?v=4',
  },
  JordanMack: {
    name: 'Jordan Mack',
    avatar: 'https://avatars.githubusercontent.com/u/37931?v=4',
  },
};
