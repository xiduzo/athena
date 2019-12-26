import React, { FC, useEffect, useState } from 'react'
import { GetSquads } from 'src/lib/api'
import { ISquad } from 'src/lib/types/squad'
import { Container, Grid, makeStyles, Theme } from '@material-ui/core'
import { SquadCard, SquadCardMock } from 'src/components/Molecules/SquadCard'
import { useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => {
  return {
    fab: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      margin: theme.spacing(2),
    },
    main: {
      padding: theme.spacing(2, 0),
    },
  }
})

export const SquadsRoute: FC = () => {
  const classes = useStyles()

  const [ squads, setSquads ] = useState<ISquad[]>([])
  const [ loading, setLoading ] = useState<boolean>(false)

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    GetSquads()
      .then((response: ISquad[]) => {
        setSquads(response)
        setLoading(false)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  const navigateToSquad = (id: string) => {
    history.push(`${location.pathname}/${id}`)
  }

  return (
    <section className={classes.main}>
      <Container maxWidth={`lg`}>
        <Grid container spacing={2}>
          {loading &&
            [ ...new Array(48) ].map((_, index: number) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <SquadCardMock />
              </Grid>
            ))}
          {!loading &&
            squads.map((squad: ISquad) => (
              <Grid key={squad.guid} item xs={12} sm={6} md={4} lg={3}>
                <SquadCard squad={squad} onClick={() => navigateToSquad(squad.guid)} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </section>
  )
}
