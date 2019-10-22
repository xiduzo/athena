import { ITribe } from 'src/lib/types/tribe'
import { ISquad } from 'src/lib/types/squad'

export interface IGlobalState {
  selectedTribe?: ITribe
  selectedSquad?: ISquad
  is_logged_in: boolean
}
