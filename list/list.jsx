import _ from 'lodash'
import React from 'react'

import { styles } from './styles.css'

export default function List ({ items }) {

  return (
    <div className={ styles }>
      { _.map(items, item => (
        <div></div>
      ))}
    </div>
  )
}