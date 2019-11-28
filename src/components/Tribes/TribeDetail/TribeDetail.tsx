import React, { FC } from 'react'
import { ITribeDetail } from './interface'
import { Grid, Typography, Card, CardActionArea, CardHeader } from '@material-ui/core'
import { IUser } from 'src/lib/types/user'
import { ISquad } from 'src/lib/types/squad'
import { Link } from 'react-router-dom'

export const TribeDetail: FC<ITribeDetail> = ({ tribe }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h2'>{tribe.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h3'>Leaders</Typography>
      </Grid>
      {tribe.leaders.map((leader: IUser) => (
        <Grid key={leader.id} item xs={4}>
          {leader.first_name}
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant='h3'>Squads</Typography>
      </Grid>
      {tribe.squads.map((squad: ISquad) => (
        <Grid key={squad.guid} item xs={4}>
          <Card>
            <CardActionArea component={Link} to={`/squads/${squad.guid}`}>
              <CardHeader avatar={'T'} title={`${squad.name}`} />
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
