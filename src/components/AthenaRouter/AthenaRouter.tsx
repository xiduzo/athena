import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { StudentDashboard } from 'src/routes/student/dashboard/'

export const AthenaRouter: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route path='/student/dashboard'>
          <StudentDashboard />
        </Route>
      </Switch>
    </div>
  )
}
