import DashboardIcon from '@material-ui/icons/Dashboard'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PeopleIcon from '@material-ui/icons/People'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

import { StudentDashboardRoute } from 'src/routes/student/dashboard'
import { CoordinatorAgreementsRoute } from 'src/routes/coordinator/agreements'
import { LoginRoute } from 'src/routes/account/login'
import { SettingsRoute } from 'src/routes/account/settings'
import { CoordinatorUsersRoute } from 'src/routes/coordinator/users'
import { CoordinatorTribesRoute } from 'src/routes/coordinator/Tribes'

export interface IRoute {
  name: string
  path: string
  icon: (props: SvgIconProps) => JSX.Element
  component: any
  private: boolean
  exact: boolean
  showInMenu: boolean
}

const coordinatorRoutes: IRoute[] = [
  {
    name: 'Agreements',
    path: '/coordinator/agreements',
    icon: MenuBookIcon,
    component: CoordinatorAgreementsRoute,
    private: true,
    exact: false,
    showInMenu: true,
  },
  {
    name: 'Users',
    path: '/coordinator/users',
    icon: PeopleIcon,
    component: CoordinatorUsersRoute,
    private: true,
    exact: false,
    showInMenu: true,
  },
  {
    name: 'Tribes',
    path: '/coordinator/tribes',
    icon: BubbleChartIcon,
    component: CoordinatorTribesRoute,
    private: true,
    exact: false,
    showInMenu: true,
  },
]

const accountRoutes: IRoute[] = [
  {
    name: 'Settings',
    path: '/account/settings',
    icon: ExitToAppIcon,
    component: SettingsRoute,
    private: true,
    exact: false,
    showInMenu: false,
  },
  {
    name: 'Login',
    path: '/account/login',
    icon: ExitToAppIcon,
    component: LoginRoute,
    private: false,
    exact: false,
    showInMenu: false,
  },
]

const studentRoutes: IRoute[] = [
  {
    name: 'Dashboard',
    path: '/student/dashboard',
    icon: DashboardIcon,
    component: StudentDashboardRoute,
    private: true,
    exact: false,
    showInMenu: true,
  },
]

export const routes: IRoute[] = [...coordinatorRoutes, ...accountRoutes, ...studentRoutes]
