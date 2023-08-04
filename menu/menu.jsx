import React from 'react'
import PieMenu, { Slice } from 'react-pie-menu'

import { styles } from './styles.css'

export default function Menu ({ onSelect, menu: { x, y } }) {
  return (
    <PieMenu
      className={ styles }
      radius="125px"
      centerRadius="30px"
      centerX={ x + 'px' }
      centerY={ y + 'px' }
    >
      <Slice onSelect={ () => onSelect('enrich') }>
        <i className="bi-cloud-arrow-down"/>
      </Slice>
      <Slice onSelect={ () => onSelect('edit') }>
        <i className="bi-pencil"/>
      </Slice>
      <Slice onSelect={ () => onSelect('copy') }>
        <i className="bi-clipboard"/>
      </Slice>
      <Slice onSelect={ () =>  onSelect('delete') }>
        <i className="bi-trash"/>
      </Slice>
    </PieMenu>
  )
}