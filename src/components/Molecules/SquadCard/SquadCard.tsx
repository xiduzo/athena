import React, { FC } from 'react'
import { ISquadCard } from './interface'
import { Card, CardActionArea, CardHeader } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const SquadCard: FC<ISquadCard> = ({ squad, onClick }) => {
  const onClickHandler = () => {
    onClick && onClick()
  }
  return (
    <Card>
      <CardActionArea onClick={onClickHandler} component={Link} to={`/squads/${squad.guid}`}>
        <CardHeader avatar={'T'} title={`${squad.name}`} />
      </CardActionArea>
    </Card>
  )
}
