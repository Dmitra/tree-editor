import _ from 'lodash'

import data from '../public/data/bundle.json'

class Api {
  async load (idS, source, requestType) {
    const ids = _.castArray(idS)
    const json = []
    for await (const id of ids) {
      let response = data?.[source]?.[requestType]?.[id]
      if (!response && source === 'item') response = data?.[source]?.list?.[id]
      json.push(response)
    }
    console.log(json)
    return requestType === 'item' ? this.formatGraph(this.mergeGraph(json)) : this.formatList(json[0])
  }

  mergeGraph (data) {
    return _.reduce(data, (acc, graph) => {
      acc.nodes.push(...graph.nodes)
      acc.links.push(...graph.links)
      return acc
    }, { nodes: [], links: [] })
  }

  formatGraph (data) {
    data.items = data.nodes.map(this.item2Node)
    delete data.nodes
    data.links.map(link => {
      link.id = `${link.source}-${link.target}`
    })

    return data
  }

  formatList (data) {
    return data.map(this.item2Node)
  }

  item2Node (item) {
    return {
      id: item.id,
      data: {
        ...item,
        icon: _.toLower(item?.properties?.Domain),
      },
      type: 'entity',
      position: { x: 0, y: 0 },
    }
  }
}

export default new Api