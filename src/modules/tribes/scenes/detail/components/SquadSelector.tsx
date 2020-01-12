import React, { FC, useState, useEffect, Dispatch } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSelector, useDispatch } from 'react-redux'
import { IRootReducer, IAction } from 'src/lib/redux'
import { ISquad } from 'src/lib/types/squad'
import { getSquads } from 'src/lib/api'
interface IAddTribeModal {
  title: string
  isOpen: boolean
  without: ISquad[]
  onClose: (squads?: ISquad[]) => void
}

export const SquadSelector: FC<IAddTribeModal> = ({ title, isOpen, onClose, without }) => {
  const [ squadsToAdd, setSquadsToAdd ] = useState<ISquad[]>([])

  const squads = useSelector<IRootReducer, ISquad[]>((state) => state.squads.items)
  const dispatch = useDispatch<Dispatch<(dispatch: Dispatch<IAction>) => void>>()

  useEffect(
    () => {
      if (!squads.length) dispatch(getSquads())
    },
    [ dispatch, squads ]
  )
  const handleSubmit = () => {
    clearSquadsToAdd()
    onClose(squadsToAdd)
  }

  const clearSquadsToAdd = () => setSquadsToAdd([])

  const handleClose = () => {
    clearSquadsToAdd()
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {/* {subtitle && <DialogContentText>{subtitle}</DialogContentText>} */}
        <Autocomplete
          id="disabled-options-demo"
          options={squads.filter((squad) => !without.map((s) => s.id).includes(squad.id))}
          clearOnEscape
          multiple
          onChange={(_: any, squads: ISquad[] | null) => {
            if (squads) setSquadsToAdd(squads)
          }}
          getOptionLabel={(squad: ISquad) => squad.name}
          getOptionDisabled={(squad: ISquad) => (squadsToAdd.find((s) => s.id === squad.id) ? true : false)}
          renderInput={(params) => (
            <TextField label="Squads to add" {...params} autoFocus id="tribe" name="tribe" fullWidth />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
