export interface onChangeData {
  currentPage: number
  pageSize: number
}

export interface IPager {
  currentPage?: number
  numberOfItems: number
  pageSizes?: number[]
  pageSize?: number
  /** React-paginate. */
  disableInitialCallback?: boolean
  onChange: (data: onChangeData) => void
}
