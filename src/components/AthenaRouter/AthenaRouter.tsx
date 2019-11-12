import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { StudentDashboard } from 'src/routes/student/dashboard/'
import { PrivateRoute } from '../Routes/Private'
import { LoginRoute } from 'src/routes/account/login'

export const AthenaRouter: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route path='/login' component={LoginRoute}></Route>
        <PrivateRoute path='/student/dashboard' component={StudentDashboard}></PrivateRoute>
      </Switch>
    </div>
  )
}
