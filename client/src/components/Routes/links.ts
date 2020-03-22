import { SvgIconProps } from '@material-ui/core/SvgIcon'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import DashboardIcon from '@material-ui/icons/Dashboard'
import DialpadIcon from '@material-ui/icons/Dialpad'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FeedbackIcon from '@material-ui/icons/Feedback'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PeopleIcon from '@material-ui/icons/People'
import { AccountLogin } from 'src/modules/account/scenes/login'
import { AccountSettings } from 'src/modules/account/scenes/settings'
import { AgreementOverview } from 'src/modules/agreement/scenes/overview'
import { GiveFeedbackRoute } from 'src/modules/feedback/scenes/giveFeedback'
import { SquadDetail } from 'src/modules/squad/scenes/detail'
import { SquadOverview } from 'src/modules/squad/scenes/overview'
import { StudentDashboard } from 'src/modules/student/scenes/dashboard'
import { TribeDetail } from 'src/modules/tribe/scenes/detail'
import { TribeOverview } from 'src/modules/tribe/scenes/overview'
import { UserDetailRoute } from 'src/modules/user/scenes/detail'
import { UserOverview } from 'src/modules/user/scenes/overview'

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
    name: 'agreements',
    path: '/agreement',
    icon: MenuBookIcon,
    component: AgreementOverview,
    private: true,
    exact: false,
    showInMenu: true,
  },
  {
    name: 'users',
    path: '/user',
    icon: PeopleIcon,
    component: UserOverview,
    private: true,
    exact: true,
    showInMenu: true,
  },
  {
    name: 'userDetail',
    path: '/user/:id',
    icon: PeopleIcon,
    component: UserDetailRoute,
    private: true,
    exact: true,
    showInMenu: false,
  },
  {
    name: 'tribes',
    path: '/tribe',
    icon: DialpadIcon,
    component: TribeOverview,
    private: true,
    exact: true,
    showInMenu: true,
  },
  {
    name: 'tribeDetail',
    path: '/tribe/:id',
    icon: DialpadIcon,
    component: TribeDetail,
    private: true,
    exact: true,
    showInMenu: false,
  },
]

const lecturerRoutes: IRoute[] = [
  {
    name: 'squads',
    path: '/squad',
    icon: BubbleChartIcon,
    component: SquadOverview,
    private: true,
    exact: true,
    showInMenu: true,
  },
  {
    name: 'squadDetail',
    path: '/squad/:id',
    icon: BubbleChartIcon,
    component: SquadDetail,
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
    component: AccountSettings,
    private: true,
    exact: false,
    showInMenu: false,
  },
  {
    name: 'login',
    path: '/account/login',
    icon: ExitToAppIcon,
    component: AccountLogin,
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
    component: StudentDashboard,
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
