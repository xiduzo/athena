import React, { FC } from 'react'
import { ISquadDetail } from './interface'

export const SquadDetail: FC<ISquadDetail> = ({ squad }) => {
  return <div>{squad.name}</div>
}
