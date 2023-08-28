import React, { useState } from 'react'
import { Handle, Position } from 'reactflow'
import clsx from 'clsx'

import types from '../app/node-types.json'
import { styles } from './node.css'

export default function Node({ data, sourcePosition, targetPosition }) {
  const [isDropzoneActive, setDropzoneActive] = useState(false)

  function onDrop () {
    setDropzoneActive(false)
  }

  function onDragOver (e) {
    e.preventDefault()
  }

  function onDragEnter () {
    setDropzoneActive(true)
  }

  function onDragLeave () {
    setDropzoneActive(false)
  }

  const className = clsx(styles, { dropzone: isDropzoneActive })

  return (
    <div className={ className }
      onDrop={ onDrop }
      onDragOver={ onDragOver }
      onDragEnter={ onDragEnter }
      onDragLeave={ onDragLeave }
    >
      { !data.src && <i className={ `bi-${data.icon || types[data.type]?.icon}` }/>}
      { data.src && <img src={ data.src }/> }
      <Handle type="target" position={ targetPosition || Position.Top } />
      <Handle type="source" position={ sourcePosition || Position.Bottom } />
      { data.id }
    </div>
  )
}