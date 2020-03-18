import React, { FC } from 'react'

import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'

import emptyIllustration from 'src/illustrations/empty.png'
import empty2Illustration from 'src/illustrations/empty2.png'

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
  empty2 = 'empty2',
}

export const Illustration: FC<IIllustration> = ({ type }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {type === Illustrations.empty && <img src={emptyIllustration} alt={'empty'} />}
      {type === Illustrations.empty2 && <img src={empty2Illustration} alt={'empty'} />}
    </div>
  )
}
