import { Component, For, ParentProps, Show } from 'solid-js';
import { useRouteData } from '@solidjs/router';
import { LibraryData } from '~/pages/Library.data';
import Loading from '~/components/Loading';
import DataEmpty from '~/components/DataEmpty';
import ArchiveFiltersBar from '~/components/Library/ArchiveFiltersBar';
import ArchiveCard from '~/components/Library/ArchiveCard';

const Library: Component<ParentProps> = () => {
  const data = useRouteData<LibraryData>();

  return (
    <>
      <div
        class="min-h-container bg-[_1300px] bg-fixed bg-repeat-x bg-[center_22rem]"
        style={{ 'background-image': 'url(/images/logo-big.png)' }}
      >
        <ArchiveFiltersBar
          filters={data.archiveFilters}
          onFilterResult={(result) => (data.archiveFilters = result)}
        />

        <div class="container mx-auto">
          <Show
            when={!data.archives.loading}
            keyed
            fallback={
              <div class="pt-36">
                <Loading />
              </div>
            }
          >
            <Show
              when={(data.archives() ?? []).length > 0}
              keyed
              fallback={
                <div class="pt-36">
                  <DataEmpty />
                </div>
              }
            >
              <div class="flex flex-wrap gap-x-20 gap-y-10 pb-24">
                <For each={data.archives()}>
                  {(archive) => (
                    <ArchiveCard archive={archive} onSelect={(item) => window.open(item.url)} />
                  )}
                </For>
              </div>
            </Show>
          </Show>
        </div>
      </div>
    </>
  );
};
export default Library;
