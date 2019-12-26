import React, { FC, useEffect, Dispatch } from 'react'
import { getTribes } from 'src/lib/api'
import { useStyles } from './style'
import { Fab, Container, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { ITribe } from 'src/lib/types/tribe'
import { TribeCard, TribeCardMock } from 'src/components/Molecules/TribeCard'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IRootReducer, Status, IAction } from 'src/lib/redux'
import { ITribesState } from 'src/lib/redux/tribes/tribesReducer'

export const TribesRoute: FC = () => {
  const classes = useStyles()

  const dispatch = useDispatch<Dispatch<(dispatch: Dispatch<IAction>) => void>>()
  const tribes = useSelector<IRootReducer, ITribesState>((state) => state.tribes)

  const location = useLocation()
  const history = useHistory()

  useEffect(
    () => {
      dispatch(getTribes())
    },
    [ dispatch ]
  )

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
          {tribes.status === Status.loading &&
            [ ...new Array(48) ].map((_, index: number) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <TribeCardMock />
              </Grid>
            ))}
          {tribes.status !== Status.loading &&
            tribes.items.map((tribe: ITribe) => (
              <Grid key={tribe.guid} item xs={12} sm={6} md={4} lg={3}>
                <TribeCard tribe={tribe} onClick={() => navigateToTribe(tribe.guid)} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </section>
  )
}
