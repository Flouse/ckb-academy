const languages: { [language: string]: () => Promise<Record<string, any>> } = {
  en: async () => (await import('../i18n/en')).default(),
  // 'zh-cn': async () => (await import('../i18n/zh-cn')).default(),
};

export default languages;
