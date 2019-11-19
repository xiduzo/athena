import React, { FC } from 'react'
import { useStyles } from './style'

import AddIcon from '@material-ui/icons/Add'
import { Fab, Container, Grid, Typography } from '@material-ui/core'

export const CoordinatorUsersRoute: FC = () => {
  const classes = useStyles()

  return (
    <section className={classes.main}>
      <Fab color='primary' aria-label='New agreement' className={classes.fab}>
        <AddIcon />
      </Fab>
      <Container maxWidth='lg'>
        <Grid container spacing={2} className={classes.mainGrid}>
          <Grid item xs={12}>
            <Typography component='h2' variant='h5'>
              Users
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
