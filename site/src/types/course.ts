import { Component, JSX } from 'solid-js';
import { MDXComponent } from 'solid-mdx/client';
import { Contributor, TranslateResource } from '~/types';

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
  subtitle?: string;
  description: (() => JSX.Element) | string;
  author: Contributor[];
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

export type AnnotationContent = () => Promise<{ default: JSX.Element }>;

export interface Annotation {
  url?: string;
  content: AnnotationContent;
  contentTranslate?: TranslateResource<AnnotationContent>;
}
