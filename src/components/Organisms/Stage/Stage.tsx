import { Box, makeStyles, Theme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import React, { FC, Suspense, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'src/common/providers'
import { MenuDrawer, Routes, ToolbarSpacer } from 'src/components'

const useStyles = makeStyles((theme: Theme) => {
  return {
    main: {
      flexGrow: 1,
      height: `100vh`,
      borderRadius: theme.spacing(3, 0, 0, 3),
      background: blue[50],
      boxShadow: theme.shadows[4],
      zIndex: theme.zIndex.drawer + 1,
      overflowY: 'scroll',
    },
    root: {
      display: 'flex',
      background: 'white',
    },
  }
})

export const Stage: FC = () => {
  const classes = useStyles()

  const { session, credentials } = useAuth()

  const history = useHistory()

  useEffect((): void => {
    if (!session) return
    if (!credentials) return
  }, [session, credentials, history])

  return (
    <Box className={classes.root}>
      <Suspense fallback={'loading'}>
        {session && credentials && <MenuDrawer />}
        <main className={classes.main}>
          <Routes />
          <ToolbarSpacer smUp />
        </main>
      </Suspense>
    </Box>
  )
}
