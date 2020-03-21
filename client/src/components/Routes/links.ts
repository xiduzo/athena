import { SvgIconProps } from '@material-ui/core/SvgIcon'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import DashboardIcon from '@material-ui/icons/Dashboard'
import DialpadIcon from '@material-ui/icons/Dialpad'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FeedbackIcon from '@material-ui/icons/Feedback'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PeopleIcon from '@material-ui/icons/People'
import { LoginRoute } from 'src/modules/account/scenes/login'
import { Settings } from 'src/modules/account/scenes/settings'
import { AgreementsRoute } from 'src/modules/agreements/scenes/overview'
import { GiveFeedbackRoute } from 'src/modules/feedback/scenes/giveFeedback'
import { SquadDetailRoute } from 'src/modules/squads/scenes/detail/Detail'
import { SquadsRoute } from 'src/modules/squads/scenes/overview'
import { StudentDashboardRoute } from 'src/modules/student/scenes/dashboard'
import { TribeDetailRoute } from 'src/modules/tribes/scenes/detail'
import { TribesRoute } from 'src/modules/tribes/scenes/overview'
import { UserDetailRoute } from 'src/modules/users/scenes/detail/UserDetail'
import { UsersRoute } from 'src/modules/users/scenes/overview'

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
    path: '/agreement',
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
    component: Settings,
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
