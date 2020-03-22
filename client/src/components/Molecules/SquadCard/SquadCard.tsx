import { CardHeader } from '@material-ui/core'
import React, { FC } from 'react'
import { ISquad } from 'src/lib/interfaces'
import { ClickableCard, IClickableCard } from '../ClickableCard'

interface ISquadCard extends IClickableCard {
  squad: ISquad
}

export const SquadCard: FC<ISquadCard> = ({ squad, onLeftClick, onRightClickItems }) => {
  return (
    <ClickableCard
      onLeftClick={onLeftClick}
      onRightClickItems={onRightClickItems}
      cardContent={<CardHeader avatar={'T'} title={`${squad.name}`} />}
    />
  )
}
