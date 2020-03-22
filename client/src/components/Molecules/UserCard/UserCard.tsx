import { Box, CardHeader, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { Avataaar } from 'src/components/Atoms/Avataaar'
import { IUser } from 'src/lib/interfaces'
import { ClickableCard, IClickableCard } from '../ClickableCard'

export interface IUserCard extends IClickableCard {
  user: IUser
}

export const userCardAvatarSize: number = 50
export const UserCard: FC<IUserCard> = ({ user, onLeftClick, onRightClickItems }) => {
  return (
    <ClickableCard
      onLeftClick={onLeftClick}
      onRightClickItems={onRightClickItems}
      cardContent={
        <CardHeader
          avatar={<Avataaar style={{ width: `${userCardAvatarSize}px`, height: `${userCardAvatarSize}px` }} />}
          title={
            <Typography>
              <Box fontWeight={600} component={'span'}>
                {user.displayName}
              </Box>
            </Typography>
          }
        />
      }
    />
  )
}
