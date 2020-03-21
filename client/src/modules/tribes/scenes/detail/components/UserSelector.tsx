import { useQuery } from '@apollo/react-hooks'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import gql from 'graphql-tag'
import React, { FC, useState } from 'react'
import { useWidth } from 'src/common/hooks/useWidth'
import { IUser } from 'src/lib/interfaces'

interface IUserSelectorModal {
  title: string
  isOpen: boolean
  without: IUser[]
  onClose: (users?: IUser[]) => void
}

export const UserSelector: FC<IUserSelectorModal> = ({ title, isOpen, onClose, without }) => {
  const width = useWidth()

  const [ usersToAdd, setUsersToAdd ] = useState<IUser[]>([])

  const [ pageQuery ] = useState(gql`
    query {
      User {
        id
        displayName
      }
    }
  `)

  const { loading, error, data } = useQuery(pageQuery)

  const handleSubmit = () => {
    clearSquadsToAdd()
    onClose(usersToAdd)
  }

  const clearSquadsToAdd = () => setUsersToAdd([])

  const handleClose = () => {
    clearSquadsToAdd()
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby='user selector' fullScreen={width === 'xs'}>
      <DialogTitle id='user selector'>{title}</DialogTitle>
      <DialogContent>
        {/* {subtitle && <DialogContentText>{subtitle}</DialogContentText>} */}
        <Autocomplete
          id='disabled-options-demo'
          options={
            loading || error ? [] : data.User.filter((user: IUser) => !without.map((u) => u.id).includes(user.id))
          }
          clearOnEscape
          multiple
          onChange={(_: any, users: IUser[] | null) => {
            if (users) setUsersToAdd(users)
          }}
          getOptionLabel={(user: IUser) => user.displayName}
          getOptionDisabled={(user: IUser) => (usersToAdd.find((u) => u.id === user.id) ? true : false)}
          renderInput={(params) => <TextField label='Users to add' {...params} autoFocus name='user' fullWidth />}
          clearText='[Clear text]'
          closeText='[Close text]'
          noOptionsText='[No options text]'
          loadingText='[Loading text'
          openText='[Open text]'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color='primary'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
