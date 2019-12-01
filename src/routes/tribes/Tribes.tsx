import React, { FC, useState, useEffect } from 'react'
import { GetTribes } from 'src/lib/api'
import { useStyles } from './style'
import { Fab, Container, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { ITribe } from 'src/lib/types/tribe'
import { TribeCard, TribeCardMock } from 'src/components/Molecules/TribeCard'
import { useHistory, useLocation } from 'react-router-dom'

export const TribesRoute: FC = () => {
  const classes = useStyles()

  const [ tribes, setTribes ] = useState<ITribe[]>([])
  const [ loading, setLoading ] = useState<boolean>(false)

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    setLoading(true)

    GetTribes()
      .then((response: any[]) => {
        setTribes(response)
        setLoading(false)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  const navigateToTribe = (id: string) => {
    history.push(`${location.pathname}/${id}`)
  }

  return (
    <section className={classes.main}>
      <Fab color="primary" aria-label="New tribe" className={classes.fab}>
        <AddIcon />
      </Fab>
      <Container maxWidth="lg">
        <Grid container spacing={2} className={classes.userGrid}>
          {loading &&
            [ ...new Array(48) ].map((_, index: number) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <TribeCardMock />
              </Grid>
            ))}
          {!loading &&
            tribes.map((tribe: ITribe) => (
              <Grid key={tribe.guid} item xs={12} sm={6} md={4} lg={3}>
                <TribeCard tribe={tribe} onClick={() => navigateToTribe(tribe.guid)} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </section>
  )
}
