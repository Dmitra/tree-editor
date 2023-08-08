import React from 'react'
import { Button } from 'react-bootstrap'

import { styles } from './styles.css'

export default function LayoutSelector ({ onSelect }) {
  return (
    <div className={ styles }>
      <div>
        <Button onClick={ () => onSelect('hierarchy') } variant="light">
          <i className="bi-diagram-2"></i>
        </Button>
        <Button onClick={ () => onSelect('circle') } variant="light">
          <i className="bi-circle"></i>
        </Button>
        <Button onClick={ () => onSelect('force') } variant="light">
          <i className="bi-share"></i>
        </Button>
      </div>
    </div>
  )
}