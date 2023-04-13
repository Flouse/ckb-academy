import { JSX } from 'solid-js';
import { TranslateResource } from '~/types/index';

export type TermContent = () => Promise<{ default: JSX.Element }>;

export interface Term {
  to?: string;
  content: TermContent;
  contentTranslate?: TranslateResource<TermContent>;
}

export type Terms = Record<string, Term>;
