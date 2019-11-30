import DashboardIcon from '@material-ui/icons/Dashboard'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PeopleIcon from '@material-ui/icons/People'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import DialpadIcon from '@material-ui/icons/Dialpad'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

import { StudentDashboardRoute } from 'src/routes/student/dashboard'
import { AgreementsRoute } from 'src/routes/agreements'
import { LoginRoute } from 'src/routes/account/login'
import { SettingsRoute } from 'src/routes/account/settings'
import { UsersRoute } from 'src/routes/users'
import { TribesRoute, TribeDetailRoute } from 'src/routes/tribes'
import { SquadDetailRoute } from 'src/routes/squads/detail/Detail'
import { SquadsRoute } from 'src/routes/squads'
import { UserDetailRoute } from 'src/routes/users/detail/UserDetail'

export interface IRoute {
  name: string
  path: string
  icon?: (props: SvgIconProps) => JSX.Element
  component: any
  private: boolean
  exact: boolean
  showInMenu: boolean
}

const coordinatorRoutes: IRoute[] = [
  {
    name: 'Agreements',
    path: '/agreements',
    icon: MenuBookIcon,
    component: AgreementsRoute,
    private: true,
    exact: false,
    showInMenu: true,
  },
  {
    name: 'Users',
    path: '/users',
    icon: PeopleIcon,
    component: UsersRoute,
    private: true,
    exact: true,
    showInMenu: true,
  },
  {
    name: 'User detail',
    path: '/users/:id',
    icon: PeopleIcon,
    component: UserDetailRoute,
    private: true,
    exact: true,
    showInMenu: false,
  },
  {
    name: 'Tribes',
    path: '/tribes',
    icon: DialpadIcon,
    component: TribesRoute,
    private: true,
    exact: true,
    showInMenu: true,
  },
  {
    name: 'Tribe detail',
    path: '/tribes/:id',
    component: TribeDetailRoute,
    private: true,
    exact: true,
    showInMenu: false,
  },
]

const lecturerRoutes: IRoute[] = [
  {
    name: 'Squads',
    path: '/squads',
    icon: BubbleChartIcon,
    component: SquadsRoute,
    private: true,
    exact: true,
    showInMenu: true,
  },
  {
    name: 'Squad detail',
    path: '/squads/:id',
    icon: BubbleChartIcon,
    component: SquadDetailRoute,
    private: true,
    exact: true,
    showInMenu: false,
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

export const routes: IRoute[] = [
  ...coordinatorRoutes,
  ...lecturerRoutes,
  ...studentRoutes,
  ...accountRoutes,
]
