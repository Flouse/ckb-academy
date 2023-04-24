import { RouteDataFunc } from '@solidjs/router';
import { useI18n } from '@solid-primitives/i18n';
import { createResource, Resource, splitProps } from 'solid-js';
import { LangsEnum } from '~/common/constants/site-basic';
import { Archive, ArchiveCategory, ArchiveGroup } from '~/types/library';
import { archives as archiveData } from '~/data/archives.data';
import { createLocalStorage } from '@solid-primitives/storage';
import { createStore } from 'solid-js/store';

export interface LibraryData {
  archives: Resource<Array<Archive>>;
  archiveFilters: ArchiveFilters;
}

export interface ArchiveFilters {
  category?: ArchiveCategory;
  group?: ArchiveGroup;
}

export const LibraryData: RouteDataFunc<unknown, LibraryData> = () => {
  const [, { locale }] = useI18n();
  const [filters, setFilters] = createStore<ArchiveFilters>({});
  const [storage] = createLocalStorage();

  const [resource] = createResource(
    () => [filters.group, filters.category, locale()],
    ([group, category, locale]) => {
      const lang = locale as LangsEnum;
      let archives = archiveData;
      if (group == ArchiveGroup.Recommended) {
        archives = archives.filter((archive) => archive.recommended);
      } else if (group == ArchiveGroup.Favorite) {
        const favorites: string[] = JSON.parse(storage['favorite_archives'] ?? '[]');
        archives = archives.filter((archive) => favorites.includes(archive.id));
      }
      return archives
        .filter((archive) => category == undefined || archive.category === category)
        .map((archive) => {
          const [local, others] = splitProps(archive, ['titleTranslate', 'descriptionTranslate']);
          const title = local.titleTranslate?.[lang] ?? archive.title;
          const description = local.descriptionTranslate?.[lang] ?? archive.description;
          return { ...others, title, description } as Archive;
        });
    },
  );

  return {
    get archives() {
      return resource;
    },

    get archiveFilters() {
      return filters;
    },

    set archiveFilters(filters: ArchiveFilters) {
      setFilters(filters);
    },
  };
};
