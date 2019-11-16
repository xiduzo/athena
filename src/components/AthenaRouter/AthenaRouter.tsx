import React, { FC } from 'react'

import { Switch, Route } from 'react-router-dom'
import { StudentDashboardRoute } from 'src/routes/student/dashboard/'
import { PrivateRoute } from '../Routes/Private'
import { LoginRoute } from 'src/routes/account/login'
import { CoordinatorAgreementsRoute } from 'src/routes/coordinator/agreements'

export const AthenaRouter: FC = () => {
  return (
    <div>
      <Switch>
        <Route path='/login' component={LoginRoute}></Route>
        <PrivateRoute path='/student/dashboard' component={StudentDashboardRoute}></PrivateRoute>
        <PrivateRoute
          path='/coordinator/agreements'
          component={CoordinatorAgreementsRoute}
        ></PrivateRoute>
      </Switch>
    </div>
  )
}
