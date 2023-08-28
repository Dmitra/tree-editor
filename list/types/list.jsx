import _ from 'lodash'
import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function List ({ items, selection, onSelectItem }) {

  return (
    <ListGroup>
      { _.map(items, item => (
        <ListGroup.Item key={ `list-item-${item.id}`}
          action
          variant={ _.includes(selection, item.id) ? 'secondary' : '' }
          onClick={ onSelectItem(item.id) }>
          { item.id }
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}