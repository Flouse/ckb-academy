import {
  Accessor,
  batch,
  Component,
  createContext,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  ParentComponent,
  Resource,
  splitProps,
  useContext,
} from 'solid-js';
import { ICourse, ICourseChapter } from '~/types/course';
import { MDXComponent } from 'solid-mdx/client';
import { LangsEnum } from '~/common/constants/site-basic';
import { useI18n } from '@solid-primitives/i18n';
import { useToast } from '~/components/Toast/ToastContext';
import { CourseStore, EmptyCourseStore } from '~/components/Course/CourseStore';

export interface ICourseContext<T extends CourseStore<object>> {
  course: ICourse | undefined;
  chapters: ICourseChapter[];
  currentChapterId: Accessor<string>;
  setCurrentChapter: (chapter: ICourseChapter) => void;
  underWayChapter: Accessor<ICourseChapter | undefined>;
  underWayChapterId: Accessor<string>;
  chaptersCompletionStatus: Accessor<Record<string, boolean>>;
  finishChapter: () => void;
  canNextChapter: Accessor<boolean>;
  nextChapter: () => void;
  isUnderWayChapter: Accessor<boolean>;
  isLastChapter: Accessor<boolean>;
  loader?: Resource<{ article: MDXComponent; exercise: Component | undefined }>;
  store: T;
}

export const CourseContext = createContext<ICourseContext<CourseStore<object>>>({
  course: undefined,
  chapters: [],
  currentChapterId: () => '',
  setCurrentChapter: () => void 0,
  chaptersCompletionStatus: () => ({}),
  underWayChapter: () => undefined,
  underWayChapterId: () => '',
  isUnderWayChapter: () => false,
  finishChapter: () => void 0,
  canNextChapter: () => false,
  nextChapter: () => void 0,
  isLastChapter: () => false,
  store: new EmptyCourseStore(),
});

export function useCourseContext<T extends CourseStore<object>>() {
  return useContext(CourseContext) as ICourseContext<T>;
}

interface IProps {
  course: ICourse;
}

export const CourseProvider: ParentComponent<IProps> = (props) => {
  const [, { locale }] = useI18n();
  const toast = useToast();
  const [completionStatus, setCompletionStatus] = createSignal<Record<string, boolean>>({});
  const [underWayChapter, setUnderWayChapter] = createSignal<ICourseChapter>();
  const [currentChapter, setCurrentChapter] = createSignal<ICourseChapter>();

  const course = createMemo<ICourse>(() => props.course);
  const chapters = createMemo<ICourseChapter[]>(() =>
    course().chapters.map((chapter) => {
      const [local, others] = splitProps(chapter, [
        'titleTranslate',
        'articleTranslate',
        'exerciseTranslate',
      ]);
      const lang = locale() as LangsEnum;
      const title = local.titleTranslate?.[lang] ?? chapter.title;
      const article = local.articleTranslate?.[lang] ?? chapter.article;
      const exercise = local.exerciseTranslate?.[lang] ?? chapter.exercise;
      return { ...others, title, article, exercise } as ICourseChapter;
    }),
  );

  createEffect(() => {
    if (chapters()) {
      const first = chapters()[0];
      setUnderWayChapter(first);
      setCurrentChapter(first);
      const status: Record<string, boolean> = {};
      course().chapters.forEach((chapter) => (status[chapter.id] = false));
      setCompletionStatus(status);
    }
  });

  const [loader] = createResource(
    () => currentChapter(),
    async (chapter) => {
      const article = (await chapter.article()).default;
      const exercise = chapter.exercise;
      return { article, exercise };
    },
  );

  const store = createMemo(() => course().store?.());
  const currentChapterId = createMemo(() => currentChapter()?.id || '');
  const underWayChapterId = createMemo(() => underWayChapter()?.id || '');
  const isUnderWayChapter = createMemo(() => underWayChapter()?.id === currentChapterId());
  const underWayChapterIndex = createMemo(() =>
    chapters().findIndex((chapter) => chapter.id === underWayChapterId()),
  );
  const isLastChapter = createMemo(() => {
    return underWayChapterIndex() === chapters().length - 1;
  });
  const isCompleted = createMemo(() => !Object.values(completionStatus()).includes(false));

  const finishChapter = () => {
    if (isUnderWayChapter()) {
      const status = { ...completionStatus() };
      status[underWayChapterId()] = true;
      setCompletionStatus(status);
    }
  };

  const canNext = () => {
    return (
      isUnderWayChapter() &&
      (underWayChapter()?.exercise == undefined || completionStatus()[underWayChapterId()])
    );
  };

  const nextChapter = () => {
    if (!canNext()) return;
    if (underWayChapter()?.exercise === undefined) {
      finishChapter();
    }
    const index = underWayChapterIndex();
    if (index >= 0) {
      const nextIndex = index + 1;
      if (nextIndex === chapters().length) {
        setUnderWayChapter(undefined);
      } else {
        const chapter = chapters()[nextIndex];
        batch(() => {
          setUnderWayChapter(chapter);
          setCurrentChapter(chapter);
        });
      }
    }

    if (isCompleted()) {
      toast.success({
        title: '💐 Completed this course',
        duration: 4000,
        description: 'you can also try more interesting courses.',
      });
    }
  };

  const context: ICourseContext<any> = {
    canNextChapter: canNext,
    chapters: chapters(),
    chaptersCompletionStatus: completionStatus,
    course: course(),
    currentChapterId,
    finishChapter,
    isLastChapter,
    isUnderWayChapter,
    nextChapter,
    setCurrentChapter,
    underWayChapter,
    underWayChapterId,
    loader,
    store: store(),
  };
  return <CourseContext.Provider value={context}>{props.children}</CourseContext.Provider>;
};
