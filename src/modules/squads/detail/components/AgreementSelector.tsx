import React, { FC, useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSelector, useDispatch } from 'react-redux'
import { getAgreements } from 'src/lib/api'
import { useWidth } from 'src/lib/hooks/useWidth'
import { IAgreement } from 'src/lib/types/agreement'
import { getTranslation } from 'src/common/utils/getTranslation'
import { IRootReducer, DispatchAction } from 'src/lib/redux/rootReducer'
interface IAgreementSelectorModal {
  title: string
  isOpen: boolean
  without: IAgreement[]
  onClose: (agreements?: IAgreement[]) => void
}

export const AgreementsSelector: FC<IAgreementSelectorModal> = ({ title, isOpen, onClose, without }) => {
  const width = useWidth()
  const [ agreementsToAdd, setAgreementsToAdd ] = useState<IAgreement[]>([])

  const agreements = useSelector<IRootReducer, IAgreement[]>((state) => {
    return state.agreements.items.filter((agreement) => agreement.isBase)
  })
  const dispatch = useDispatch<DispatchAction>()

  useEffect(
    () => {
      if (!agreements.length) dispatch(getAgreements())
    },
    [ dispatch, agreements ]
  )
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
          options={agreements.filter((agreements) => !without.map((a) => a.id).includes(agreements.id))}
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
