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
import React, { FC, useState } from 'react'
import { useWidth } from 'src/common/hooks'
import { GET_AGREEMENTS } from 'src/common/services'
import { getTranslation } from 'src/common/utils'
import { IAgreement } from 'src/lib/interfaces'
import { useTranslation } from 'react-i18next'

interface IAgreementSelectorModal {
  title: string
  subtitle?: string
  isOpen: boolean
  without: IAgreement[]
  onClose: (agreements?: IAgreement[]) => void
}

export const AgreementSelector: FC<IAgreementSelectorModal> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  without,
}) => {
  const { t } = useTranslation()
  const width = useWidth()

  const { loading, error, data } = useQuery(GET_AGREEMENTS, {
    variables: {
      filter: {
        isBase: true,
      },
    },
  })

  const [agreementsToAdd, setAgreementsToAdd] = useState<IAgreement[]>([])

  const handleSubmit = (): void => {
    clearAgreementsToAdd()
    onClose(agreementsToAdd)
  }

  const clearAgreementsToAdd = (): void => setAgreementsToAdd([])

  const handleClose = (): void => {
    clearAgreementsToAdd()
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby={t('agreements')}
      fullScreen={width === 'xs'}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle id={t('agreements')}>{title}</DialogTitle>
      <DialogContent>
        {subtitle && <DialogContentText>{subtitle}</DialogContentText>}
        <Autocomplete
          id='disabled-options-demo'
          options={
            loading || error
              ? []
              : data.Agreement.filter(
                  (agreements: IAgreement) => !without.map((a) => a.id).includes(agreements.id)
                )
          }
          clearOnEscape
          multiple
          onChange={(_: any, agreements: IAgreement[] | null) => {
            if (agreements) setAgreementsToAdd(agreements)
          }}
          getOptionLabel={(agreement: IAgreement) => getTranslation(agreement.translations)}
          getOptionDisabled={(agreement: IAgreement) =>
            Boolean(agreementsToAdd.find((a) => a.id === agreement.id))
          }
          renderInput={(params) => (
            <TextField
              label={t('agreements')}
              {...params}
              autoFocus
              id='agreement'
              name={t('agreement')}
              fullWidth
            />
          )}
          clearText={t('clear')}
          closeText={t('close')}
          noOptionsText={t('noOptions')}
          loadingText={t('cleloadingar')}
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
