import { stratify, tree } from 'd3-hierarchy'

export default class CircularTree {
  constructor () {
    this.width = 1000
    this.height = 1000
    this.radius = Math.min(this.width, this.height) / 2 - 30

    this.layout = tree()
      .size([2 * Math.PI, this.radius])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth)
  }

  run (nodes, edges, cb) {
    const data = stratify()
      .id(d => d.id)
      .parentId(d => edges.find(e => e.target === d.id)?.source)(nodes)

    const root = this.layout(data)
    const update = nodes.map(node => {
      let { x, y } = root.find((d) => d.id === node.id) || {
        x: node.position.x,
        y: node.position.y
      }
      const _x = y * Math.cos(x)
      const _y = y * Math.sin(x)

      return {
        ...node,
        position: { x: _x, y: _y },
      }
    })
    cb(update)
  }
}
