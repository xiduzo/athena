import {
  Box,
  Container,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'
import { useWidth } from 'src/common/hooks'
import { ToolbarSpacer } from 'src/components'

const drawerWidth = 20
const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: `${drawerWidth}vw`,
    padding: theme.spacing(2),
    [theme.breakpoints.only('sm')]: {
      width: `${drawerWidth * 2}vw`,
    },
    [theme.breakpoints.only('xs')]: {
      width: `${drawerWidth * 3.5}vw`,
    },
  },
  fab: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(2),
    zIndex: theme.zIndex.mobileStepper,
    [theme.breakpoints.up('md')]: {
      right: drawerWidth,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: (theme.mixins.toolbar.minHeight as number) + theme.spacing(2),
    },
  },
  root: {
    padding: theme.spacing(2, 3),
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
}

export const WithSidebar: FC<WithSidebarProps> = (props) => {
  const classes = useStyles()
  const width = useWidth()

  const { drawerContent, mainContent, title, drawerIcon } = props

  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  useEffect(() => {
    if (['xs', 'sm'].indexOf(width) === -1) setDrawerOpen(false)
  }, [width])

  return (
    <Box className={classes.wrapper}>
      <Container maxWidth='lg' className={classes.root}>
        <Grid container spacing={2}>
          <Grid item container justify={`space-between`} alignItems={`center`} xs={12}>
            <Typography variant='h4'>{title}</Typography>
            <Hidden mdUp={true}>
              <IconButton aria-label='filter' onClick={toggleDrawer}>
                {drawerIcon}
              </IconButton>
            </Hidden>
          </Grid>
          {mainContent}
        </Grid>
      </Container>
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
        <ToolbarSpacer smDown />
        {drawerContent}
      </Drawer>
    </Box>
  )
}
