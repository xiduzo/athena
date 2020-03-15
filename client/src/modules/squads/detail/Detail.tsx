import React, { FC, useEffect, Suspense, useState } from 'react'
import { useParams } from 'react-router'
import { updateSquad, getSquads } from 'src/lib/api/squads'
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Theme,
  Card,
  CardActionArea,
  CardContent,
  Box,
  MenuItem,
} from '@material-ui/core'
import { ISquad } from 'src/lib/types/squad'
import { IUser } from 'src/lib/types/user'
import { UserCard } from 'src/components/Molecules/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { IAgreement } from 'src/lib/types/agreement'
import { addSquadAgreement, getAgreements } from 'src/lib/api'
import { AgreementCard } from 'src/components/Molecules/AgreementCard'
import { AgreementsSelector } from './components/AgreementSelector'
import AddIcon from '@material-ui/icons/Add'
import { DispatchAction, IRootReducer } from 'src/lib/redux/rootReducer'
import { logPerformance } from 'src/common/utils/performanceHelper'

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

  const dispatch = useDispatch<DispatchAction>()

  const [ agreementsModalOpen, setAgreementsModalOpen ] = useState(false)

  const squad = useSelector<IRootReducer, ISquad | undefined>((state) => {
    const squad = state.squads.items.find((item) => item.id === id)
    return squad
  })

  const squadMembers = useSelector<IRootReducer, IUser[]>((state) => {
    if (!squad) return []

    const foundMembers = state.users.items.filter((user) => squad.members.includes(user.id))
    return foundMembers
  })
  const squadAgreements = useSelector<IRootReducer, IAgreement[]>((state) => {
    if (!squad) return []

    // const foundAgreements = state.agreements.items.filter((agreement) => squad.agreements.includes(agreement.id))

    return state.agreements.items
  })

  const toggleAgreementsModal = () => setAgreementsModalOpen(!agreementsModalOpen)

  const onAgreementsModalCloseHandler = (agreements?: IAgreement[]) => {
    if (squad && agreements) agreements.map((agreement) => dispatch(addSquadAgreement(agreement, squad)))

    toggleAgreementsModal()
  }

  const removeAgreementHandler = (agreementId: string) => {
    // if (squad)
    // dispatch(updateSquad(squad, { agreements: squad.agreements.filter((agreement) => agreement !== agreementId) }))
  }

  useEffect(
    () => {
      if (squad) return
      dispatch(getSquads([ id ]))
    },
    [ id, squad, dispatch ]
  )

  // useEffect(
  //   () => {
  //     if (!squad || !squad.members.length) return
  //     const missingMembers = squad.members.filter((user) => !squadMembers.map((sm) => sm.id).includes(user))
  //     console.log(`missing members (${missingMembers.length}): ${missingMembers}`)
  //   },
  //   [ squadMembers, squad ]
  // )

  useEffect(
    () => {
      if (!squad || !squad.agreements.length) return

      // const missingAgreements = squad.agreements.filter(
      //   (agreement) => !squadAgreements.map((sa) => sa.id).includes(agreement)
      // )

      // dispatch(getAgreements(missingAgreements))
    },
    [ squadAgreements, squad, dispatch ]
  )

  return (
    <section className={classes.main}>
      <Container maxWidth='lg'>
        <Suspense fallback={'getting there'}>
          {squad && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant={`h3`}>{squad.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant={`h5`}>{`Members`}</Typography>
              </Grid>
              {squadMembers &&
                squadMembers.map((user) => (
                  <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
                    <UserCard user={user} />
                  </Grid>
                ))}
              <Grid item xs={12}>
                <Typography variant={`h5`}>{`Agreements`}</Typography>
              </Grid>
              {squadAgreements &&
                squadAgreements.map((agreement) => (
                  <Grid key={agreement.id} item xs={12} sm={6} md={4} lg={3}>
                    <AgreementCard
                      agreement={agreement}
                      onRightClickItems={
                        <Box>
                          <MenuItem onClick={() => removeAgreementHandler(agreement.id)}>
                            <Typography color='error'>Remove agreement</Typography>
                          </MenuItem>
                        </Box>
                      }
                    />
                  </Grid>
                ))}
              <AgreementsSelector
                title={`Select agreements to add to ${squad.name}`}
                without={squadAgreements || []}
                isOpen={agreementsModalOpen}
                onClose={onAgreementsModalCloseHandler}
              />
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardActionArea onClick={toggleAgreementsModal}>
                    <CardContent>
                      <Grid container justify='center' alignItems='center'>
                        <AddIcon />
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Typography variant={`h5`}>{`Feedback`}</Typography>
              </Grid>
              {/* {squad.feedback.map((feedback) => (
                <Grid key={feedback} item xs={12} sm={6} md={4} lg={3}>
                  {feedback}
                </Grid>
              ))} */}
            </Grid>
          )}
        </Suspense>
      </Container>
    </section>
  )
}
