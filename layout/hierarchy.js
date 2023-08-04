import { stratify, tree } from 'd3-hierarchy'
import { Position } from 'reactflow'

export default class Hierarchy {
  constructor () {
    this.layout = tree()
      .nodeSize([200, 120])
      .separation(() => 1)
  }

  run (nodes, edges, cb) {
    const data = stratify()
      .id(d => d.id)
      .parentId(d => edges.find(e => e.target === d.id)?.source)(nodes)

    const root = this.layout(data)

    cb(nodes.map(node => {
      const { x, y } = root.find((d) => d.id === node.id) || {
        x: node.position.x,
        y: node.position.y
      }

      return {
        ...node,
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        position: { x, y },
      }
    }))
  }
}
