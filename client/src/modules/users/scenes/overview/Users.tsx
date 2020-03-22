import { useQuery } from '@apollo/react-hooks'
import { Container, Fab, Grid, Typography, makeStyles, Theme } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import gql from 'graphql-tag'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'
import { Illustration, Illustrations } from 'src/components/Atoms/Illustration/Illustration'
import { EmptyState } from 'src/components/Molecules/EmptyState'
import { UserCard, UserCardMock } from 'src/components/Molecules/UserCard'
import { IUser } from 'src/lib/interfaces'

const useStyles = makeStyles((theme: Theme) => {
  return {
    fab: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      margin: theme.spacing(2),
    },
    root: {
      padding: theme.spacing(2, 3),
    },
  }
})

export const UsersRoute: FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const { loading, error, data } = useQuery(gql`
    query {
      User {
        id
        displayName
      }
    }
  `)

  const location = useLocation()
  const history = useHistory()

  const navigateToUser = (user: IUser) => history.push(`${location.pathname}/${user.id}`)

  return (
    <Container maxWidth='lg' className={classes.root}>
      <Fab color='primary' aria-label='New agreement' className={classes.fab}>
        <AddIcon />
      </Fab>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4'>{t(`users`)}</Typography>
        </Grid>
        {loading ? (
          Array.from({ length: 12 }).map((_, index: number) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <UserCardMock />
            </Grid>
          ))
        ) : error ? (
          <div>{error.message}</div>
        ) : !data.User.length ? (
          <Grid item xs={12}>
            <EmptyState title={t('usersNotFound')} image={<Illustration type={Illustrations.empty} />} />
          </Grid>
        ) : (
          data.User.map((user: IUser) => (
            <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
              <UserCard user={user} onLeftClick={() => navigateToUser(user)} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  )
}
