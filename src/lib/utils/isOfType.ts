export const isOfType = <T>(item: any, type: T): boolean => !!item && item.constructor === type

/**
 * Check if an item is an `Array`
 * @param item The item to be checked
 */
export const isArray = (item: any): boolean => isOfType<ArrayConstructor>(item, Array)

/**
 * Check if an item is an `Object`
 * @param item The item to be checked
 */
export const isObject = (item: any): boolean => isOfType<ObjectConstructor>(item, Object)
