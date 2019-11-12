import React from 'react'
import { GetTribeById } from 'src/lib/api'
import { Button } from '@material-ui/core'

export const StudentDashboard: React.FC = () => {
  const getTribeById = () => {
    GetTribeById().then(tribe => {
      console.log(tribe)
    })
  }

  return (
    <div>
      student dashboard
      <Button onClick={getTribeById}>get tribe</Button>
    </div>
  )
}
