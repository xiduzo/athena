import { useQuery } from '@apollo/react-hooks'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import gql from 'graphql-tag'
import React, { FC, useState } from 'react'
import { useWidth } from 'src/common/hooks/useWidth'
import { ISquad } from 'src/lib/interfaces'

interface ISquadSelector {
  title: string
  isOpen: boolean
  without: ISquad[]
  onClose: (squads?: ISquad[]) => void
}

export const SquadSelector: FC<ISquadSelector> = ({ title, isOpen, onClose, without }) => {
  const width = useWidth()

  const [squadsToAdd, setSquadsToAdd] = useState<ISquad[]>([])

  const [pageQuery] = useState(gql`
    query GetSquads {
      Squad {
        id
        name
      }
    }
  `)

  const { loading, error, data } = useQuery(pageQuery)

  const handleSubmit = (): void => {
    clearSquadsToAdd()
    onClose(squadsToAdd)
  }

  const clearSquadsToAdd = (): void => setSquadsToAdd([])

  const handleClose = (): void => {
    clearSquadsToAdd()
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='squad selector'
      fullScreen={width === 'xs'}
    >
      <DialogTitle id='squad selector'>{title}</DialogTitle>
      <DialogContent>
        {/* {subtitle && <DialogContentText>{subtitle}</DialogContentText>} */}
        <Autocomplete
          id='disabled-options-demo'
          options={
            loading || error
              ? []
              : data.Squad.filter((squad: ISquad) => !without.map((s) => s.id).includes(squad.id))
          }
          clearOnEscape
          multiple
          onChange={(_: any, squads: ISquad[] | null) => {
            if (squads) setSquadsToAdd(squads)
          }}
          getOptionLabel={(squad: ISquad) => squad.name}
          getOptionDisabled={(squad: ISquad) =>
            squadsToAdd.find((s) => s.id === squad.id) ? true : false
          }
          renderInput={(params) => (
            <TextField label='Squads to add' {...params} id='tribe' name='tribe' fullWidth />
          )}
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
