const APP_HREF = 'chrome://snippetman/content/index.html'

export const getPersistInt = (component: string, key: string): number | null =>
  Services.xulStore.hasValue(APP_HREF, component, key)
    ? parseInt(Services.xulStore.getValue(APP_HREF, component, key))
    : null

export const getPersistString = (
  component: string,
  key: string,
): string | null =>
  Services.xulStore.hasValue(APP_HREF, component, key)
    ? Services.xulStore.getValue(APP_HREF, component, key)
    : null

export const setPersist = (component: string, key: string, value: string) =>
  Services.xulStore.setValue(APP_HREF, component, key, value)

export const clearPersist = (component: string, key: string) =>
  Services.xulStore.removeValue(APP_HREF, component, key)
