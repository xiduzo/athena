import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
export const useWidth = (): Breakpoint => {
  const theme = useTheme()
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse()

  return (
    keys.reduce((output: Breakpoint | null, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches: boolean = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || 'xs'
  )
}
