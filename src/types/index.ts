import { LangsEnum } from '~/common/constants/site-basic';

export interface Contributor {
  name: string;
  avatar?: string;
}
export interface BaseLink {
  title: string;
  to: string;
  target?: '_blank' | '_top' | '_parent' | '_self';
}

export type TranslateResource<T> = {
  [key in LangsEnum]?: T;
};
