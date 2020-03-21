import { useQuery } from '@apollo/react-hooks'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { FC, useState } from 'react'
import { useWidth } from 'src/common/hooks/useWidth'
import { GET_AGREEMENTS } from 'src/common/services/agreementService'
import { getTranslation } from 'src/common/utils/getTranslation'
import { IAgreement } from 'src/lib/interfaces'

interface IAgreementSelectorModal {
  title: string
  isOpen: boolean
  without: IAgreement[]
  onClose: (agreements?: IAgreement[]) => void
}

export const AgreementsSelector: FC<IAgreementSelectorModal> = ({ title, isOpen, onClose, without }) => {
  const width = useWidth()

  const { loading, error, data } = useQuery(GET_AGREEMENTS, {
    variables: {
      filter: {
        isBase: true,
      },
    },
  })

  const [ agreementsToAdd, setAgreementsToAdd ] = useState<IAgreement[]>([])

  const handleSubmit = () => {
    clearAgreementsToAdd()
    onClose(agreementsToAdd)
  }

  const clearAgreementsToAdd = () => setAgreementsToAdd([])

  const handleClose = () => {
    clearAgreementsToAdd()
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby='agreements selector' fullScreen={width === 'xs'}>
      <DialogTitle id='agreements selector'>{title}</DialogTitle>
      <DialogContent>
        {/* {subtitle && <DialogContentText>{subtitle}</DialogContentText>} */}
        <Autocomplete
          id='disabled-options-demo'
          options={
            loading || error ? (
              []
            ) : (
              data.Agreement.filter((agreements: IAgreement) => !without.map((a) => a.id).includes(agreements.id))
            )
          }
          clearOnEscape
          multiple
          onChange={(_: any, agreements: IAgreement[] | null) => {
            if (agreements) setAgreementsToAdd(agreements)
          }}
          getOptionLabel={(agreement: IAgreement) => getTranslation(agreement.translations)}
          getOptionDisabled={(agreement: IAgreement) =>
            agreementsToAdd.find((a) => a.id === agreement.id) ? true : false}
          renderInput={(params) => (
            <TextField label='Agreements to add' {...params} autoFocus id='agreement' name='agreement' fullWidth />
          )}
          clearText='[Clear text]'
          closeText='[Close text]'
          noOptionsText='[No options text]'
          loadingText='[Loading text]'
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
