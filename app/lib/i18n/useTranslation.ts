// lib/i18n/useTranslation.ts
import { useLocation } from '@remix-run/react';
import { translations } from './index';  // Import from index instead

export type Language = 'en' | 'sr';
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}${'.'}${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<typeof translations.en>;

export function useTranslation() {
  const location = useLocation();
  const locale = (new URLSearchParams(location.search).get('locale') as Language) || 'en';

  function t(path: string) {
    return path.split('.').reduce((obj, key) => {
      if (obj === undefined) return path;
      return obj[key as keyof typeof obj];
    }, translations[locale] as any) ?? path;
  }

  return { t, locale };
}