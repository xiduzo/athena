import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { GetSquadById } from 'src/lib/api/squads'
import { Container, Grid, Typography, makeStyles, Theme } from '@material-ui/core'
import { ISquad } from 'src/lib/types/squad'
import { IUser } from 'src/lib/types/user'
import { UserCard } from 'src/components/Molecules/UserCard'

interface ISquadDetailRouteParams {
  id: string
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    main: {
      padding: theme.spacing(2, 0),
    },
  }
})

export const SquadDetailRoute: FC = () => {
  const classes = useStyles()

  const [ squad, setSquad ] = useState<ISquad>()

  const { id } = useParams<ISquadDetailRouteParams>()

  useEffect(
    () => {
      GetSquadById(id)
        .then((response: ISquad) => {
          setSquad(response)
          console.log(response)
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
        {squad && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant={`h4`}>{squad.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={`h5`}>{`Members`}</Typography>
            </Grid>
            {squad.members &&
              squad.members.map((user: IUser) => (
                <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
                  <UserCard user={user} />
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
    </section>
  )
}
