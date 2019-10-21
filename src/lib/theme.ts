import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import { createMuiTheme, Theme } from '@material-ui/core/styles'

const theme: Theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: green,
  },
})

export default theme
