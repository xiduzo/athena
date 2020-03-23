import { useMutation, useQuery } from '@apollo/react-hooks'
import { Box, Container, Grid, makeStyles, MenuItem, Theme, Typography } from '@material-ui/core'
import gql from 'graphql-tag'
import React, { FC, Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { ADD_TRIBE_LEADER, ADD_TRIBE_SQUAD, REMOVE_TRIBE_LEADER, REMOVE_TRIBE_SQUAD } from 'src/common/services'
import { asyncForEach, generalCatchHandler, snackbarWrapper } from 'src/common/utils'
import {
  AddCard,
  EmptyState,
  Illustration,
  Illustrations,
  SquadCard,
  SquadSelector,
  TribeCardMock,
  UserCard,
  UserSelector,
} from 'src/components'
import { ISquad, IUser } from 'src/lib/interfaces'

interface ITribeDetailParams {
  id: string
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(2, 0),
    },
  }
})

export const TribeDetail: FC = () => {
  const { id } = useParams<ITribeDetailParams>()

  const classes = useStyles()
  const { t } = useTranslation()

  const [ squadModalOpen, setSquadModalOpen ] = useState(false)
  const [ userModalOpen, setUserModalOpen ] = useState(false)

  const { loading, error, data, refetch } = useQuery(
    gql`
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
    `,
    {
      variables: {
        id,
      },
    }
  )

  const [ AddTribeLeaders ] = useMutation(ADD_TRIBE_LEADER)
  const [ RemoveTribeLeaders ] = useMutation(REMOVE_TRIBE_LEADER)

  const [ AddTribeSquads ] = useMutation(ADD_TRIBE_SQUAD)
  const [ RemoveTribeSquads ] = useMutation(REMOVE_TRIBE_SQUAD)

  const history = useHistory()

  //#region User
  const navigateToUser = (user: IUser) => history.push(`/user/${user.id}`)
  const toggleUserModal = () => setUserModalOpen(!userModalOpen)

  const createTribeLeadersMutation = (user: IUser) => ({
    variables: {
      from: {
        id: user.id,
      },
      to: {
        id: id,
      },
    },
  })

  const onUserModalCloseHandler = async (users?: IUser[]) => {
    toggleUserModal()
    if (!users) return

    await asyncForEach(users, async (user: IUser) => {
      await AddTribeLeaders(createTribeLeadersMutation(user))
    })

    refetch()
  }

  const removeUserHandler = async (user: IUser) => {
    await RemoveTribeLeaders(createTribeLeadersMutation(user))

    refetch()
  }

  //#endregion

  //#region Squads
  const navigateToSquad = (squad: ISquad) => history.push(`/squad/${squad.id}`)

  const toggleSquadModal = () => setSquadModalOpen(!squadModalOpen)

  const onSquadModalCloseHandler = async (squads?: ISquad[]) => {
    toggleSquadModal()

    if (!squads) return

    await asyncForEach(squads, async (squad: ISquad) => {
      await AddTribeSquads({
        variables: {
          from: squad,
          to: { id: id },
        },
      })
        .then((_) => snackbarWrapper.success(`${squad.name}->${data.Tribe[0].name}`))
        .catch(generalCatchHandler)
    })

    refetch()
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
  //#endregion

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
                  <UserCard
                    user={user}
                    onLeftClick={() => navigateToUser(user)}
                    onRightClickItems={
                      <Box>
                        <MenuItem onClick={() => removeUserHandler(user)}>
                          <Typography color='error'>Remove user</Typography>
                        </MenuItem>
                      </Box>
                    }
                  />
                </Grid>
              ))}
              <UserSelector
                title={`user modal ${data.Tribe[0].name}`}
                without={data.Tribe[0].leaders}
                isOpen={userModalOpen}
                onClose={onUserModalCloseHandler}
              />
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AddCard onClick={toggleUserModal} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h5'>{t('squads')}</Typography>
              </Grid>
              {data.Tribe[0].squads.map((squad: ISquad) => (
                <Grid key={squad.id} item xs={12} sm={6} md={4} lg={3}>
                  <SquadCard
                    squad={squad}
                    onLeftClick={() => navigateToSquad(squad)}
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
              <SquadSelector
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
