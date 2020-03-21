import React, { FC } from 'react'
import { makeStyles, Theme, Hidden, Tooltip, Icon } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { IRootReducer } from 'src/common/redux/rootReducer'
import { green, red } from '@material-ui/core/colors'
import KeyboardIcon from '@material-ui/icons/Keyboard'

export const useStyles = makeStyles((theme: Theme) => ({
  hotkeysInfo: {
    color: theme.palette.grey[400],
    // margin: theme.spacing(2),
    '&:hover': {
      cursor: 'help',
    },
  },
}))

export const HotkeysIndicator: FC = () => {
  const classes = useStyles()

  const hotkeysEnabled = useSelector((state: IRootReducer) => state.global.hotkeysEnabled)

  return (
    <Hidden smDown>
      <Tooltip title={`hotkeys ${hotkeysEnabled ? 'enabled' : 'disabled'}`}>
        <Icon
          component={KeyboardIcon}
          style={{ color: hotkeysEnabled ? green[500] : red[500] }}
          className={classes.hotkeysInfo}
        />
      </Tooltip>
    </Hidden>
  )
}
