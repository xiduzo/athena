import React, { FC } from 'react'
import { Container, Grid, Typography, Drawer, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useStyles } from './style'

export const CoordinatorAgreementsRoute: FC = () => {
  const classes = useStyles()

  return (
    <section className={classes.main}>
      <Fab color='primary' aria-label='New agreement' className={classes.fab}>
        <AddIcon />
      </Fab>
      <Container maxWidth='lg'>
        <Grid container spacing={4} className={classes.mainGrid}>
          <Grid item xs={12}>
            <Typography component='h2' variant='h5'>
              Agreements
            </Typography>
          </Grid>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => (
            <Grid key={item} item xs={3}>
              coordinator agreements
            </Grid>
          ))}
        </Grid>
      </Container>
      <Drawer
        variant='permanent'
        anchor='right'
        className={classes.drawer}
        classes={{
          paper: classes.drawer,
        }}
      >
        <div className={classes.toolbar}></div>
        <Typography component='h2' variant='h5'>
          Filter
        </Typography>
      </Drawer>
    </section>
  )
}
