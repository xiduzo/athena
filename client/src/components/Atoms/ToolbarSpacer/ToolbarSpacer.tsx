import React, { FC } from 'react'
import { makeStyles, Theme, HiddenProps, Hidden } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
}))

export const ToolbarSpacer: FC<HiddenProps> = (props) => {
  const classes = useStyles()
  return (
    <Hidden {...props}>
      <div className={classes.toolbar} />
    </Hidden>
  )
}
