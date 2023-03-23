import { Component } from 'solid-js';
import { MDXComponent } from 'solid-mdx/client';
import { LangsEnum } from '~/common/constants/site-basic';

export interface CourseAuthor {
  name: string;
  avatar?: string;
}

export enum CourseType {
  Interactive,
  Article,
  Video,
}

export enum CourseSource {
  Local,
  Community,
}

export interface ICourse {
  id: string;
  name: string;
  description: string;
  author: CourseAuthor[];
  type: CourseType;
  source: CourseSource;
  updateTime: string;
  coverPicture?: string;
  url?: string;
  chapters?: ICourseChapterMeta[];
  store?: () => ICourseStore<any>;
}

export interface ICourseMeta extends ICourse {
  nameTranslate?: TranslateResource<string>;
  descriptionTranslate?: TranslateResource<string>;
}

export interface ICourseStore<S> {
  get state(): S;

  setState: (state: S) => void;
}

export interface ICourseChapter {
  id: string;
  title: string;
  triggerReward?: boolean;
  manualCompletion?: boolean;
  article: () => Promise<{ default: MDXComponent }>;
}

export interface ICourseChapterMeta extends ICourseChapter {
  titleTranslate?: TranslateResource<string>;
  articleTranslate?: TranslateResource<Component>;
}

type TranslateResource<T> = {
  [key in LangsEnum]?: T;
};
