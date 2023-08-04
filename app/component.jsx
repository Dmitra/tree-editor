import React, { useEffect, useState } from 'react'
import ReactFlow, {
  useReactFlow,
  useOnSelectionChange,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
} from 'reactflow'

import NodesPanel from '../nodes-panel/component'
import LayoutSelector from '../layout-selector/component'
import Details from '../details/component'
import Properties from '../properties/component'
import Menu from '../menu/component'
import Node from './node'
import Layout from '../layout/layout'
import Api from '../api/api'

import 'reactflow/dist/style.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
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

export default function App() {
  const { fitView } = useReactFlow()
  const [menu, setMenu] = useState({})
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [selection, setSelection] = useState()
  const [layoutName, setLayoutName] = useState('circle')
  Layout(layoutName)

  useOnSelectionChange({
    onChange: ({ nodes: _nodes, edges }) => {
      if (_nodes[0]) setSelection(_nodes[0].id)
    },
  })

  function addNode (sourceId, targetType) {
    const targetId = `${nodes.length + 1}`

    const targetNode = {
      id: targetId,
      position: { x: 0, y: 0 },
      type: 'entity',
      data: { name: targetId, type: targetType },
    }

    const connectingEdge = {
      id: `${sourceId}->${targetId}`,
      source: sourceId,
      target: targetId,
    }

    setNodes(nodes => nodes.concat([targetNode]))
    setEdges(edges => edges.concat([connectingEdge]))
  }

  function onDrop (e) {
    if (e.target instanceof Element) {
      const targetId = e.target.closest('.react-flow__node')?.getAttribute('data-id')
      const targetType = e.dataTransfer.getData('nodeType')

      if (targetId) addNode(targetId, targetType)
    }
  }

  function onNodeRightClick (e, node) {
    e.preventDefault()

    setMenu(prevState => ({
      ...prevState,
      open: true,
      pos: {
        x: e.clientX,
        y: e.clientY,
      },
      nodeId: node.id,
    }));
  }

  function onPaneClick () {
    setMenu({})
  }

  function onNodesChange (changes) {
    setNodes(nodes => applyNodeChanges(changes, nodes))
  }

  function onEdgesChange (changes) {
    setEdges(edges => applyEdgeChanges(changes, edges))
  }

  useEffect(() => {
    (async () => {
      const data = await Api.load('nmedia.uk')
      setNodes(data.nodes)
      setEdges(data.links)
    })()
  }, [])

  useEffect(() => {
    fitView({ duration: 400 })
  }, [nodes, fitView])

  return (
      <div className={ styles }>
        <NodesPanel />
        <LayoutSelector onSelect={ name => setLayoutName(name)} />
        <ReactFlow
          proOptions={ proOptions }
          nodeTypes={ nodeTypes }
          nodes={ nodes }
          edges={ edges }
          onNodesChange={ onNodesChange }
          onEdgesChange={ onEdgesChange }
          fitView
          onDrop={ onDrop }
          onNodeContextMenu={ onNodeRightClick }
          onPaneClick={ onPaneClick }
          defaultEdgeOptions={ defaultEdgeOptions }
          minZoom={ -Infinity }
          maxZoom={ Infinity }
        />
        <div className="sidebar-right">
          <MiniMap zoomable pannable/>
          <Details selection={ selection }/>
          <Properties selection={ selection }/>
        </div>
        { menu.open && <Menu onSelect={onPaneClick} {...menu} /> }
      </div>
  )
}