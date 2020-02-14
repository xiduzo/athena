import React, { FC } from 'react'
import { Card, CardActionArea, CardHeader } from '@material-ui/core'
import { ISquad } from 'src/lib/types/squad'

interface ISquadCard {
  squad: ISquad
  onLeftClick?: () => void
  onRightClickItems?: React.ReactElement
}

export const SquadCard: FC<ISquadCard> = ({ squad, onLeftClick, onRightClickItems }) => {
  const onLeftClickHandler = () => {
    onLeftClick && onLeftClick()
  }
  return (
    <Card>
      <CardActionArea onClick={onLeftClickHandler}>
        <CardHeader avatar={'T'} title={`${squad.name}`} />
      </CardActionArea>
    </Card>
  )
}
