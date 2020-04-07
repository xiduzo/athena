import { makeStyles, Theme } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import React, { FC, Fragment } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    color: theme.palette.success.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  error: {
    color: theme.palette.error.main,
  },
}))

interface IItemsToGoIcon {
  current: number
  max: number
}

export const ItemsToGoIcon: FC<IItemsToGoIcon> = ({ current, max }) => {
  const classes = useStyles()

  return (
    <Fragment>
      {current <= max * 0.5 && <ErrorIcon className={classes.error} />}
      {current > max * 0.5 && max !== 0 && <WarningIcon className={classes.warning} />}
      {current === max && <CheckCircleIcon className={classes.success} />}
    </Fragment>
  )
}
