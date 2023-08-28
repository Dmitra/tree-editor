import _ from 'lodash'
import React from 'react'
import { useReactFlow } from 'reactflow'
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap'

import { styles } from './styles.css'

export default function Properties ({ selection }) {
  const { getNodes, setNodes } = useReactFlow()
  const nodes = getNodes()
  const selectedNode = nodes.find(node => node.id === selection)

  function onSubmit (e) {
    e.preventDefault()

    _.each(e.target.getElementsByTagName('input'), target => {
      name = target.closest('.input-group').getAttribute('data-id')
      selectedNode.data.properties[name] = target.value
    })
    setNodes(nodes)
  }

  if (!selection || !selectedNode) return null

  return (
    <div className={ styles }>
      <p>Properties</p>
      { selectedNode.data.properties && <Form onSubmit={ onSubmit }>
        { _.map(selectedNode.data.properties, (value, name) => (
          <InputGroup key={ `item-${selection}-prop-${name}` } size="sm" className="mb-3" data-id={ name }>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">{ name }</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl defaultValue={ value }/>
          </InputGroup>
        ))}
        <Button className="btn btn-primary btn-lg btn-block btn-sm" type="submit">Save</Button>
      </Form>
      }
    </div>
  )
}