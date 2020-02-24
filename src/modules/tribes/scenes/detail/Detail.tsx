import React, { FC, useState, useEffect, Dispatch } from 'react'
import { Container, Grid, Typography, makeStyles, Theme, Card, CardActionArea, CardContent } from '@material-ui/core'
import { ITribe } from 'src/lib/types/tribe'
import { useParams } from 'react-router'
import { getTribeById, updateTribe, getSquads } from 'src/lib/api'
import { IUser } from 'src/lib/types/user'
import { UserCard } from 'src/components/Molecules/UserCard'
import { ISquad } from 'src/lib/types/squad'
import { SquadCard } from 'src/components/Molecules/SquadCard'

import AddIcon from '@material-ui/icons/Add'
import { SquadsSelector } from './components/SquadSelector'
import { useSelector, useDispatch } from 'react-redux'
import { IRootReducer, IAction } from 'src/lib/redux'
import { useHistory } from 'react-router-dom'

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
  const history = useHistory()

  const tribe = useSelector<IRootReducer, ITribe | undefined>((state) =>
    state.tribes.items.find((item) => item.id === id)
  )
  const tribeSquads = useSelector<IRootReducer, ISquad[] | undefined>((state) => {
    if (!tribe) return undefined

    const squads = state.squads.items.filter((squad) => tribe.squads.includes(squad.id))

    // Get missing squads
    const missingSquads = tribe.squads.filter((squad) => !tribe.squads.includes(squad))
    if (missingSquads.length) dispatch(getSquads()) // TODO: only get the squads we need

    if (squads.length) return squads

    return undefined
  })

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
    if (tribe && squads) dispatch(updateTribe(tribe, { squads: [ ...tribe.squads, ...squads.map((s) => s.id) ] }))
    toggleSquadModal()
  }

  const gotoSquad = (squadId: string) => {
    history.push(`/squads/${squadId}`)
  }

  return (
    <section className={classes.main}>
      <Container maxWidth="lg">
        {tribe && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">{tribe.name}</Typography>
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
            {tribeSquads &&
              tribeSquads.map((squad: ISquad) => (
                <Grid key={squad.id} item xs={12} sm={6} md={4} lg={3}>
                  <SquadCard onLeftClick={() => gotoSquad(squad.id)} squad={squad} />
                </Grid>
              ))}
            <SquadsSelector
              title={`Select squads to add to ${tribe.name}`}
              without={tribeSquads || []}
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
