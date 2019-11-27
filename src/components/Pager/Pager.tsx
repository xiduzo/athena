import React, { FC, ChangeEvent } from 'react'
import { IPager } from './interface'

import { Grid, Typography, FormControl, Select, MenuItem } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import ReactPaginate from 'react-paginate'
import { useStyles } from './style'

// interface IPagerContext {
//   itemsPerPage: number
//   currentPage: number
//   numberOfItems: number
//   pageSizes: number[]
//   /** React-paginate. */
//   disableInitialCallback?: boolean

// }

// const PagerContext = createContext()

export const Pager: FC<IPager> = ({
  currentPage = 0,
  disableInitialCallback = true,
  numberOfItems,
  onChange,
  pageSizes = [24, 48, 96],
  pageSize = pageSizes[0],
}) => {
  const classes = useStyles()

  const numberOfPages = Math.ceil(numberOfItems / pageSize)

  const setPageSize = (event: ChangeEvent<any>) => {
    const { value } = event.target
    pageSize = (value as unknown) as number
    onChange({ currentPage, pageSize })
  }

  const onChangeHandler = (event: any) => {
    const { selected } = event

    onChange({ currentPage: selected, pageSize })
  }

  return (
    <Grid container>
      <Grid item xs={4} className={classes.selectDiv}>
        <Typography>Items per page</Typography>
        <FormControl className={classes.formControl}>
          {/* <InputLabel id='demo-simple-select-helper-label'>Age</InputLabel> */}
          <Select value={pageSize} onChange={setPageSize}>
            {pageSizes.map((size: number) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <ReactPaginate
          pageCount={numberOfPages}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          onPageChange={onChangeHandler}
          initialPage={currentPage}
          previousLabel={<ChevronLeftIcon color='primary' />}
          nextLabel={<ChevronRightIcon color='primary' />}
          containerClassName={classes.pager}
          pageClassName={classes.button}
          pageLinkClassName={classes.link}
          activeClassName={classes.active}
          previousClassName={classes.button}
          nextClassName={classes.button}
          breakLabel={<MoreHorizIcon color='primary' />}
          breakClassName={classes.button}
          disabledClassName={classes.disabled}
          forcePage={currentPage}
          disableInitialCallback={disableInitialCallback}
        />
      </Grid>
    </Grid>
  )
}
