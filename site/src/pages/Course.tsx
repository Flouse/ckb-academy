import { Component, createSignal, For, ParentProps, Show } from 'solid-js';
import { useNavigate, useRouteData } from '@solidjs/router';
import { CourseData } from '~/pages/Course.data';
import { Course, CourseSource } from '~/types/course';
import DataEmpty from '~/components/DataEmpty';
import CourseItem from '~/components/Course/CourseItem';
import CoursePreview from '~/components/Course/CoursePreview';
import CourseFilterBar from '~/components/Course/CourseFilterBar';
import Loading from '~/components/Loading';

const CoursePage: Component<ParentProps> = () => {
  const data = useRouteData<CourseData>();
  const go = useNavigate();
  const [previewCourse, setPreviewCourse] = createSignal<Course>();

  const onSelectCourse = (course: Course) => {
    setPreviewCourse(course);
  };

  const onStartCourse = (course: Course) => {
    setPreviewCourse(undefined);
    if (course.source == CourseSource.Community) {
      window.open(course.url);
    } else {
      go(course.id);
    }
  };

  return (
    <>
      <div
        class="h-container bg-cover bg-top"
        style={{ 'background-image': 'url(/images/logo-line.png)' }}
      >
        <div class="container mx-auto py-16">
          <CourseFilterBar
            currentSource={data.source}
            currentType={data.type}
            onSourceChange={(source) => (data.source = source)}
            onTypeChange={(type) => (data.type = type)}
          />

          <Show
            when={!data.courses.loading}
            keyed
            fallback={
              <div class="pt-36">
                <Loading />
              </div>
            }
          >
            <Show
              when={(data.courses() ?? []).length > 0}
              keyed
              fallback={
                <div class="pt-36">
                  <DataEmpty />
                </div>
              }
            >
              <div class="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-10">
                <For each={data.courses()}>
                  {(item) => <CourseItem course={item} onSelect={onSelectCourse} />}
                </For>
              </div>
            </Show>
          </Show>
        </div>
      </div>

      <CoursePreview
        course={previewCourse()}
        onStart={onStartCourse}
        onClose={() => setPreviewCourse(undefined)}
      />
    </>
  );
};
export default CoursePage;
