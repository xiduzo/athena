import { v4 } from 'uuid'
import { isArray } from 'src/common/utils'

interface ILocalStorageItem {
  id: number
}

export interface IOfflineEvent {
  id: string
  name: string
  args: any[]
}

/**
 * Check if the user has an active internet connection.
 */
export const isOnline = (): boolean => navigator.onLine

/**
 * Get an item stored in the offline store.
 * @param key The key on which the item is saved
 * @param id Get a item by id. This will be ignored when the stored data is not an array
 */
export const getLocalItem = <T>(key: string, id?: number | string): T | null => {
  const localItem = localStorage.getItem(key)
  const item: any = localItem ? JSON.parse(localItem) : localItem

  return id && isArray(item)
    ? item.find((i: Partial<ILocalStorageItem>): boolean => i.id === parseInt(id as string, 10))
    : item
}

/**
 * Store an item to the offline store.
 * @param key The key on which the item is saved
 * @param item Item to be stored
 */
export const setLocalItem = <T>(key: string, item: T): T => {
  localStorage.setItem(key, JSON.stringify(item))
  return item
}

/**
 * Add an item to the offline store.
 * @param key The key on which the item is saved
 * @param item Item to be stored
 */
export const addLocalItem = <T>(key: string, item: T): T => {
  let localItem: any = getLocalItem<T>(key)

  localItem = isArray(localItem) ? [...localItem, item] : item

  setLocalItem<T>(key, localItem)

  return item
}

/**
 * Update an item in the offline store.
 * @param key The key on which the item is saved
 * @param item Item to be stored
 * @param id Update a item by id. This will be ignored when the stored data is not an array
 */
export const updateLocalItem = <T>(key: string, item: T, id?: string | number): T => {
  let localItem: any = getLocalItem<T>(key)

  localItem =
    id && isArray(localItem)
      ? localItem.map(
          (i: Partial<ILocalStorageItem>): Partial<ILocalStorageItem> => {
            return i.id === parseInt(id as string, 10) ? item : i
          }
        )
      : item

  setLocalItem<T>(key, localItem)

  return item
}

/**
 * Remove item from the offline store.
 * @param key The key on which the item is saved
 * @param id Get a item by id. This will be ignored when the stored data is not an array
 */
export const removeLocalItem = <T>(key: string, id?: number | string): T | void => {
  let item: any = getLocalItem<T>(key)

  if (id && isArray(item)) {
    item = item.filter((i: Partial<ILocalStorageItem>): boolean => i.id !== id)
    return setLocalItem<T>(key, item)
  }

  return localStorage.removeItem(key)
}

/**
 * Add an event to be processed when the user will be back online.
 * @param name Name of the event, preferably the name of the function to be called
 * @param args Any arguments which the function needs to be executed with
 */
export const addOfflineEvent = (name: string, ...args: any): void => {
  const event: IOfflineEvent = {
    id: v4(),
    name,
    args: [...args],
  }

  addLocalItem<IOfflineEvent>('offlineEvents', event)
}
