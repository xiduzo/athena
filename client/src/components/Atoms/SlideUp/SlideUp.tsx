import React from 'react'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { Slide } from '@material-ui/core'

// export const SlideUp = forwardRef(function Transition(
//   props: TransitionProps & { children?: ReactElement<any, any> | undefined },
//   ref: Ref<unknown>
// ) {
//   return <Slide direction='up' ref={ref} {...props} />
// })

export const SlideUp = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})
