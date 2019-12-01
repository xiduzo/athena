import React, { FC, useState, useEffect } from 'react'
import { Container, Grid, Typography, makeStyles, Theme } from '@material-ui/core'
import { ITribe } from 'src/lib/types/tribe'
import { useParams } from 'react-router'
import { GetTribeById } from 'src/lib/api'
import { IUser } from 'src/lib/types/user'
import { UserCard } from 'src/components/Molecules/UserCard'
import { ISquad } from 'src/lib/types/squad'
import { SquadCard } from 'src/components/Molecules/SquadCard'

interface ITribeDetailRouteParams {
  id: string
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    main: {
      padding: theme.spacing(2, 0),
    },
  }
})

export const TribeDetailRoute: FC = () => {
  const classes = useStyles()

  const [ tribe, setTribe ] = useState<ITribe>()

  const { id } = useParams<ITribeDetailRouteParams>()

  useEffect(
    () => {
      GetTribeById(id)
        .then((response: ITribe) => {
          setTribe(response)
        })
        .catch((error: any) => {
          console.log(error)
        })
    },
    [ id ]
  )

  return (
    <section className={classes.main}>
      <Container maxWidth="lg">
        {tribe && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">{tribe.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Leader</Typography>
            </Grid>
            {tribe.leaders.map((user: IUser) => (
              <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
                <UserCard user={user} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography variant="h5">Squads</Typography>
            </Grid>
            {tribe.squads.map((squad: ISquad) => (
              <Grid key={squad.guid} item xs={12} sm={6} md={4} lg={3}>
                <SquadCard squad={squad} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </section>
  )
}
