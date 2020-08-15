import { useQuery } from '@apollo/react-hooks'
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
  IconButton,
} from '@material-ui/core'
import gql from 'graphql-tag'
import React, { FC, Fragment, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { Avataaar, AvatarCreator, SquadCard } from 'src/components'
import { useAuth } from 'src/common/providers'
import { ISquad } from 'src/lib/interfaces'

interface IUserDetailRouteParams {
  id: string
}

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(2, 3),
    },
    avatar: {
      display: ' flex',
      justifyContent: 'center',
      marginBottom: theme.spacing(-8),
      zIndex: theme.zIndex.appBar - 1,
    },
    userInfo: {
      padding: theme.spacing(8, 2, 2, 2),
    },
  }
})

export const UserDetailRoute: FC = () => {
  const { id } = useParams<IUserDetailRouteParams>()
  const { userInfo } = useAuth()
  const history = useHistory()

  const classes = useStyles()

  const [avatarCreatorOpen, setAvatarCreatorOpen] = useState(false)

  const { loading, error, data, refetch } = useQuery(
    gql`
      query User($id: String!) {
        User(filter: { id: $id }) {
          id
          displayName
          avatarStyle
          squads {
            id
            name
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

  const toggleChangeUser = () => {
    setAvatarCreatorOpen(!avatarCreatorOpen)
    refetch()
  }

  const navigateToSquad = (squadId: string) => history.push(`/squad/${squadId}`)

  return (
    <Container maxWidth={'lg'} className={classes.root}>
      <Grid container spacing={2}>
        {loading ? (
          <div>loading</div>
        ) : error ? (
          <div>error</div>
        ) : !data.User.length ? (
          <div>empty</div>
        ) : (
          <Fragment>
            <Grid item xs={12} className={classes.avatar}>
              <IconButton onClick={toggleChangeUser} disabled={!userInfo || userInfo.id !== id}>
                <Avataaar
                  avatar={{
                    style: { width: `100px`, height: `100px` },
                  }}
                  user={data.User[0]}
                />
              </IconButton>
              <AvatarCreator
                isOpen={avatarCreatorOpen}
                user={data.User[0]}
                onClose={toggleChangeUser}
              />
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.userInfo}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h4' align='center'>
                      {data.User[0].displayName}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Squads</Typography>
            </Grid>
            {data.User[0]?.squads.map((squad: ISquad) => (
              <Grid key={squad.id} item xs={12} sm={6} md={4} lg={3}>
                <SquadCard squad={squad} onLeftClick={() => navigateToSquad(squad.id)} />
              </Grid>
            ))}
          </Fragment>
        )}
      </Grid>
    </Container>
  )
}
