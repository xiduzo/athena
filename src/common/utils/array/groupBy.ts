type KeyGetter<T, K> = (item: T) => K

export const groupBy = <T, K>(list: T[], keyGetter: KeyGetter<T, K>): Map<K, T[]> => {
  const map = new Map<K, T[]>()

  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)

    collection ? collection.push(item) : map.set(key, [item])
  })

  return map
}
