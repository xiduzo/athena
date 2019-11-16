import React, { FC } from 'react'
import { Grid, Drawer, Typography } from '@material-ui/core'
import { useStyles } from './style'

export const CoordinatorAgreementsRoute: FC = () => {
  const classes = useStyles()

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          coordinator agreements
        </Grid>
      </Grid>
      <Drawer variant='permanent' anchor='right'>
        <div className={classes.toolbar}></div>
        <Typography component='h2' variant='h5'>
          Filter
        </Typography>
      </Drawer>
    </div>
  )
}
