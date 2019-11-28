import React, { FC, useState, useEffect } from 'react'
import { GetTribes } from 'src/lib/api'
import { useStyles } from './style'
import { Fab, Container, Grid, Card, CardActionArea, CardHeader } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { ITribe } from 'src/lib/types/tribe'
import { Link, useLocation } from 'react-router-dom'

export const TribesRoute: FC = () => {
  const classes = useStyles()
  const location = useLocation()

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
              <Card>
                <CardActionArea component={Link} to={`${location.pathname}/${tribe.guid}`}>
                  <CardHeader avatar={'K'} title={`${tribe.name}`} />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  )
}
