import React from 'react'

import { Switch } from 'react-router-dom'
import { StudentDashboard } from 'src/routes/student/dashboard/'
import { PrivateRoute } from '../Routes/Private'

export const AthenaRouter: React.FC = () => {
  return (
    <div>
      <Switch>
        <PrivateRoute path='/student/dashboard' component={StudentDashboard}></PrivateRoute>
      </Switch>
    </div>
  )
}
