import { Component, For, JSX } from 'solid-js';
import {
  BiSolidCategory,
  BiSolidDetail,
  BiSolidHot,
  BiSolidNews,
  BiSolidStar,
  BiSolidVideos,
} from 'solid-icons/bi';
import Tooltip from '~/components/Tooltip';
import { ArchiveCategory, ArchiveGroup } from '~/types/library';
import { ArchiveFilters } from '~/pages/Library.data';

interface Props {
  filters: ArchiveFilters;
  onFilterResult: (result: ArchiveFilters) => void;
}

interface FiltersBarConfig<T> {
  option: T | undefined;
  title: string;
  icon?: JSX.Element;
}

const ArchiveFiltersBar: Component<Props> = (props) => {
  const groupFilters: Array<FiltersBarConfig<ArchiveGroup>> = [
    {
      option: undefined,
      title: 'All',
    },
    {
      option: ArchiveGroup.Recommended,
      title: 'Recommended',
      icon: <BiSolidHot />,
    },
    {
      option: ArchiveGroup.Favorite,
      title: 'Favorite',
      icon: <BiSolidStar />,
    },
  ];

  const categoryFilters: Array<FiltersBarConfig<ArchiveCategory>> = [
    {
      option: undefined,
      title: 'All Type',
      icon: <BiSolidCategory />,
    },
    {
      option: ArchiveCategory.Article,
      title: 'Article',
      icon: <BiSolidDetail />,
    },
    {
      option: ArchiveCategory.Video,
      title: 'Video',
      icon: <BiSolidVideos />,
    },
    {
      option: ArchiveCategory.Blog,
      title: 'Blog',
      icon: <BiSolidNews />,
    },
  ];

  return (
    <div class="sticky top-14 pt-16 pb-6 mb-8  z-[1] bg-light-background dark:bg-dark-background">
      <div class="container mx-auto flex gap-x-10 gap-y-4 flex-wrap">
        <div class="flex space-x-4">
          <For each={groupFilters}>
            {(item) => (
              <div
                onClick={() => props.onFilterResult({ ...props.filters, group: item.option })}
                classList={{
                  'bg-light-headline dark:bg-white text-white dark:text-black':
                    props.filters.group == item.option,
                  'bg-white dark:bg-dark-background_dark': props.filters.group !== item.option,
                }}
                class="link px-4 h-8 rounded-full shadow-xl shadow-light-shadow/10 flex justify-center items-center"
              >
                <i class="mr-1">{item.icon}</i>
                {item.title}
              </div>
            )}
          </For>
        </div>
        <div class="flex space-x-4">
          <For each={categoryFilters}>
            {(item) => (
              <Tooltip content={item.title}>
                <div
                  onClick={() => props.onFilterResult({ ...props.filters, category: item.option })}
                  classList={{
                    'bg-light-headline dark:bg-white text-white dark:text-black':
                      props.filters.category == item.option,
                    'bg-white dark:bg-dark-background_dark': props.filters.category !== item.option,
                  }}
                  class="link h-8 w-8 rounded-full shadow-xl shadow-light-shadow/10 flex justify-center items-center"
                >
                  <i class="text-lg">{item.icon}</i>
                </div>
              </Tooltip>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default ArchiveFiltersBar;
