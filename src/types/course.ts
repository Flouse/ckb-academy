import { Component } from 'solid-js';
import { MDXComponent } from 'solid-mdx/client';
import { TranslateResource } from '~/types';

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

export interface Course {
  id: string;
  name: string;
  description: string;
  author: CourseAuthor[];
  type: CourseType;
  source: CourseSource;
  updateTime: string;
  coverPicture?: string;
  url?: string;
  chapters?: CourseChapter[];
  store?: () => CourseStore<any>;
  nameTranslate?: TranslateResource<string>;
  descriptionTranslate?: TranslateResource<string>;
}

export interface CourseStore<S> {
  get state(): S;

  updateState: (state: S) => void;
}

export interface CourseChapter {
  id: string;
  title: string;
  triggerReward?: boolean;
  manualCompletion?: boolean;
  article: () => Promise<{ default: MDXComponent }>;
  titleTranslate?: TranslateResource<string>;
  articleTranslate?: TranslateResource<Component>;
}
