import i18nData from '../data/i18n.json';

type Lang = 'id' | 'en';
type I18nData = typeof i18nData;

export function getLang(): Lang {
  return 'id';
}

export function t(path: string): string {
  const keys = path.split('.');
  let value: unknown = i18nData;
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof value === 'string' ? value : path;
}

export function getDict(lang: Lang): I18nData[Lang] {
  return i18nData[lang];
}
