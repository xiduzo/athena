type comparer = <T>(array: T[], item: T) => boolean

const defaultComparer = <T>(array: T[], item: T): boolean => array.indexOf(item) !== -1

export const hasMatchesWith = <T>(
  arrayOne: T[],
  arrayTwo: T[],
  comparer: comparer = defaultComparer
): boolean => {
  if (!arrayOne.length || !arrayTwo.length) return false

  return arrayOne.some((item: T) => comparer(arrayTwo, item))
}
