import _ from 'lodash'
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import List from './types/list'

import * as Views from './types'

export default function ModalList ({ items, source, onSelect }) {
  const [selection, setSelection] = useState([])
  const View = Views[_.camelCase(items[0].data.type)] || List

  function onSelectItem (item) {
    return () => {
      const newSelection = _.includes(selection, item) ? _.without(selection, item) : [item, ...selection]
      setSelection(newSelection)
    }
  }

  const props = { items, selection, onSelectItem }

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
        <View { ...props }/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ onSelect(selection, source) }>Select</Button>
      </Modal.Footer>
    </Modal>
  )
}