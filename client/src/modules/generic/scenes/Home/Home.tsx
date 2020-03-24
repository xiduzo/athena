import React, { FC, useEffect } from 'react'
import { Container, makeStyles, Grid, Typography, Theme } from '@material-ui/core'
import { useAuth } from 'src/common/providers'
import { getUserGroups, hasMatchesWith } from 'src/common/utils'
import { UserRole } from 'src/lib/enums'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(2, 0),
    },
  }
})

export const Home: FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { session } = useAuth()

  useEffect(
    () => {
      if (!session) return
      const userGroups: string[] = session ? getUserGroups(session) : []
      const isRoot = hasMatchesWith<string>([ UserRole.Root ], userGroups)
      const isAdmin = hasMatchesWith<string>([ UserRole.Admin ], userGroups)
      const isLeader = hasMatchesWith<string>([ UserRole.Leader ], userGroups)
      const isUser = hasMatchesWith<string>([ UserRole.Member ], userGroups)
      console.log(isRoot, isAdmin, isLeader, isUser)

      if (isAdmin) return history.push(`/student/dashboard`)
      if (isUser) return history.push(`/student/dashboard`)
    },
    [ session ]
  )

  return (
    <section className={classes.root}>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant={`h4`}>Welcome back</Typography>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
