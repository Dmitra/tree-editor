import _ from 'lodash'
import React from 'react'

import types from '../app/node-types'
import { styles } from './styles.css'

export default function CreateItemPanel () {
  function onDragStart (type) {
    return e => {
      e.dataTransfer.setData('nodeType', type)
    }
  }

  return (
    <div className={ styles }>
      { _.map(types, (type, name) => (
        <div key={ `new-node-${name}` } onDragStart={ onDragStart(name)} draggable className="node">
          <i className={ type.icon }/>
          { type.label }
        </div>
      ))}
    </div>
  )
}