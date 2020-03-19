import { ITribe } from 'src/lib/interfaces/tribe'

export interface ITribeCard {
  tribe: ITribe
  onClick?: () => void
}
