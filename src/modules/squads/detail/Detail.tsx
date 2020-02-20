import React, { FC, useEffect, Dispatch, Suspense } from 'react'
import { useParams } from 'react-router'
import { getSquadById } from 'src/lib/api/squads'
import { Container, Grid, Typography, makeStyles, Theme } from '@material-ui/core'
import { ISquad } from 'src/lib/types/squad'
import { IUser } from 'src/lib/types/user'
import { UserCard } from 'src/components/Molecules/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { IAction, IRootReducer } from 'src/lib/redux'
import { IAgreement } from 'src/lib/types/agreement'
import { getAgreement } from 'src/lib/api'
import { AgreementCard } from 'src/components/Molecules/AgreementCard'

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

    const foundAgreements = state.agreements.items.filter((agreement) => squad.agreements.includes(agreement.id))
    console.log(foundAgreements)

    return foundAgreements
  })

  useEffect(
    () => {
      if (!squad) dispatch(getSquadById(id))
    },
    [ id, squad, dispatch ]
  )

  useEffect(
    () => {
      if (!squad) return

      const missingMembers = squad.members.filter((user) => !squadMembers.map((sm) => sm.id).includes(user))
      console.log(`missing members: ${missingMembers}`)
    },
    [ squadMembers, squad ]
  )

  useEffect(
    () => {
      if (!squad) return

      const missingAgreements = squad.agreements.filter(
        (agreement) => !squadAgreements.map((sa) => sa.id).includes(agreement)
      )

      missingAgreements.forEach((agreement) => dispatch(getAgreement(agreement)))
    },
    [ squadAgreements, squad, dispatch ]
  )

  return (
    <section className={classes.main}>
      <Container maxWidth="lg">
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
                    <AgreementCard agreement={agreement} />
                  </Grid>
                ))}
            </Grid>
          )}
        </Suspense>
      </Container>
    </section>
  )
}
