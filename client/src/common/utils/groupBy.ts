export const groupBy = <T, K>(list: T[], keyGetter: (item: T) => K): Map<K, T[]> => {
  const map = new Map()

  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)

    collection ? collection.push(item) : map.set(key, [item])
  })

  return map
}
