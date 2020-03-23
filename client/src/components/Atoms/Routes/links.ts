import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import DashboardIcon from '@material-ui/icons/Dashboard'
import DialpadIcon from '@material-ui/icons/Dialpad'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FeedbackIcon from '@material-ui/icons/Feedback'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PeopleIcon from '@material-ui/icons/People'
import { IRoute } from 'src/lib/interfaces'
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
import { UserRole } from 'src/lib/enums'
import { Home } from 'src/modules/generic/scenes/home'

const coordinatorRoutes: IRoute[] = [
  {
    name: 'agreements',
    path: '/agreement',
    icon: MenuBookIcon,
    component: AgreementOverview,
    private: true,
    exact: false,
    showInMenu: true,
    userGroups: [ UserRole.Admin ],
  },
  {
    name: 'users',
    path: '/user',
    icon: PeopleIcon,
    component: UserOverview,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [ UserRole.Admin ],
  },
  {
    name: 'userDetail',
    path: '/user/:id',
    icon: PeopleIcon,
    component: UserDetailRoute,
    private: true,
    exact: true,
    showInMenu: false,
    userGroups: [ UserRole.Admin ],
  },
  {
    name: 'tribes',
    path: '/tribe',
    icon: DialpadIcon,
    component: TribeOverview,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [ UserRole.Admin ],
  },
  {
    name: 'tribeDetail',
    path: '/tribe/:id',
    icon: DialpadIcon,
    component: TribeDetail,
    private: true,
    exact: true,
    showInMenu: false,
    userGroups: [ UserRole.Admin ],
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
    userGroups: [ UserRole.Admin ],
  },
  {
    name: 'squadDetail',
    path: '/squad/:id',
    icon: BubbleChartIcon,
    component: SquadDetail,
    private: true,
    exact: true,
    showInMenu: false,
    userGroups: [ UserRole.Admin ],
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
    userGroups: [ UserRole.Admin ],
  },
  {
    name: 'login',
    path: '/account/login',
    icon: ExitToAppIcon,
    component: AccountLogin,
    private: false,
    exact: false,
    showInMenu: false,
    userGroups: [ UserRole.Admin ],
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
    userGroups: [],
  },
  {
    name: 'feedback',
    path: '/student/feedback',
    icon: FeedbackIcon,
    component: GiveFeedbackRoute,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [ UserRole.Admin ],
  },
]

const generalRoutes: IRoute[] = [
  {
    name: 'home',
    path: '/',
    icon: FeedbackIcon,
    component: Home,
    private: false,
    exact: true,
    showInMenu: false,
    userGroups: [],
  },
]

export const routes: IRoute[] = [
  ...generalRoutes,
  ...coordinatorRoutes,
  ...lecturerRoutes,
  ...studentRoutes,
  ...accountRoutes,
]
