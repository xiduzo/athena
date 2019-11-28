import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { GetSquadById } from 'src/lib/api/squads'
import { Container } from '@material-ui/core'
import { SquadDetail } from 'src/components/Squads/SquadDetail/SquadDetail'
import { ISquad } from 'src/lib/types/squad'

interface ISquadDetailRouteParams {
  id: string
}

export const SquadDetailRoute: FC = () => {
  const [squad, setSquad] = useState<ISquad>()

  const { id } = useParams<ISquadDetailRouteParams>()

  useEffect(() => {
    GetSquadById(id)
      .then((response: ISquad) => {
        setSquad(response)
        console.log(response)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [id])
  return (
    <Container maxWidth='lg'>
      <h1>squad detail</h1>
      {squad && <SquadDetail squad={squad} />}
    </Container>
  )
}
