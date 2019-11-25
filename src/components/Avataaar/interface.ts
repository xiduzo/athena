import { TopType } from './enums/TopType'
import { AccessoriesType } from './enums/AccessoriesType'
import { HairColor } from './enums/HairColor'
import { FacialHairType } from './enums/FacialHairType'
import { FacialHairColor } from './enums/FacialHairColor'
import { ClotheType } from './enums/ClotheType'
import { ClotheColor } from './enums/ClotheColor'
import { GraphicType } from './enums/GraphicType'
import { EyeType } from './enums/EyeType'
import { EyebrowType } from './enums/EyebrowType'
import { MouthType } from './enums/MouthType'
import { SkinColor } from './enums/SkinColor'
import { PieceType } from './enums/PieceType'

export interface IAvataaar {
  avatarStyle: 'Circle' | 'Transparent'
  style?: React.CSSProperties
  topType?: TopType
  accessoriesType?: AccessoriesType
  hairColor?: HairColor
  facialHairType?: FacialHairType
  facialHairColor?: FacialHairColor
  clotheType?: ClotheType
  clotheColor?: ClotheColor
  graphicType?: GraphicType
  eyeType?: EyeType
  eyebrowType?: EyebrowType
  mouthType?: MouthType
  skinColor?: SkinColor
}

export interface IAvataaarPiece {
  pieceType?: PieceType
  pieceSize?: number
}
