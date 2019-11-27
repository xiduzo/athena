import React, { FC, useState, useEffect } from 'react'
import { GetTribes } from 'src/lib/api'
import { useStyles } from './style'
import { Fab, Container, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { ITribe } from 'src/lib/types/tribe'

export const CoordinatorTribesRoute: FC = () => {
  const classes = useStyles()

  const [tribes, setTribes] = useState<any[]>([])

  useEffect(() => {
    GetTribes()
      .then((response: any[]) => {
        setTribes(response)
        console.log(response)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])
  return (
    <section className={classes.main}>
      <Fab color='primary' aria-label='New tribe' className={classes.fab}>
        <AddIcon />
      </Fab>
      <Container maxWidth='lg'>
        <Grid container spacing={2} className={classes.userGrid}>
          {tribes.map((tribe: ITribe) => (
            <Grid key={tribe.guid} item xs={12} sm={6} md={4} lg={3}>
              {tribe.name}
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  )
}
