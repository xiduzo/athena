import React, { FC } from 'react'
import { IUserCard } from './IUserCard'
import { Card, CardActionArea, CardHeader, Typography, Box } from '@material-ui/core'
import { Avataaar } from 'src/components/Atoms/Avataaar'

export const userCardAvatarSize: number = 50
export const UserCard: FC<IUserCard> = ({ user, onClick }) => {
  const onClickHandler = () => {
    onClick && onClick()
  }
  return (
    <Card>
      <CardActionArea onClick={onClickHandler} disabled={onClick ? false : true}>
        <CardHeader
          avatar={
            <Avataaar
              avatarStyle='Circle'
              style={{ width: `${userCardAvatarSize}px`, height: `${userCardAvatarSize}px` }}
            />
          }
          title={
            <Typography>
              <Box fontWeight={600} component={'span'}>
                {user.displayName}
              </Box>
            </Typography>
          }
        />
      </CardActionArea>
    </Card>
  )
}
