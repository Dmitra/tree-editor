
class Api {
  async load (id) {
    const response = await fetch(`data/${id}.json`)
    const json = await response.json()
    return this.format(json)
  }

  format (data) {
    data.nodes = data.nodes.map(dataNode => {
      const node = {
        id: dataNode.id,
        data: {
          ...dataNode,
          name: dataNode.id,
        },
        type: 'entity',
        position: { x: 0, y: 0 },
      }

      return node
    })
    data.links.map(link => {
      link.id = `${link.source}-${link.target}`
    })

    return data
  }
}

export default new Api