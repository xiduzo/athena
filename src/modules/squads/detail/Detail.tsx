import React, { FC, useEffect, Dispatch } from 'react'
import { useParams } from 'react-router'
import { getSquadById } from 'src/lib/api/squads'
import { Container, Grid, Typography, makeStyles, Theme } from '@material-ui/core'
import { ISquad } from 'src/lib/types/squad'
import { IUser } from 'src/lib/types/user'
import { UserCard } from 'src/components/Molecules/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { IAction, IRootReducer } from 'src/lib/redux'

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

  const { id } = useParams<ISquadDetailRouteParams>()

  const dispatch = useDispatch<Dispatch<(dispatch: Dispatch<IAction>) => void>>()
  const squad = useSelector<IRootReducer, ISquad | undefined>((state) =>
    state.squads.items.find((item) => item.id === id)
  )

  useEffect(
    () => {
      dispatch(getSquadById(id))
    },
    [ dispatch, id ]
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
