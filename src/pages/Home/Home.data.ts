import { RouteDataFunc } from '@solidjs/router';
import { IBaseLink } from '~/types/interfaces';

export interface IHomeData {
  contributors: IBaseLink[];
}

export const HomeData: RouteDataFunc<unknown, IHomeData> = () => {
  const contributors: IBaseLink[] = [
    {
      title: 'Retric',
      to: 'https://github.com/RetricSu',
    },
    {
      title: 'Jason',
      to: 'https://github.com/GitOfJason',
    },
  ];

  return {
    get contributors() {
      return contributors;
    },
  };
};
