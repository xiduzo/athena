import { OptionsObject, useSnackbar, WithSnackbarProps } from 'notistack'
import { FC } from 'react'

interface ISnackbarWrapper {
  success: (msg: string, options?: OptionsObject) => void
  warning: (msg: string, options?: OptionsObject) => void
  info: (msg: string, options?: OptionsObject) => void
  error: (msg: string, options?: OptionsObject) => void
}

let snackbarRef: WithSnackbarProps

const toast = (msg: string, options: OptionsObject = {}) => {
  snackbarRef.enqueueSnackbar(msg, options)
}

export const SnackbarUtilsConfiguration: FC = () => {
  snackbarRef = useSnackbar()
  return null
}

export const snackbarWrapper: ISnackbarWrapper = {
  success(msg: string, options: OptionsObject = {}) {
    toast(msg, { ...options, variant: 'success' })
  },
  warning(msg: string, options: OptionsObject = {}) {
    toast(msg, { ...options, variant: 'warning' })
  },
  info(msg: string, options: OptionsObject = {}) {
    toast(msg, { ...options, variant: 'info' })
  },
  error(msg: string, options: OptionsObject = {}) {
    toast(msg, { ...options, variant: 'error' })
  },
}
