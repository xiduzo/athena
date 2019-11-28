import React, { FC, useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import { ITribe } from 'src/lib/types/tribe'
import { useParams } from 'react-router'
import { GetTribeById } from 'src/lib/api'
import { TribeDetail } from 'src/components/Tribes/TribeDetail'

interface ITribeDetailRouteParams {
  id: string
}

export const TribeDetailRoute: FC = () => {
  const [tribe, setTribe] = useState<ITribe>()

  const { id } = useParams<ITribeDetailRouteParams>()

  useEffect(() => {
    GetTribeById(id)
      .then((response: ITribe) => {
        setTribe(response)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [id])

  return (
    <Container maxWidth='lg'>
      <h1>testing</h1>
      {tribe && <TribeDetail tribe={tribe} />}
    </Container>
  )
}
