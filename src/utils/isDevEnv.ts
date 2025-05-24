export function isDevEnv() {
  return import.meta.env.NODE_ENV === "development";
}
