import * as actions from './actions'
import { ITribe } from 'src/lib/types/tribe'
import { ISquad } from 'src/lib/types/squad'

interface SelectTribeAction {
  type: typeof actions.SELECT_TRIBE
  payload: ITribe
}

interface SelectSquadAction {
  type: typeof actions.SELECT_SQUAD
  payload: ISquad
}

export type GlobalActionTypes = SelectTribeAction | SelectSquadAction
