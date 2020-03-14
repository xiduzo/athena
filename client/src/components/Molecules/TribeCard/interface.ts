import { ITribe } from 'src/lib/types/tribe'

export interface ITribeCard {
  tribe: ITribe
  onClick?: () => void
}
