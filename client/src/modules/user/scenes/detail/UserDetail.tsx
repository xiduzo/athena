import { useQuery } from '@apollo/react-hooks'
import { Container, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import gql from 'graphql-tag'
import React, { FC, Fragment } from 'react'
import { useParams } from 'react-router'
import { Avataaar } from 'src/components'

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
      zIndex: 9000,
    },
    userInfo: {
      padding: theme.spacing(8, 2, 2, 2),
    },
  }
})

export const UserDetailRoute: FC = () => {
  const { id } = useParams<IUserDetailRouteParams>()

  const classes = useStyles()

  const { loading, error, data } = useQuery(
    gql`
      query User($id: String!) {
        User(filter: { id: $id }) {
          id
          displayName
        }
      }
    `,
    {
      variables: {
        id,
      },
    }
  )

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
              <Avataaar style={{ width: `100px`, height: `100px` }} />
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
          </Fragment>
        )}
        {/* <Grid item xs={12} className={classes.avatar}>
              <Avataaar avatarStyle='Circle' style={{ width: `100px`, height: `100px` }} />
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.userInfo}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h4' align='center'>
                      {user.displayName}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Squads</Typography>
            </Grid> */}
      </Grid>
    </Container>
  )
}
