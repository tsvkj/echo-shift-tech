export function getLang(i18n: any) {
  return i18n.language?.startsWith("ar") ? "ar" : "en";
}