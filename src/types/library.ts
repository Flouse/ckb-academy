import { Contributor, TranslateResource } from '~/types/index';

export enum ArchiveCategory {
  Article = 'article',
  Video = 'video',
  Blog = 'blog',
}

export enum ArchiveGroup {
  Recommended = 'recommended',
  Favorite = 'favorite',
}

export interface Archive {
  id: string;
  title: string;
  description: string;
  author: Contributor[];
  category: ArchiveCategory;
  recommended?: boolean;
  url?: string;
  cover?: string;
  titleTranslate?: TranslateResource<string>;
  descriptionTranslate?: TranslateResource<string>;
}
