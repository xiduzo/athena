import React, { FC } from 'react'

import { makeStyles } from '@material-ui/styles'
import { Theme, Box } from '@material-ui/core'

import noAgreement from 'src/illustrations/undraw_good_team.svg'
import noTribe from 'src/illustrations/undraw_convert.svg'
import noSquad from 'src/illustrations/undraw_not_found.svg'
import emptyTwo from 'src/illustrations/empty2.png'
import notFound from 'src/illustrations/notFound.png'
import notAuthorized from 'src/illustrations/notAuthorized.png'

import { IllustrationType } from 'src/lib/enums'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((_: Theme) => {
  return {
    root: {
      maxHeight: '60vh',
      maxWidth: '60vh',
      '& img': {
        maxHeight: 'inherit',
        maxWidth: 'inherit',
      },
    },
  }
})

interface IIllustration {
  type: IllustrationType
}

export const Illustration: FC<IIllustration> = ({ type }) => {
  const classes = useStyles()

  const { t } = useTranslation()

  return (
    <Box className={classes.root}>
      {type === IllustrationType.NoAgreement && (
        <img src={noAgreement} alt={t('agreementsNotFound')} />
      )}
      {type === IllustrationType.NoTribe && <img src={noTribe} alt={'no tribes'} />}
      {type === IllustrationType.NoSquad && <img src={noSquad} alt={'no squad'} />}
      {type === IllustrationType.EmptyTwo && <img src={emptyTwo} alt={'empty'} />}
      {type === IllustrationType.NotFound && <img src={notFound} alt={'not found'} />}
      {type === IllustrationType.NotAuthorized && (
        <img src={notAuthorized} alt={'not authorized'} />
      )}
    </Box>
  )
}
