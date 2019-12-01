import React, { FC } from 'react'
import { IUserCard } from './interface'
import { Card, CardActionArea, CardHeader, CardContent } from '@material-ui/core'
import { Avataaar } from '../../Avataaar'

export const UserCard: FC<IUserCard> = ({ user, onClick }) => {
  const onClickHandler = () => {
    onClick && onClick()
  }
  return (
    <Card>
      <CardActionArea onClick={onClickHandler} disabled={onClick ? false : true}>
        <CardHeader
          avatar={<Avataaar avatarStyle="Circle" />}
          title={`${user.first_name} ${user.surname_prefix || ''} ${user.surname}`}
          subheader={`${user.is_superuser && 'admin'} ${user.is_staff && 'lecturer'} ${!user.is_staff && 'student'}`}
        />
        <CardContent>general information</CardContent>
      </CardActionArea>
    </Card>
  )
}
