import _ from 'lodash'
import React from 'react'
import { useReactFlow } from 'reactflow'
import { InputGroup, FormControl } from 'react-bootstrap'

import { styles } from './styles.css'

export default function Details ({ selection }) {
  const { getNodes, setNodes } = useReactFlow()
  const nodes = getNodes()
  const selectedNode = nodes.find(node => node.id === selection)

  function onChange (propName) {
    return e => {
      _.set(selectedNode.data, propName, e.target.value)
      setNodes(nodes)
    }
  }

  if (!selection || !selectedNode) return null

  return (
    <div className={ styles }>
      <p>Details</p>
      { selection && <InputGroup size="sm" className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">Name: </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl value={ selectedNode.data.name } onChange={ onChange('name')} />
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">Type: </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl value={ selectedNode.data.type } onChange={ onChange('type') }/>
      </InputGroup>}
    </div>
  )
}