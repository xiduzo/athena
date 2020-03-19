import { useEffect, useState } from 'react'
import { KeyTypes } from '../enums/keys'

let sequenceBuffer: number[] = []
let lastKeyTime: number = Date.now()

export const and = (props: boolean[]): boolean => !props.includes(false)

export const or = (props: boolean[]): boolean => props.includes(true)

export const not = (isTrue: boolean): boolean => !isTrue

export const xor = (keyOne: boolean, keyTwo: boolean): boolean =>
  and([ not(and([ keyOne, keyTwo ])), or([ keyOne, keyTwo ]) ])

export const sequence = (keyCodes: number[], canExecute: boolean) => {
  const joiner = '>'
  const joinedKeyCodes = keyCodes.join(joiner)
  const joinedSequenceBuffer = sequenceBuffer.join(joiner)

  const matcher = new RegExp(joinedKeyCodes, 'g')
  const match = joinedSequenceBuffer.match(matcher)

  // Let's clear our buffer to prevent duplicate triggers
  if (match) sequenceBuffer = []

  return match && canExecute
}

export const useHotkeys = (key: number, keyType: KeyTypes = KeyTypes.KeyDown) => {
  const [ pressed, setPressed ] = useState<boolean>(false)

  const match = (event: KeyboardEvent) => key === event.which

  const matchKeyTypes = (event: KeyboardEvent) => event.type.toLowerCase() === keyType

  const addEventToSequenceBuffer = (event: KeyboardEvent) => {
    const currentTime = Date.now()
    if (currentTime - lastKeyTime > 500) {
      sequenceBuffer = []
    }

    if (!event.repeat) sequenceBuffer.push(event.which)
    lastKeyTime = currentTime
  }

  const onDown = (event: KeyboardEvent) => {
    if (match(event)) setPressed(matchKeyTypes(event))
    addEventToSequenceBuffer(event)
  }

  const onUp = (event: KeyboardEvent) => {
    if (match(event)) setPressed(matchKeyTypes(event))
    addEventToSequenceBuffer(event)
  }

  useEffect(() => {
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)

    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  })

  return pressed
}
