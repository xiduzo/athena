import { useQuery } from '@apollo/react-hooks'
import { Container, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import gql from 'graphql-tag'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'
import { EmptyState, Illustration, UserCard, UserCardMock } from 'src/components'
import { IUser } from 'src/lib/interfaces'
import { IllustrationType } from 'src/lib/enums'

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

export const UserOverview: FC = () => {
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
            <EmptyState title={t('usersNotFound')} image={<Illustration type={IllustrationType.Empty} />} />
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
