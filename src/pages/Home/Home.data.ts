import { RouteDataFunc } from '@solidjs/router';
import { BaseLink } from '~/types/index';

export interface HomeData {
  contributors: Contributor[];
}

interface Contributor extends BaseLink {
  avatar: string;
}

export const HomeData: RouteDataFunc<unknown, HomeData> = () => {
  const contributors: Contributor[] = [
    {
      title: 'Retric',
      to: 'https://github.com/RetricSu',
      avatar: 'https://avatars.githubusercontent.com/u/23436060?v=4',
    },
    {
      title: 'Jason',
      to: 'https://github.com/GitOfJason',
      avatar: 'https://avatars.githubusercontent.com/u/124339951?v=4',
    },
    {
      title: 'Flouse',
      to: 'https://github.com/Flouse',
      avatar: 'https://avatars.githubusercontent.com/u/1297478?v=4',
    },
  ];

  return {
    get contributors() {
      return contributors;
    },
  };
};
