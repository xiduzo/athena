import { ITribe } from 'src/lib/interfaces'

export interface ITribeCard {
  tribe: ITribe
  onClick?: () => void
}
