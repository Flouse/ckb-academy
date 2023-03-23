import { LangsEnum } from '~/common/constants/site-basic';

export interface BaseLink {
  title: string;
  to: string;
  target?: '_blank' | '_top' | '_parent' | '_self';
}

export type TranslateResource<T> = {
  [key in LangsEnum]?: T;
};
