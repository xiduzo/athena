import DashboardIcon from '@material-ui/icons/Dashboard'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PeopleIcon from '@material-ui/icons/People'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import DialpadIcon from '@material-ui/icons/Dialpad'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { AgreementsRoute } from 'src/modules/agreements/scenes/overview'
import { UsersRoute } from 'src/modules/users'
import { UserDetailRoute } from 'src/modules/users/detail/UserDetail'
import { SquadsRoute } from 'src/modules/squads'
import { SquadDetailRoute } from 'src/modules/squads/detail/Detail'
import { SettingsRoute } from 'src/modules/account/settings'
import { LoginRoute } from 'src/modules/account/login'
import { StudentDashboardRoute } from 'src/modules/student/dashboard'
import { TribesRoute } from 'src/modules/tribes/scenes/overview'
import { TribeDetailRoute } from 'src/modules/tribes/scenes/detail'
import FeedbackIcon from '@material-ui/icons/Feedback'
import { GiveFeedbackRoute } from 'src/modules/feedback/scenes/giveFeedback'

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
    name: 'agreements',
    path: '/agreements',
    icon: MenuBookIcon,
    component: AgreementsRoute,
    private: true,
    exact: false,
    showInMenu: true,
  },
  {
    name: 'users',
    path: '/users',
    icon: PeopleIcon,
    component: UsersRoute,
    private: true,
    exact: true,
    showInMenu: true,
  },
  {
    name: 'userDetail',
    path: '/users/:id',
    icon: PeopleIcon,
    component: UserDetailRoute,
    private: true,
    exact: true,
    showInMenu: false,
  },
  {
    name: 'tribes',
    path: '/tribes',
    icon: DialpadIcon,
    component: TribesRoute,
    private: true,
    exact: true,
    showInMenu: true,
  },
  {
    name: 'tribeDetail',
    path: '/tribes/:id',
    component: TribeDetailRoute,
    private: true,
    exact: true,
    showInMenu: false,
  },
]

const lecturerRoutes: IRoute[] = [
  {
    name: 'squads',
    path: '/squads',
    icon: BubbleChartIcon,
    component: SquadsRoute,
    private: true,
    exact: true,
    showInMenu: true,
  },
  {
    name: 'squadDetail',
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
    name: 'settings',
    path: '/account/settings',
    icon: ExitToAppIcon,
    component: SettingsRoute,
    private: true,
    exact: false,
    showInMenu: false,
  },
  {
    name: 'login',
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
    name: 'dashboard',
    path: '/student/dashboard',
    icon: DashboardIcon,
    component: StudentDashboardRoute,
    private: true,
    exact: false,
    showInMenu: true,
  },
  {
    name: 'feedback',
    path: '/student/feedback',
    icon: FeedbackIcon,
    component: GiveFeedbackRoute,
    private: true,
    exact: true,
    showInMenu: true,
  },
]

export const routes: IRoute[] = [ ...coordinatorRoutes, ...lecturerRoutes, ...studentRoutes, ...accountRoutes ]
