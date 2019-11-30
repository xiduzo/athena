import { ISquad } from 'src/lib/types/squad'

export interface ISquadCard {
  squad: ISquad
  onClick?: () => void
}
