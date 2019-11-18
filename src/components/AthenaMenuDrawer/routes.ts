import DashboardIcon from '@material-ui/icons/Dashboard'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { StudentDashboardRoute } from 'src/routes/student/dashboard'
import { CoordinatorAgreementsRoute } from 'src/routes/coordinator/agreements'
import { LoginRoute } from 'src/routes/account/login'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { SettingsRoute } from 'src/routes/account/settings'

export interface IRoute {
  name: string
  path: string
  icon: (props: SvgIconProps) => JSX.Element
  component: any
  private: boolean
  exact: boolean
  showInMenu: boolean
}

export const routes: IRoute[] = [
  {
    name: 'Dashboard',
    path: '/student/dashboard',
    icon: DashboardIcon,
    component: StudentDashboardRoute,
    private: true,
    exact: false,
    showInMenu: true,
  },
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
