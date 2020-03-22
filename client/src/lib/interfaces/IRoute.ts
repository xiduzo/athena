import { SvgIconProps } from '@material-ui/core'

export interface IRoute {
  name: string
  path: string
  icon: (props: SvgIconProps) => JSX.Element
  component: any
  private: boolean
  exact: boolean
  showInMenu: boolean
}
