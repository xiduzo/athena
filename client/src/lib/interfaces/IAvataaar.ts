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
