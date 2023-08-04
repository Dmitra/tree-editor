import { useEffect } from 'react'
import { useStore, useReactFlow } from 'reactflow'

import hierarchy from './hierarchy'
import force from './force'
import circle from './circle'

const Layouts = {
  hierarchy,
  force,
  circle,
}
const nodeCountSelector = state => state.nodeInternals.size
const nodesInitializedSelector = state =>
  Array.from(state.nodeInternals.values()).every((node) => node.width && node.height)

export default function Layout (name) {
  const layout = new Layouts[name]
  const nodeCount = useStore(nodeCountSelector)
  const nodesInitialized = useStore(nodesInitializedSelector)
  const { getNodes, getEdges, setNodes, setEdges, fitView } = useReactFlow()

  useEffect(() => {
    if (!nodeCount || !nodesInitialized) return

    const nodes = getNodes()
    const edges = getEdges()

    function cb (_nodes) {
      setNodes(_nodes)
      setEdges(edges => edges.map(edge => ({ ...edge, style: { opacity: 1 } })))
    }
    const runner = layout.run(nodes, edges, cb)

    return () => { runner?.stop() }
  }, [name, nodeCount, nodesInitialized, getNodes, getEdges, setNodes, setEdges, fitView])
}