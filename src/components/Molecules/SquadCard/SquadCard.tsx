import React, { FC } from 'react'
import { ISquadCard } from './interface'
import { Card, CardActionArea, CardHeader } from '@material-ui/core'

export const SquadCard: FC<ISquadCard> = ({ squad, onClick }) => {
  const onClickHandler = () => {
    onClick && onClick()
  }
  return (
    <Card>
      <CardActionArea onClick={onClickHandler} disabled={onClick ? false : true}>
        <CardHeader avatar={'T'} title={`${squad.name}`} />
      </CardActionArea>
    </Card>
  )
}
