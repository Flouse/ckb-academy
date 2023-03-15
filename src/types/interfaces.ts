import { Component } from 'solid-js';

export interface IBaseLink {
  title: string;
  to: string;
  target?: '_blank' | '_top' | '_parent' | '_self';
}

export interface ICourseChapterMeta {
  id: string;
  title: string;
  triggerReward?: boolean;
  component: () => Component;
}

export interface ICourseMeta {
  id: string;
  name: string;
  description: string;

  chapters: ICourseChapterMeta[];
}
