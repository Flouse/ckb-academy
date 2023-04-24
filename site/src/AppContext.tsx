import { createContext, createEffect, createResource, ParentComponent } from 'solid-js';
import { createLocalStorage } from '@solid-primitives/storage';
import { createI18nContext, I18nContext } from '@solid-primitives/i18n';
import { useLocation } from '@solidjs/router';
import languages from '../i18n';

interface AppContextInterface {
  isDark: boolean;
}

export const AppContext = createContext<AppContextInterface>({ isDark: false });

export const AppContextProvider: ParentComponent = (props) => {
  const location = useLocation();

  const [settings, set] = createLocalStorage();
  const specialLanguages = { zh: true };
  const browserLanguages = navigator.language.slice(0, 2);

  const checkLocale = () => {
    if (location.query.locale) {
      set('locale', location.query.locale);
    } else if (!settings.locale && browserLanguages in languages) {
      set('locale', browserLanguages);
    } else if (
      !settings.locale &&
      browserLanguages in specialLanguages &&
      navigator.language.toLowerCase() in languages
    ) {
      set('locale', navigator.language.toLocaleLowerCase());
    }
  };

  checkLocale();

  const i18n = createI18nContext({}, settings.locale ?? 'en');
  const [, { add, locale }] = i18n;

  createEffect(() => set('locale', locale()));

  const [languageData] = createResource(
    () => locale(),
    async (value) => languages[value](),
  );

  createEffect(() => !languageData.loading && add(locale(), languageData() ?? []));

  const isDark = () => settings.dark === 'true';

  createEffect(() => {
    if (isDark()) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  });

  const store: AppContextInterface = {
    get isDark() {
      return isDark();
    },
    set isDark(value: boolean) {
      set('dark', value ? 'true' : 'false');
    },
  };

  return (
    <AppContext.Provider value={store}>
      <I18nContext.Provider value={i18n}>{props.children}</I18nContext.Provider>
    </AppContext.Provider>
  );
};
