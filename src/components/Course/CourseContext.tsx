import {
  Accessor,
  batch,
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
import { createLocalStorage } from '@solid-primitives/storage';

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
  article?: Resource<MDXComponent>;
  store: T;
  reset: () => void;
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
  reset: () => void 0,
});

export function useCourseContext<T extends CourseStore<object>>() {
  return useContext(CourseContext) as ICourseContext<T>;
}

interface IProps {
  course: ICourse;
}

const STORAGE_ID = 'completed_courses';
export const CourseProvider: ParentComponent<IProps> = (props) => {
  const [, { locale }] = useI18n();
  const toast = useToast();
  const [storage, setStorage] = createLocalStorage();
  const [completionStatus, setCompletionStatus] = createSignal<Record<string, boolean>>({});
  const [underWayChapter, setUnderWayChapter] = createSignal<ICourseChapter>();
  const [currentChapter, setCurrentChapter] = createSignal<ICourseChapter>();

  const course = createMemo<ICourse>(() => props.course);
  const chapters = createMemo<ICourseChapter[]>(() => {
    return (
      course().chapters?.map((chapter) => {
        const [local, others] = splitProps(chapter, ['titleTranslate', 'articleTranslate']);
        const lang = locale() as LangsEnum;
        const title = local.titleTranslate?.[lang] ?? chapter.title;
        const article = local.articleTranslate?.[lang] ?? chapter.article;
        return { ...others, title, article } as ICourseChapter;
      }) ?? []
    );
  });

  createEffect(() => {
    if (chapters()) {
      const status: Record<string, boolean> = {};
      let isCompleted = false;
      try {
        const completedCourses: string[] = JSON.parse(storage[STORAGE_ID] ?? '[]');
        isCompleted = completedCourses.includes(course().id);
      } catch (e) {
        console.error(e);
      }
      const first = chapters()[0];
      if (!isCompleted) {
        setUnderWayChapter(first);
      }
      setCurrentChapter(first);
      course().chapters?.forEach((chapter) => (status[chapter.id] = isCompleted));
      setCompletionStatus(status);
    }
  });

  const [article] = createResource(
    () => currentChapter(),
    async (chapter) => {
      return (await chapter.article()).default;
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
      (!underWayChapter()?.manualCompletion || completionStatus()[underWayChapterId()])
    );
  };

  const nextChapter = () => {
    if (!canNext()) return;
    if (!underWayChapter()?.manualCompletion) {
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
      try {
        const completedCourses = JSON.parse(storage[STORAGE_ID]) ?? [];
        setStorage(STORAGE_ID, JSON.stringify([...completedCourses, course().id]));
      } catch (e) {
        console.error(e);
      }
      toast.success({
        title: '💐 Completed this course',
        duration: 4000,
        description: 'you can also try more interesting courses.',
      });
    }
  };

  const reset = () => {
    try {
      let completedCourses: string[] = JSON.parse(storage[STORAGE_ID] ?? '[]');
      completedCourses = completedCourses.filter((item) => item !== course().id);
      setStorage(STORAGE_ID, JSON.stringify(completedCourses));
      const status: Record<string, boolean> = {};
      chapters().forEach((chapter) => (status[chapter.id] = false));
      setCompletionStatus(status);
      const first = chapters()[0];
      setUnderWayChapter(first);
      setCurrentChapter(first);
    } catch (e) {
      console.error(e);
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
    article,
    store: store(),
    reset: reset,
  };
  return <CourseContext.Provider value={context}>{props.children}</CourseContext.Provider>;
};
