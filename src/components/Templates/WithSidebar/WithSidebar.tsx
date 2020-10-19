import {
  Box,
  Container,
  Drawer,
  Fab,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
  Typography,
  Zoom,
} from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'
import { useWidth } from 'src/common/hooks'
import { ContentHeader } from 'src/components'

const drawerWidth = 20
const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: `${drawerWidth}vw`,
    padding: theme.spacing(2),
    border: 'none',
    borderRadius: theme.spacing(3, 0, 0, 3),
    boxShadow: theme.shadows[2],
    [theme.breakpoints.only('sm')]: {
      width: `40vw`,
    },
    [theme.breakpoints.only('xs')]: {
      width: `75vw`,
    },
  },
  mainContent: {
    flexGrow: 1,
  },
  fab: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(2),
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  fieldset: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  wrapper: {
    display: 'flex',
  },
}))

interface WithSidebarProps {
  drawerContent: JSX.Element
  mainContent: JSX.Element
  drawerIcon: JSX.Element
  title: string
  action?: {
    title: string
    event: () => void
    icon: JSX.Element
  }
}

export const WithSidebar: FC<WithSidebarProps> = (props) => {
  const classes = useStyles()
  const width = useWidth()

  const { drawerContent, mainContent, title, drawerIcon, action } = props

  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  useEffect(() => {
    if (['xs', 'sm'].indexOf(width) === -1) setDrawerOpen(false)
  }, [width])

  return (
    <Box className={classes.wrapper}>
      {action && (
        <Hidden mdUp={true}>
          <Zoom in>
            <Fab color='primary' onClick={action.event} className={classes.fab}>
              {action.icon}
            </Fab>
          </Zoom>
        </Hidden>
      )}
      <Box className={classes.mainContent}>
        <ContentHeader />
        <Container maxWidth='lg'>
          <Box display={'flex'} justifyContent={`space-between`} pb={3}>
            <Typography variant='h4'>{title}</Typography>
            <Hidden mdUp={true}>
              <IconButton aria-label='filter' onClick={toggleDrawer}>
                {drawerIcon}
              </IconButton>
            </Hidden>
          </Box>
          {mainContent}
        </Container>
      </Box>
      <Drawer
        variant={['xs', 'sm'].indexOf(width) > -1 ? 'temporary' : 'permanent'}
        anchor='right'
        open={drawerOpen}
        className={classes.drawer}
        classes={{
          paper: classes.drawer,
        }}
        onClose={toggleDrawer}
      >
        {drawerContent}
      </Drawer>
    </Box>
  )
}
