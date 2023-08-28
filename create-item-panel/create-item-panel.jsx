import _ from 'lodash'
import React from 'react'

import types from '../app/node-types.json'
import { styles } from './styles.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import mainLogo from '../tracer_osint.png'

export default function CreateItemPanel () {
  function onDragStart (type) {
    return e => {
      e.dataTransfer.setData('nodeType', type)
    }
  }

  return (
    
    
    <div className={ styles }>
    
    <img style={{marginBottom: "15px"}} width={190} src={mainLogo} alt="tracer"/>

    <div className="searchcontainer">
    <input type="text" name="code" size="20" id="searchbox" placeholder=" &#128270; Search" maxlength="4"></input>

    </div>
      { _.map(types, (type, name) => (
        <div key={ `new-node-${name}` } onDragStart={ onDragStart(name)} draggable className="node">
          <i className={ `bi-${type.icon}` }/>
          { type.label }
        </div>
      ))}
    </div>
  )
}