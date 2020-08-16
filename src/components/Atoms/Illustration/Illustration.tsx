import React, { FC } from 'react'

import { makeStyles } from '@material-ui/styles'
import { Theme, Box } from '@material-ui/core'

import empty from 'src/illustrations/empty.png'
import emptyTwo from 'src/illustrations/empty2.png'
import notFound from 'src/illustrations/notFound.png'
import notAuthorized from 'src/illustrations/notAuthorized.png'

import { IllustrationType } from 'src/lib/enums'

const useStyles = makeStyles((_: Theme) => {
  return {
    root: {
      maxHeight: '30vh',
      maxWidth: '30vh',
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

  return (
    <Box className={classes.root}>
      {type === IllustrationType.Empty && <img src={empty} alt={'empty'} />}
      {type === IllustrationType.EmptyTwo && <img src={emptyTwo} alt={'empty'} />}
      {type === IllustrationType.NotFound && <img src={notFound} alt={'not found'} />}
      {type === IllustrationType.NotAuthorized && (
        <img src={notAuthorized} alt={'not authorized'} />
      )}
    </Box>
  )
}
