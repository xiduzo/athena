import { useQuery } from '@apollo/react-hooks'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import gql from 'graphql-tag'
import React, { FC, useState } from 'react'
import { useWidth } from 'src/common/hooks/useWidth'
import { IUser } from 'src/lib/interfaces'
import { useTranslation } from 'react-i18next'

interface IUserSelector {
  title: string
  subtitle?: string
  isOpen: boolean
  without: IUser[]
  onClose: (users?: IUser[]) => void
}

export const UserSelector: FC<IUserSelector> = ({ title, subtitle, isOpen, onClose, without }) => {
  const width = useWidth()
  const { t } = useTranslation()

  const [usersToAdd, setUsersToAdd] = useState<IUser[]>([])

  const [pageQuery] = useState(gql`
    query GetUser {
      User {
        id
        displayName
      }
    }
  `)

  const { loading, error, data } = useQuery(pageQuery)

  const handleSubmit = (): void => {
    clearSquadsToAdd()
    onClose(usersToAdd)
  }

  const clearSquadsToAdd = (): void => setUsersToAdd([])

  const handleClose = (): void => {
    clearSquadsToAdd()
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby={t('user')}
      fullScreen={width === 'xs'}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle id={t('user')}>{title}</DialogTitle>
      <DialogContent>
        {subtitle && <DialogContentText>{subtitle}</DialogContentText>}
        <Autocomplete
          id='disabled-options-demo'
          options={
            loading || error
              ? []
              : data.User.filter((user: IUser) => !without.map((u) => u.id).includes(user.id))
          }
          clearOnEscape
          multiple
          onChange={(_: any, users: IUser[] | null) => {
            if (users) setUsersToAdd(users)
          }}
          getOptionLabel={(user: IUser) => user.displayName}
          getOptionDisabled={(user: IUser) =>
            usersToAdd.find((u) => u.id === user.id) ? true : false
          }
          renderInput={(params) => (
            <TextField label={t('users')} {...params} autoFocus name='user' fullWidth />
          )}
          clearText={t('clear')}
          closeText={t('close')}
          noOptionsText={t('noOptions')}
          loadingText={t('loading')}
          openText={t('open')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button onClick={handleSubmit} color='primary'>
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
