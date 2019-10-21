import { IAthenaMenuDrawer } from './IAthenaMenuDrawer'

import React from 'react'
import clsx from 'clsx'
import { useStyles } from './AthenaMenuDrawerStyling'
import useTheme from '@material-ui/core/styles/useTheme'
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

export const AthenaMenuDrawer: React.FC<IAthenaMenuDrawer> = ({ menuOpen, toggleMenuDrawer }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: menuOpen,
        [classes.drawerClose]: !menuOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: menuOpen,
          [classes.drawerClose]: !menuOpen,
        }),
      }}
      open={menuOpen}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={toggleMenuDrawer}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon className={classes.ListItemIcon}>
              {index % 2 === 0 ? <AccountBoxIcon /> : <AccountBoxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon className={classes.ListItemIcon}>
              {index % 2 === 0 ? <AccountBoxIcon /> : <AccountBoxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
