import React, { FC, useEffect, useState } from 'react'
import { GetSquads } from 'src/lib/api'
import { ISquad } from 'src/lib/types/squad'
import { Container, Grid, makeStyles, Theme } from '@material-ui/core'
import { SquadCard } from 'src/components/Molecules/SquadCard'

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
  const [squads, setSquads] = useState<ISquad[]>([])

  useEffect(() => {
    GetSquads()
      .then((response: ISquad[]) => {
        setSquads(response)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  return (
    <section className={classes.main}>
      <Container maxWidth={`lg`}>
        <Grid container spacing={2}>
          {squads.map((squad: ISquad) => (
            <Grid key={squad.guid} item xs={3}>
              <SquadCard squad={squad} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  )
}
