import React from 'react'
import { Button } from 'react-bootstrap'

import { styles } from './styles.css'

export default function LayoutSelector ({ onSelect }) {
  return (
    <div className={ styles }>
      <div>
        <Button onClick={ () => onSelect('hierarchy') }>
          <i className="bi-diagram-2"></i>
        </Button>
        <Button onClick={ () => onSelect('circle') }>
          <i className="bi-circle"></i>
        </Button>
        <Button onClick={ () => onSelect('force') }>
          <i className="bi-share"></i>
        </Button>
      </div>
    </div>
  )
}