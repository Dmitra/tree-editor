import _ from 'lodash'
import React from 'react'
import { useReactFlow } from 'reactflow'
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap'

import { styles } from './styles.css'

export default function Details ({ selection }) {
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow()
  const nodes = getNodes()
  const edges = getEdges()
  const selectedNode = nodes.find(node => node.id === selection)
  const edge = edges.find(edge => edge.target === selection)

  function onSubmit (e) {
    e.preventDefault()

    const id = e.target[0].value
    if (id !== selection) {
      selectedNode.id = id
      selectedNode.data.id = id
      if (edge) {
        edge.target = id
        setEdges(edges)
      }
    }
    selectedNode.data.type = e.target[1].value
    setNodes(nodes)
  }

  if (!selection || !selectedNode) return null

  return (
    <div className={ styles }>
      <p>Details</p>
      { selection && <Form onSubmit={ onSubmit }>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">Name: </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl key={ selectedNode.id } defaultValue={ selectedNode.id }/>
        </InputGroup>
          <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">Type: </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl key={ selectedNode.data.type } defaultValue={ selectedNode.data.type }/>
        </InputGroup>
        <Button className="d-block ml-auto mr-0" type="submit" variant="dark">Save</Button>
      </Form>
    }
    </div>
  )
}