import React, { FC } from 'react'
import { IAgreementIcon } from './interface'

import GroupWorkIcon from '@material-ui/icons/GroupWork'
import WorkIcon from '@material-ui/icons/Work'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import DescriptionIcon from '@material-ui/icons/Description'
import { AgreementType } from 'src/lib/enums'

export const AgreementIcon: FC<IAgreementIcon> = ({ type }) => {
  return (
    <>
      {type === AgreementType.ATTITUDE && <GroupWorkIcon />}
      {type === AgreementType.FUNCTIONING_WITHING_TEAM && <EmojiObjectsIcon />}
      {type === AgreementType.KNOWLEDGE_DEVELOPMENT && <DescriptionIcon />}
      {type === AgreementType.ACCOUNTABILITY && <WorkIcon />}
    </>
  )
}
