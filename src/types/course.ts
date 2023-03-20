import { Component } from 'solid-js';
import { MDXComponent } from 'solid-mdx/client';
import { LangsEnum } from '~/common/constants/site-basic';

export interface ICourseChapter {
  id: string;
  title: string;
  triggerReward?: boolean;
  exercise?: Component;
  article: () => Promise<{ default: MDXComponent }>;
}

export interface ICourseChapterMeta extends ICourseChapter {
  titleTranslate?: TranslateResource<string>;
  exerciseTranslate?: TranslateResource<() => Promise<{ default: MDXComponent }>>;
  articleTranslate?: TranslateResource<Component>;
}

export interface ICourse {
  id: string;
  name: string;
  description: string;
  author: string;
  coverPicture?: string;

  chapters: ICourseChapterMeta[];
}

export interface ICourseMeta extends ICourse {
  nameTranslate?: TranslateResource<string>;
  descriptionTranslate?: TranslateResource<string>;
}

type TranslateResource<T> = {
  [key in LangsEnum]?: T;
};
