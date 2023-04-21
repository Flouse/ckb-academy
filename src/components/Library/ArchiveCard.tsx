import { Component, createMemo, JSX, Show } from 'solid-js';
import { BiSolidDetail, BiSolidHot, BiSolidNews, BiSolidStar, BiSolidVideos } from 'solid-icons/bi';
import { Archive, ArchiveCategory } from '~/types/library';
import Tooltip from '~/components/Tooltip';
import { createLocalStorage } from '@solid-primitives/storage';
import * as _ from 'lodash';
import classNames from 'classnames';

interface Props {
  archive: Archive;
  onSelect?: (course: Archive) => void;
}

const ArchiveCard: Component<Props> = (props) => {
  const icons: Record<ArchiveCategory, { title: string; icon?: JSX.Element }> = {
    [ArchiveCategory.Blog]: {
      title: 'Blog',
      icon: <BiSolidNews />,
    },
    [ArchiveCategory.Article]: {
      title: 'Article',
      icon: <BiSolidDetail />,
    },
    [ArchiveCategory.Video]: {
      title: 'Video',
      icon: <BiSolidVideos />,
    },
  };
  const [storage, set] = createLocalStorage();

  const onFavourite = (event: Event) => {
    let archives = favoriteArchives();
    if (archives.includes(props.archive.id)) {
      _.remove(archives, (archive) => props.archive.id === archive);
    } else {
      archives = [...archives, props.archive.id];
    }
    set('favorite_archives', JSON.stringify(archives));
    event.preventDefault();
    event.stopPropagation();
  };

  const favoriteArchives = (): string[] => JSON.parse(storage['favorite_archives'] ?? '[]');

  const isFavorite = createMemo(() => {
    return favoriteArchives().includes(props.archive.id);
  });

  const iconClassname =
    'w-6 h-6 rounded-full bg-white shadow text-sm dark:text-dark-background_dark flex items-center justify-center';

  return (
    <div class="w-44 group">
      <div
        onClick={() => props.onSelect?.(props.archive)}
        style={{ 'background-image': `url(${props.archive.cover || ''})` }}
        class="relative hover:cursor-pointer hover:transition hover:scale-105 hover:shadow-light-shadow/40 dark:hover:shadow-black shadow-2xl shadow-light-shadow bg-cover bg-light-background_dark dark:bg-dark-background_dark overflow-hidden flex flex-col rounded-2xl h-56"
      >
        <div class="absolute flex space-x-2 right-4 top-4">
          <Show when={props.archive.recommended} keyed>
            <i class={classNames(iconClassname, 'text-error')}>
              <BiSolidHot />
            </i>
          </Show>
          <i class={classNames(iconClassname)}>{icons[props.archive.category].icon}</i>
        </div>

        <div
          onClick={onFavourite}
          class={classNames(iconClassname, 'absolute left-4 top-4 hidden group-hover:flex')}
        >
          <i classList={{ 'text-warning': isFavorite(), 'text-light-tertiary': !isFavorite() }}>
            <BiSolidStar />
          </i>
        </div>
      </div>

      <Tooltip
        openDelay={1000}
        class={'max-w-xs px-4 py-4'}
        content={
          <div>
            <span class="text-sm font-bold leading-4"> {props.archive.title}</span>
            <p class="pt-1 text-xs leading-4"> {props.archive.description}</p>
          </div>
        }
      >
        <span class="text-sm text-left line-clamp-2 text-light-headline dark:text-dark-headline font-medium leading-4 mt-4">
          {props.archive.title}
        </span>
        <p class="text-xs text-left text-light-tertiary dark:text-dark-tertiary line-clamp-3 leading-4 mt-2">
          {props.archive.description}
        </p>
      </Tooltip>
    </div>
  );
};

export default ArchiveCard;
