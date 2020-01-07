const doFilter = (item: string, filter: IFilterArgument) => {
  let { value, property } = filter

  if (!(value instanceof RegExp)) {
    value = filter.value = new RegExp(value, 'i')
  }

  return value.test(item[property as any])
}

interface IFilterArgument {
  property: string
  value: string | RegExp
}

const createFilter = (...filters: IFilterArgument[]) => (item: any) => filters.every((filter) => doFilter(item, filter))

export { createFilter }
