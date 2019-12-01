import React, { FC } from 'react'
import { Card, CardActionArea, CardHeader } from '@material-ui/core'
import { ITribeCard } from './interface'

export const TribeCard: FC<ITribeCard> = ({ tribe, onClick }) => {
  const onClickHandler = () => {
    onClick && onClick()
  }

  return (
    <Card>
      <CardActionArea onClick={onClickHandler} disabled={onClick ? false : true}>
        <CardHeader avatar={'K'} title={`${tribe.name}`} />
      </CardActionArea>
    </Card>
  )
}
