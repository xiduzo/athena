import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    height: theme.mixins.toolbar.minHeight,
  },
}))

export const ToolbarSpacer: FC = () => {
  const classes = useStyles()
  return <div className={classes.toolbar} />
}
