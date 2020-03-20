import { useMutation, useQuery } from '@apollo/react-hooks'
import { Box, Container, Grid, makeStyles, MenuItem, Theme, Typography } from '@material-ui/core'
import gql from 'graphql-tag'
import React, { FC, Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { ADD_TRIBE_SQUAD, REMOVE_TRIBE_SQUAD } from 'src/common/services/tribeService'
import { asyncForEach } from 'src/common/utils/asyncForEach'
import { snackbarWrapper } from 'src/common/utils/snackbarWrapper'
import { generalCatchHandler } from 'src/common/utils/superagentWrapper'
import { AddCard } from 'src/components/Atoms'
import { Illustration, Illustrations } from 'src/components/Atoms/Illustration/Illustration'
import { EmptyState } from 'src/components/Molecules/EmptyState/EmptyState'
import { SquadCard } from 'src/components/Molecules/SquadCard'
import { TribeCardMock } from 'src/components/Molecules/TribeCard'
import { UserCard } from 'src/components/Molecules/UserCard'
import { ISquad, IUser } from 'src/lib/interfaces'
import { SquadsSelector } from './components/SquadSelector'

interface ITribeDetailRouteParams {
  id: string
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(2, 0),
    },
  }
})

export const TribeDetailRoute: FC = () => {
  const { id } = useParams<ITribeDetailRouteParams>()

  const classes = useStyles()
  const { t } = useTranslation()

  const [ squadModalOpen, setSquadModalOpen ] = useState(false)

  const [ pageQuery ] = useState(gql`
    query Tribe($id: String!) {
      Tribe(filter: { id: $id }) {
        id
        name
        squads {
          id
          name
        }
        leaders {
          id
          displayName
        }
      }
    }
  `)

  const { loading, error, data, refetch } = useQuery(pageQuery, {
    variables: {
      id,
    },
  })

  const [ AddTribeSquads ] = useMutation(ADD_TRIBE_SQUAD)
  const [ RemoveTribeSquads ] = useMutation(REMOVE_TRIBE_SQUAD)

  const history = useHistory()

  const gotoSquad = (squadId: string) => history.push(`/squads/${squadId}`)

  const toggleSquadModal = () => setSquadModalOpen(!squadModalOpen)

  const onSquadModalCloseHandler = async (squads?: ISquad[]) => {
    await asyncForEach(squads || [], async (squad: ISquad) => {
      await AddTribeSquads({
        variables: {
          from: { id: squad.id },
          to: { id: id },
        },
      })
        .then((_) => snackbarWrapper.success(`${squad.name}->${data.Tribe[0].name}`))
        .catch(generalCatchHandler)
    })

    refetch()
    toggleSquadModal()
  }

  const removeSquadHandler = async (squad: ISquad) => {
    await RemoveTribeSquads({
      variables: {
        from: { id: squad.id },
        to: { id: id },
      },
    })
      .then((_) => snackbarWrapper.success(`$removed {squad.name}->${data.Tribe[0].name}`))
      .catch(generalCatchHandler)

    refetch()
  }

  return (
    <section className={classes.root}>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {loading ? (
            Array.from({ length: 12 }).map((_, index: number) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <TribeCardMock />
              </Grid>
            ))
          ) : error ? (
            <div>{error.message}</div>
          ) : !data.Tribe.length ? (
            <Grid item xs={12}>
              <EmptyState title={t('tribeNotFound')} image={<Illustration type={Illustrations.notFound} />} />
            </Grid>
          ) : (
            <Fragment>
              <Grid item xs={12}>
                <Typography variant='h3'>{data.Tribe[0].name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h5'>Leaders</Typography>
              </Grid>
              {data.Tribe[0].leaders.map((user: IUser) => (
                <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
                  <UserCard user={user} />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography variant='h5'>{t('squads')}</Typography>
              </Grid>
              {data.Tribe[0].squads.map((squad: ISquad) => (
                <Grid key={squad.id} item xs={12} sm={6} md={4} lg={3}>
                  <SquadCard
                    onLeftClick={() => gotoSquad(squad.id)}
                    squad={squad}
                    onRightClickItems={
                      <Box>
                        <MenuItem onClick={() => removeSquadHandler(squad)}>
                          <Typography color='error'>Remove squad</Typography>
                        </MenuItem>
                      </Box>
                    }
                  />
                </Grid>
              ))}
              <SquadsSelector
                title={`Select squads to add to ${data.Tribe[0].name}`}
                without={data.Tribe[0].squads}
                isOpen={squadModalOpen}
                onClose={onSquadModalCloseHandler}
              />
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AddCard onClick={toggleSquadModal} />
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Container>
    </section>
  )
}
