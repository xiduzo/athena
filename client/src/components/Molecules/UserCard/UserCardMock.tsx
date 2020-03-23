import React, { FC } from 'react'
import { Card, CardHeader, makeStyles, Theme, Avatar } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import { userCardAvatarSize } from './UserCard'

const useStyles = makeStyles((theme: Theme) => {
  return {
    avatar: {
      background: theme.palette.grey[100],
      width: userCardAvatarSize,
      height: userCardAvatarSize,
    },
  }
})

export const UserCardMock: FC = () => {
  const classes = useStyles()

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <Skeleton variant='circle' />
          </Avatar>
        }
        title={<Skeleton variant='text' />}
        subheader={<Skeleton variant='text' />}
      />
    </Card>
  )
}
