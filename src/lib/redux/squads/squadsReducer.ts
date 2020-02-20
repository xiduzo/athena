import { IAction, Status } from '../IRootReducer'
import { ISquad } from 'src/lib/types/squad'

export enum SquadActions {
  setSquads = 'setSquads',
  addSquad = 'addSquad',
}

export interface ISquadsState {
  status: Status
  items: ISquad[]
}

const initial_state: ISquadsState = {
  status: Status.loading,
  items: [],
}

// Object.defineProperty(Array.prototype, 'unique', {
//   enumerable: false,
//   configurable: false,
//   writable: false,
//   value: function() {
//     var a = this.concat()
//     for (var i = 0; i < a.length; ++i) {
//       for (var j = i + 1; j < a.length; ++j) {
//         if (a[i] === a[j]) a.splice(j--, 1)
//       }
//     }

//     return a
//   },
// })

// declare global {
//   interface Array<T> {
//     unique(): Array<T>
//   }
// }
// state.items.concat(payload).unique()

export const squadsReducer = (state: ISquadsState = initial_state, action: IAction): ISquadsState => {
  const { type, payload } = action
  switch (type) {
    case SquadActions.setSquads:
      return {
        ...state,
        status: Status.success,
        items: payload,
      }
    case SquadActions.addSquad:
      return {
        ...state,
        status: Status.success,
        items: state.items.find((item) => item.id === payload.id) ? state.items : state.items.concat(payload),
      }
    default:
      return state
  }
}
