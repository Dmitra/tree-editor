import { forceSimulation, forceLink, forceManyBody, forceX, forceY } from 'd3-force'

export default class Force {
  constructor () {
    this.charge = -1000
    this.distance = 150
  }

  run (nodes, edges, cb) {
    const simulationNodes = nodes.map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }))

    const simulationLinks = edges.map(edge => edge)

    const runner = forceSimulation()
      .nodes(simulationNodes)
      .force('charge', forceManyBody().strength(this.charge))
      .alphaMin(0.3)
      .force(
        'link',
        forceLink(simulationLinks)
          .id(d => d.id)
          .strength(0.05)
          .distance(this.distance)
      )
      .force('x', forceX().x(0).strength(0.08))
      .force('y', forceY().y(0).strength(0.08))
      .on('end', () => {
          cb(simulationNodes.map((node) => ({
            ...node,
            position: { x: node.x ?? 0, y: node.y ?? 0 },
          }))
        )
      })
    return runner
  }
}
