import React, { forwardRef } from 'react'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { Slide } from '@material-ui/core'

export const SlideUp = forwardRef<unknown, TransitionProps>((props, ref) => {
  return <Slide direction={`up`} ref={ref} {...props} />
})
