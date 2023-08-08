import _ from 'lodash'
import React from 'react'
import { useReactFlow } from 'reactflow'
import { InputGroup, FormControl } from 'react-bootstrap'

import { styles } from './styles.css'

export default function Properties ({ selection }) {
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
      <p>Properties</p>
      { selectedNode.data?.host && <InputGroup size="sm" className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">Host: </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl value={ selectedNode.data.host[0].name } onChange={ onChange('host[0].name') } />
        </InputGroup>
      }
      { selectedNode.data?.whois && <>
      <br />
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">Type: </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl value={ selectedNode.data.whois[0].name } onChange={ onChange('whois[0].name') } />
      </InputGroup>
      </>
      }
    </div>
  )
}