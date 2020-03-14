import React, { FC } from 'react'
import { IUserCard } from './interface'
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
                {user.first_name} {user.surname_prefix || ''} {user.surname}
              </Box>
            </Typography>
          }
          subheader={`${user.is_superuser && 'admin'} ${user.is_staff && 'lecturer'} ${!user.is_staff && 'student'}`}
        />
      </CardActionArea>
    </Card>
  )
}
