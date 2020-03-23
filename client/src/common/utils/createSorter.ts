interface IOrder {
  desc: number
  asc: number
}
interface IDirMap {
  gt: IOrder
  lt: IOrder
}

const dirMap: IDirMap = {
  // greater-than
  gt: { asc: 1, desc: -1 },
  // less-than
  lt: { asc: -1, desc: 1 },
}

const doSort = <T>(A: T, B: T, property: string, direction: string = 'ASC') => {
  const a = (A as any)[property] // TODO fix this any cast in a more generic way
  const b = (B as any)[property]

  if (a < b) return direction.toLowerCase() === 'asc' ? dirMap.lt.asc : dirMap.lt.desc
  if (a > b) return direction.toLowerCase() === 'asc' ? dirMap.gt.asc : dirMap.gt.desc
  return 0
}

interface ISortArgument {
  property: string
  direction?: string
}

const createSorter = (...args: ISortArgument[]) => <T>(A: T, B: T) => {
  let ret = 0

  // TODO fix unused var
  // eslint-disable-next-line
  const _ = args.some((sorter: ISortArgument) => {
    const { property, direction = 'ASC' } = sorter
    const value = doSort(A, B, property, direction)

    if (value === 0) {
      // they are equal, continue to next sorter if any
      return false
    } else {
      // they are different, stop at current sorter
      ret = value

      return true
    }
  })

  return ret
}

export { createSorter }
