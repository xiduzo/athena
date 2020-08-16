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
import { useTranslation } from 'react-i18next'

interface ISquadSelector {
  title: string
  isOpen: boolean
  without: ISquad[]
  onClose: (squads?: ISquad[]) => void
}

export const SquadSelector: FC<ISquadSelector> = ({ title, isOpen, onClose, without }) => {
  const width = useWidth()
  const { t } = useTranslation()

  const [squadsToAdd, setSquadsToAdd] = useState<ISquad[]>([])

  const [pageQuery] = useState(gql`
    query GetAllSquads {
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
      aria-labelledby={t('squad')}
      fullScreen={width === 'xs'}
    >
      <DialogTitle id={t('squad')}>{title}</DialogTitle>
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
            <TextField label={t('squads')} {...params} id='squads' name='squads' fullWidth />
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
