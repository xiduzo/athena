import DashboardIcon from '@material-ui/icons/Dashboard'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

export const routes = [
  {
    name: 'Dashboard',
    link: '/student/dashboard',
    icon: DashboardIcon,
  },
  {
    name: 'Agreements',
    link: '/coordinator/agreements',
    icon: MenuBookIcon,
  },
  {
    name: 'Login',
    link: '/login',
    icon: ExitToAppIcon,
  },
]
