import { Avatar as ReactAvatar, makeStyles, Theme } from '@material-ui/core'
import { lightBlue } from '@material-ui/core/colors'
import Skeleton from '@material-ui/lab/Skeleton'
import Avatar, { AvatarStyle } from 'avataaars'
import React, { FC } from 'react'
import LazyLoad from 'react-lazyload'
import {
  AccessoriesType,
  ClotheColor,
  ClotheType,
  EyebrowType,
  EyeType,
  FacialHairColor,
  FacialHairType,
  GraphicType,
  HairColor,
  MouthType,
  SkinColor,
  TopType,
} from 'src/lib/enums/avataaar'
import { IAvataaar } from 'src/lib/interfaces'

export const generateRandomAvatar = (): IAvataaar => {
  return {
    avatarStyle: AvatarStyle.Circle,
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

const useStyles = makeStyles((_: Theme) => {
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
  // const randomAvatar = generateRandomAvatar()

  // const avatar: IAvataaar = {
  //   // ...randomAvatar,
  //   ...props,
  // }

  return (
    <LazyLoad
      height={60}
      placeholder={
        <ReactAvatar className={classes.avatarLazy}>
          <Skeleton variant='circle' />
        </ReactAvatar>
      }
    >
      <div className={classes.avatar}>
        <Avatar
          avatarStyle={props.avatarStyle ? props.avatarStyle : AvatarStyle.Circle}
          style={{ width: '50px', height: '50px', ...props.style }}
          {...props}
        />
      </div>
    </LazyLoad>
  )
}
