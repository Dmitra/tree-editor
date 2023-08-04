import React, { useEffect, useCallback  } from 'react'
import ReactFlow, {
  useReactFlow,
  useOnSelectionChange,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow'

import Node from './node'
import Layout from '../layout/layout'

import 'reactflow/dist/style.css'
import { styles } from './styles.css'

const nodeTypes = {
  entity: Node,
}

const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
}

const defaultEdgeOptions = {
  type: 'straight',
}

export default function Vis (p) {
  const { fitView} = useReactFlow()
  Layout(p.layout)

  useOnSelectionChange({
    onChange: ({ nodes: nodes}) => {
      if (nodes[0]) p.onSelectionChange(nodes[0].id)
    },
  })

  const onDragOver = useCallback(event => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  function onDrop (e) {
    e.preventDefault()
    if (e.target instanceof Element) {
      const sourceId = e.target.closest('.react-flow__node')?.getAttribute('data-id')

      const target = {
        id: `${p.items.length + 1}`,
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        type: 'entity',
        data: {
          name: `New node ${p.items.length + 1}`,
          type: e.dataTransfer.getData('nodeType'),
        },
      }

      p.addItem(target, sourceId)
    }
  }

  function onNodeContextMenu (e) {
    e.preventDefault()
    p.onItemContextMenu({
      x: e.clientX,
      y: e.clientY,
    })
  }

  function onNodesChange (changes) {
    p.setItems(_nodes => applyNodeChanges(changes, _nodes))
  }

  function onEdgesChange (changes) {
    p.setLinks(_edges => applyEdgeChanges(changes, _edges))
  }

  useEffect(() => {
    fitView({ duration: 400 })
  }, [p.items, fitView])

  return (
      <ReactFlow
        className={ styles }
        proOptions={ proOptions }
        nodeTypes={ nodeTypes }
        nodes={ p.items }
        edges={ p.links }
        onNodesChange={ onNodesChange }
        onEdgesChange={ onEdgesChange }
        fitView
        onDragOver={ onDragOver }
        onDrop={ onDrop }
        onNodeContextMenu={ onNodeContextMenu }
        onPaneClick={ p.onPaneClick }
        defaultEdgeOptions={ defaultEdgeOptions }
        minZoom={ -Infinity }
        maxZoom={ Infinity }
      />
  )
}