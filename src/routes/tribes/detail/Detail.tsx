import React, { FC, useState, useEffect } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
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

export const TribeDetailRoute: FC = () => {
  const [tribe, setTribe] = useState<ITribe>()

  const { id } = useParams<ITribeDetailRouteParams>()

  useEffect(() => {
    GetTribeById(id)
      .then((response: ITribe) => {
        setTribe(response)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [id])

  return (
    <Container maxWidth='lg'>
      <h1>testing</h1>
      {tribe && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h2'>{tribe.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h3'>Leaders</Typography>
          </Grid>
          {tribe.leaders.map((user: IUser) => (
            <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
              <UserCard user={user} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant='h3'>Squads</Typography>
          </Grid>
          {tribe.squads.map((squad: ISquad) => (
            <Grid key={squad.guid} item xs={4}>
              <SquadCard squad={squad} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
