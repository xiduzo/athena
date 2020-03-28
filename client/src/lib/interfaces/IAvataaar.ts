import { TopType } from 'src/lib/enums/avataaar'
import { AccessoriesType } from 'src/lib/enums/avataaar'
import { HairColor } from 'src/lib/enums/avataaar'
import { FacialHairType } from 'src/lib/enums/avataaar'
import { FacialHairColor } from 'src/lib/enums/avataaar'
import { ClotheType } from 'src/lib/enums/avataaar'
import { ClotheColor } from 'src/lib/enums/avataaar'
import { GraphicType } from 'src/lib/enums/avataaar'
import { EyeType } from 'src/lib/enums/avataaar'
import { EyebrowType } from 'src/lib/enums/avataaar'
import { MouthType } from 'src/lib/enums/avataaar'
import { SkinColor } from 'src/lib/enums/avataaar'
import { PieceType } from 'src/lib/enums/avataaar'
import { AvatarStyle } from 'avataaars'

export interface IAvataaar {
  avatarStyle?: AvatarStyle
  style?: React.CSSProperties
  TopType?: TopType
  AccessoriesType?: AccessoriesType
  HairColor?: HairColor
  FacialHairType?: FacialHairType
  FacialHairColor?: FacialHairColor
  ClotheType?: ClotheType
  ClotheColor?: ClotheColor
  GraphicType?: GraphicType
  EyeType?: EyeType
  EyebrowType?: EyebrowType
  MouthType?: MouthType
  SkinColor?: SkinColor
}
