import { RouteDataFunc } from '@solidjs/router';
import { IBaseLink } from '~/types/interfaces';

export interface IHomeData {
  contributors: IContributor[];
}

interface IContributor extends IBaseLink {
  avatar: string;
}

export const HomeData: RouteDataFunc<unknown, IHomeData> = () => {
  const contributors: IContributor[] = [
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
