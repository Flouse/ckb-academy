import { Component, ParentProps, Show } from 'solid-js';
import { useRouteData } from '@solidjs/router';
import { CourseDetailsData } from '~/pages/CourseDetails.data';
import Index from '~/components/CourseCore/CourseExplorer';
import { CourseProvider } from '~/components/CourseCore/CourseContext';
import Loading from '~/components/Loading';
import DataEmpty from '~/components/DataEmpty';

const CourseDetails: Component<ParentProps> = () => {
  const { course, loading } = useRouteData<CourseDetailsData>();
  return (
    <>
      <Show
        when={!loading}
        keyed
        fallback={
          <div class="flex items-center justify-center h-screen">
            <Loading />
          </div>
        }
      >
        <Show
          when={course}
          keyed
          fallback={
            <div class="flex items-center justify-center h-screen">
              <DataEmpty title="Sorry, this course cannot be found" />
            </div>
          }
        >
          <CourseProvider course={course!}>
            <Index />
          </CourseProvider>
        </Show>
      </Show>
    </>
  );
};
export default CourseDetails;
