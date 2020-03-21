import React, { FC, useEffect, useState } from 'react'
import { IUser } from 'src/lib/interfaces'
import { useParams } from 'react-router'
import { Container, Grid, Paper, makeStyles, Theme, Typography } from '@material-ui/core'
import { Avataaar } from 'src/components/Atoms/Avataaar'

interface IUserDetailRouteParams {
  id: string
}

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(4, 0, 12, 0),
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
  const classes = useStyles()

  const [ user, setUser ] = useState<IUser>()

  const { id } = useParams<IUserDetailRouteParams>()

  return (
    <section className={classes.root}>
      {user && (
        <Container maxWidth={'lg'}>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.avatar}>
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
            </Grid>
          </Grid>
        </Container>
      )}
    </section>
  )
}
