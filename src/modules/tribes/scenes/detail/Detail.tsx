import React, { FC, useState, useEffect, Dispatch } from 'react'
import { Container, Grid, Typography, makeStyles, Theme, Card, CardActionArea, CardContent } from '@material-ui/core'
import { ITribe } from 'src/lib/types/tribe'
import { useParams } from 'react-router'
import { getTribeById, updateTribe } from 'src/lib/api'
import { IUser } from 'src/lib/types/user'
import { UserCard } from 'src/components/Molecules/UserCard'
import { ISquad } from 'src/lib/types/squad'
import { SquadCard } from 'src/components/Molecules/SquadCard'

import AddIcon from '@material-ui/icons/Add'
import { SquadSelector } from './components/SquadSelector'
import { useSelector, useDispatch } from 'react-redux'
import { IRootReducer, IAction } from 'src/lib/redux'

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
  const { id } = useParams<ITribeDetailRouteParams>()

  const tribe = useSelector<IRootReducer, ITribe | undefined>((state) =>
    state.tribes.items.find((item) => item.id === id)
  )
  const dispatch = useDispatch<Dispatch<(dispatch: Dispatch<IAction>) => void>>()

  const [ squadModalOpen, setSquadModalOpen ] = useState(false)

  useEffect(
    () => {
      if (id && !tribe) dispatch(getTribeById(id))
    },
    [ id, tribe, dispatch ]
  )

  const toggleSquadModal = () => setSquadModalOpen(!squadModalOpen)

  const onSquadModalCloseHandler = (squads?: ISquad[]) => {
    if (tribe && squads) dispatch(updateTribe(tribe, { squads: [ ...tribe.squads, ...squads ] }))
    toggleSquadModal()
  }

  return (
    <section className={classes.main}>
      <Container maxWidth="lg">
        {tribe && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">{tribe.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Leaders</Typography>
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
              <Grid key={squad.id} item xs={12} sm={6} md={4} lg={3}>
                <SquadCard squad={squad} />
              </Grid>
            ))}
            <SquadSelector
              title={`Select squads to add to ${tribe.name}`}
              without={tribe.squads}
              isOpen={squadModalOpen}
              onClose={onSquadModalCloseHandler}
            />
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardActionArea onClick={toggleSquadModal}>
                  <CardContent>
                    <Grid container justify="center" alignItems="center">
                      <AddIcon />
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </section>
  )
}
