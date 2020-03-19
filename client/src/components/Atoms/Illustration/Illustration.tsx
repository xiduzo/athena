import React, { FC } from 'react'

import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'

import empty from 'src/illustrations/empty.png'
import empty2 from 'src/illustrations/empty2.png'
import notFound from 'src/illustrations/notFound.png'

export const useStyles = makeStyles((theme: Theme) => {
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
  type: Illustrations
}

export enum Illustrations {
  empty = 'empty',
  empty2 = 'empty2',
  notFound = 'notFound',
}

export const Illustration: FC<IIllustration> = ({ type }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {type === Illustrations.empty && <img src={empty} alt={'empty'} />}
      {type === Illustrations.empty2 && <img src={empty2} alt={'empty'} />}
      {type === Illustrations.notFound && <img src={notFound} alt={'empty'} />}
    </div>
  )
}
