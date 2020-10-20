import {
  Box,
  Button,
  Container,
  Drawer,
  Fab,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
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
  },
  paper: {
    border: 'none',
    borderRadius: theme.spacing(3, 0, 0, 3),
    padding: theme.spacing(2),
    width: `${drawerWidth}vw`,
    boxShadow: theme.shadows[2],
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
  title: {
    fontWeight: theme.typography.fontWeightLight,
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
            <Tooltip title={action.title}>
              <Fab color='primary' onClick={action.event} className={classes.fab}>
                {action.icon}
              </Fab>
            </Tooltip>
          </Zoom>
        </Hidden>
      )}
      <Box className={classes.mainContent}>
        <ContentHeader />
        <Container maxWidth='lg'>
          <Box display={'flex'} justifyContent={`space-between`} alignItems={'center'} pb={3}>
            <Typography variant='h5' className={classes.title}>
              {title}
            </Typography>
            {action && (
              <Hidden smDown={true}>
                <Button
                  color={'primary'}
                  variant={'contained'}
                  onClick={action.event}
                  startIcon={action.icon}
                >
                  {action.title}
                </Button>
              </Hidden>
            )}
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
          paper: classes.paper,
        }}
        onClose={toggleDrawer}
      >
        {drawerContent}
      </Drawer>
    </Box>
  )
}
