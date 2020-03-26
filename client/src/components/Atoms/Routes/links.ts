import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import DashboardIcon from '@material-ui/icons/Dashboard'
import DialpadIcon from '@material-ui/icons/Dialpad'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FeedbackIcon from '@material-ui/icons/Feedback'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PeopleIcon from '@material-ui/icons/People'
import { UserRole } from 'src/lib/enums'
import { IRoute } from 'src/lib/interfaces'
import { AgreementOverview } from 'src/modules/agreement/scenes/overview'
import { GiveFeedbackRoute } from 'src/modules/feedback/scenes/giveFeedback'
import { Home } from 'src/modules/generic/scenes/home'
import { SquadDetail } from 'src/modules/squad/scenes/detail'
import { SquadOverview } from 'src/modules/squad/scenes/overview'
import { TribeDetail } from 'src/modules/tribe/scenes/detail'
import { TribeOverview } from 'src/modules/tribe/scenes/overview'
import { MemberDashboard } from 'src/modules/user/scenes/dashboards/dashboard'
import { UserDetailRoute } from 'src/modules/user/scenes/detail'
import { UserLogin } from 'src/modules/user/scenes/login'
import { UserOverview } from 'src/modules/user/scenes/overview'
import { UserSettings } from 'src/modules/user/scenes/settings'

export const routes: IRoute[] = [
  {
    name: 'home',
    path: '/',
    icon: FeedbackIcon,
    component: Home,
    private: true,
    exact: true,
    showInMenu: false,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
  {
    name: 'login',
    path: '/login',
    icon: ExitToAppIcon,
    component: UserLogin,
    private: false,
    exact: false,
    showInMenu: false,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
  {
    name: 'settings',
    path: '/settings',
    icon: ExitToAppIcon,
    component: UserSettings,
    private: true,
    exact: false,
    showInMenu: false,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
  {
    name: 'agreements',
    path: '/agreement',
    icon: MenuBookIcon,
    component: AgreementOverview,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
  {
    name: 'users',
    path: '/user',
    icon: PeopleIcon,
    component: UserOverview,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
  {
    name: 'userDetail',
    path: '/user/:id',
    icon: PeopleIcon,
    component: UserDetailRoute,
    private: true,
    exact: false,
    showInMenu: false,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
  {
    name: 'dashboard',
    path: '/member/dashboard',
    icon: DashboardIcon,
    component: MemberDashboard,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
  {
    name: 'feedback',
    path: '/member/feedback',
    icon: FeedbackIcon,
    component: GiveFeedbackRoute,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
  {
    name: 'tribes',
    path: '/tribe',
    icon: DialpadIcon,
    component: TribeOverview,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
  {
    name: 'tribeDetail',
    path: '/tribe/:id',
    icon: DialpadIcon,
    component: TribeDetail,
    private: true,
    exact: false,
    showInMenu: false,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
  {
    name: 'squads',
    path: '/squad',
    icon: BubbleChartIcon,
    component: SquadOverview,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
  {
    name: 'squadDetail',
    path: '/squad/:id',
    icon: BubbleChartIcon,
    component: SquadDetail,
    private: true,
    exact: false,
    showInMenu: false,
    userGroups: [ UserRole.Root, UserRole.Admin ],
  },
]
