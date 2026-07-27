import cs from "./cs.json";
import en from "./en.json";
import ru from "./ru.json";
import vie from "./vie.json";

export const translations = {
  cs,
  en,
  ru,
  vie,
} as const;

export type Locale = keyof typeof translations;

export function t<T = string>(lang: Locale, key: string): T {
  const dict = translations[lang] as Record<string, unknown>;
  const value = dict[key];
  return (value ?? key) as T;
}

export function tArray<T = unknown>(lang: Locale, key: string): T[] {
  const result = t<unknown>(lang, key);
  return Array.isArray(result) ? (result as T[]) : [];
}

export const supportedLocales: Locale[] = ["cs", "en", "ru", "vie"];
export const nonDefaultLocales: Locale[] = ["en", "ru", "vie"];

export function getLocaleFromPath(pathname: string): Locale {
  const locale = pathname.split("/").filter(Boolean)[0];
  return supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : "cs";
}

export function withLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  if (supportedLocales.includes(segments[0] as Locale)) {
    segments.shift();
  }
  if (locale !== "cs") {
    segments.unshift(locale);
  }
  return `/${segments.join("/")}`.replace(/\/\/$/, "/");
}
