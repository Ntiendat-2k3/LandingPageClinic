import vi from "@/locales/vi.json";

export type Messages = typeof vi;

const localeModules = import.meta.glob<{ default: Messages }>(
  "./locales/*.json",
  { eager: true }
);

const catalogs = Object.fromEntries(
  Object.entries(localeModules).map(([filePath, module]) => {
    const localeName = filePath.match(/\/([^/]+)\.json$/)?.[1];
    return [localeName, module.default];
  })
) as Record<string, Messages>;

const requestedLocale = new URLSearchParams(window.location.search)
  .get("lang")
  ?.toLowerCase();
const documentLocale = document.documentElement.lang.split("-")[0].toLowerCase();

export const locale =
  (requestedLocale && catalogs[requestedLocale] ? requestedLocale : null) ??
  (catalogs[documentLocale] ? documentLocale : "vi");

export const messages = catalogs[locale] ?? vi;
document.documentElement.lang = locale;

/** Thay các biến `{tenBien}` trong nội dung dịch mà không thay đổi phần văn bản còn lại. */
export const formatMessage = (
  template: string,
  values: Record<string, string | number>
) =>
  template.replace(/\{(\w+)\}/g, (placeholder, key: string) =>
    Object.prototype.hasOwnProperty.call(values, key)
      ? String(values[key])
      : placeholder
  );
