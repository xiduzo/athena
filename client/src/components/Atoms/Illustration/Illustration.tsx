import React, { FC } from 'react'

import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'

import emptyIllustration from 'src/illustrations/empty.png'

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      maxHeight: '50vh',
      maxWidth: '50vh',
      '& img': {
        maxHeight: 'inherit',
        maxWidth: 'inherit',
      },
    },
  }
})

interface IIllustration {
  type: Illustrations
}

export enum Illustrations {
  empty = 'empty',
}

export const Illustration: FC<IIllustration> = ({ type }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>{type === Illustrations.empty && <img src={emptyIllustration} alt={'empty'} />}</div>
  )
}
