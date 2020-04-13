import { Container, makeStyles, Theme } from '@material-ui/core'
import React, { FC, Suspense, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'src/common/providers'
import { AppBar, MenuDrawer, Routes, ToolbarSpacer } from 'src/components'

const useStyles = makeStyles((_: Theme) => {
  return {
    content: {
      flexGrow: 1,
      minHeight: `100vh`,
    },
    root: {
      display: 'flex',
      padding: 0,
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
    <Container maxWidth={false} className={classes.root}>
      <Suspense fallback={'loading'}>
        <AppBar />
        {session && credentials && <MenuDrawer />}
        <main className={classes.content}>
          {/* TODO: add breadcrumbs? */}
          <ToolbarSpacer xsDown />
          <Routes />
          <ToolbarSpacer smUp />
        </main>
      </Suspense>
    </Container>
  )
}
