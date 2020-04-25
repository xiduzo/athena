import React, { forwardRef, ReactElement, Ref } from 'react'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { Slide } from '@material-ui/core'

export const SlideUp = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement<any, any> | undefined },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})
