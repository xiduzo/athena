import BubbleChartOutlinedIcon from '@material-ui/icons/BubbleChartOutlined'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined'
import DialpadOutlinedIcon from '@material-ui/icons/DialpadOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined'
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined'
import { UserRole } from 'src/lib/enums'
import { IRoute } from 'src/lib/interfaces'
import { AgreementOverview } from 'src/modules/agreement/scenes/overview'
import { GiveFeedback } from 'src/modules/feedback/scenes/giveFeedback'
import { SquadDetail } from 'src/modules/squad/scenes/detail'
import { SquadOverview } from 'src/modules/squad/scenes/overview'
import { TribeDetail } from 'src/modules/tribe/scenes/detail'
import { TribeOverview } from 'src/modules/tribe/scenes/overview'
import { MemberDashboard } from 'src/modules/user/scenes/dashboards/dashboard'
import { UserDetailRoute } from 'src/modules/user/scenes/detail'
import { UserLogin } from 'src/modules/user/scenes/login'
import { UserOverview } from 'src/modules/user/scenes/overview'
import { Home } from 'src/modules/generic/scenes/home'
import { UserSettings } from 'src/modules/user/scenes/settings'

export const routes: IRoute[] = [
  {
    name: 'home',
    path: '/',
    icon: FeedbackOutlinedIcon,
    component: Home,
    private: true,
    exact: true,
    showInMenu: false,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
  {
    name: 'login',
    path: '/login',
    icon: ExitToAppIcon,
    component: UserLogin,
    private: false,
    exact: false,
    showInMenu: false,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
  {
    name: 'settings',
    path: '/settings',
    icon: ExitToAppIcon,
    component: UserSettings,
    private: true,
    exact: false,
    showInMenu: false,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
  {
    name: 'agreements',
    path: '/agreement',
    icon: MenuBookOutlinedIcon,
    component: AgreementOverview,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
  {
    name: 'users',
    path: '/user',
    icon: GroupOutlinedIcon,
    component: UserOverview,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
  {
    name: 'userDetail',
    path: '/user/:id',
    icon: GroupOutlinedIcon,
    component: UserDetailRoute,
    private: true,
    exact: false,
    showInMenu: false,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
  {
    name: 'dashboard',
    path: '/member/dashboard',
    icon: DashboardOutlinedIcon,
    component: MemberDashboard,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
  {
    name: 'feedback',
    path: '/member/feedback',
    icon: FeedbackOutlinedIcon,
    component: GiveFeedback,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
  {
    name: 'tribes',
    path: '/tribe',
    icon: DialpadOutlinedIcon,
    component: TribeOverview,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
  {
    name: 'tribeDetail',
    path: '/tribe/:id',
    icon: DialpadOutlinedIcon,
    component: TribeDetail,
    private: true,
    exact: false,
    showInMenu: false,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
  {
    name: 'squads',
    path: '/squad',
    icon: BubbleChartOutlinedIcon,
    component: SquadOverview,
    private: true,
    exact: true,
    showInMenu: true,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
  {
    name: 'squadDetail',
    path: '/squad/:id',
    icon: BubbleChartOutlinedIcon,
    component: SquadDetail,
    private: true,
    exact: false,
    showInMenu: false,
    userGroups: [UserRole.Root, UserRole.Admin],
  },
]
