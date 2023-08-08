import _ from 'lodash'
import React, { useState } from 'react'
import { Modal, Button, ListGroup } from 'react-bootstrap'

import * as Views from './types'

export default function List ({ items, source, onSelect }) {
  const [selection, setSelection] = useState([])
  const View = Views[items[0].data.type]

  function onSelectItem (item) {
    return () => {
      setSelection([item, ...selection])
    }
  }

  return (
    <Modal
      show={ !!items }
      size="lg"
      centered
      onHide={ onSelect() }
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          { source } items
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          { _.map(items, item => (
            <ListGroup.Item key={ `list-item-${item.id}`}
              action
              variant={ _.includes(selection, item.id) ? 'secondary' : '' }
              onClick={ onSelectItem(item.id) }>
              { View && <View data={ item.data }/> }
              { !View && item.id }
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ onSelect(selection, source) }>Select</Button>
      </Modal.Footer>
    </Modal>
  )
}