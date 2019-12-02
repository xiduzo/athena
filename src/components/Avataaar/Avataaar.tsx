import React, { FC } from 'react'
import { IAvataaar } from './interface'
import LazyLoad from 'react-lazyload'

import { Avatar as ReactAvatar, makeStyles, Theme } from '@material-ui/core'

import Avatar from 'avataaars'
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
import Skeleton from '@material-ui/lab/Skeleton'
import { lightBlue } from '@material-ui/core/colors'

const getRandomAvatar = (): IAvataaar => {
  return {
    avatarStyle: 'Circle',
    style: { width: '50px', height: '50px' },
    topType: TopType[Object.keys(TopType)[Math.floor(Math.random() * Object.keys(TopType).length)]],
    accessoriesType:
      AccessoriesType[Object.keys(AccessoriesType)[Math.floor(Math.random() * Object.keys(AccessoriesType).length)]],
    hairColor: HairColor[Object.keys(HairColor)[Math.floor(Math.random() * Object.keys(HairColor).length)]],
    facialHairType:
      FacialHairType[Object.keys(FacialHairType)[Math.floor(Math.random() * Object.keys(FacialHairType).length)]],
    facialHairColor:
      FacialHairColor[Object.keys(FacialHairColor)[Math.floor(Math.random() * Object.keys(FacialHairColor).length)]],
    clotheType: ClotheType[Object.keys(ClotheType)[Math.floor(Math.random() * Object.keys(ClotheType).length)]],
    clotheColor: ClotheColor[Object.keys(ClotheColor)[Math.floor(Math.random() * Object.keys(ClotheColor).length)]],
    graphicType: GraphicType[Object.keys(GraphicType)[Math.floor(Math.random() * Object.keys(GraphicType).length)]],
    eyeType: EyeType[Object.keys(EyeType)[Math.floor(Math.random() * Object.keys(EyeType).length)]],
    eyebrowType: EyebrowType[Object.keys(EyebrowType)[Math.floor(Math.random() * Object.keys(EyebrowType).length)]],
    mouthType: MouthType[Object.keys(MouthType)[Math.floor(Math.random() * Object.keys(MouthType).length)]],
    skinColor: SkinColor[Object.keys(SkinColor)[Math.floor(Math.random() * Object.keys(SkinColor).length)]],
  }
}
const avatarCircleColor: string = lightBlue[100]
export const useStyles = makeStyles((_: Theme) => {
  return {
    avatarLazy: {
      background: avatarCircleColor,
      width: '50px',
      height: '53px',
    },
    avatar: {
      '& #Circle': {
        '& g': {
          fill: avatarCircleColor,
        },
      },
    },
  }
})
export const Avataaar: FC<IAvataaar> = (props) => {
  const classes = useStyles()

  const randomAvatar = getRandomAvatar()
  const avatar: IAvataaar = {
    ...randomAvatar,
    ...props,
  }

  return (
    <LazyLoad
      height={60}
      placeholder={
        <ReactAvatar className={classes.avatarLazy}>
          <Skeleton variant="circle" />
        </ReactAvatar>
      }
    >
      <div className={classes.avatar}>
        <Avatar {...avatar} />
      </div>
    </LazyLoad>
  )
}
