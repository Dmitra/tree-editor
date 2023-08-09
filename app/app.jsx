import _ from 'lodash'
import React, { useState } from 'react'
import { MiniMap } from 'reactflow'

import Vis from '../vis/vis'
import CreateItemPanel from '../create-item-panel/create-item-panel'
import LayoutSelector from '../layout-selector/layout-selector'
import Details from '../details/details'
import Properties from '../properties/properties'
import List from '../list/list'
import Menu from '../menu/menu'
import Api from '../api/api'

import { styles } from './styles.css'

export default function App() {
  const [menu, setMenu] = useState({})
  const [list, setList] = useState()
  const [items, setItems] = useState([])
  //   id: '800-555-2323', position: { x: 400, y: 400}, type: 'entity',
  //   data: { id: '800-555-2323', type: 'phone' },
  // }])
  //   id: 'alphaott.com', position: { x: 400, y: 400}, type: 'entity',
  //   data: { id: 'alphaott.com', type: 'site' },
  // }])
  const [links, setLinks] = useState([])
  const [selection, setSelection] = useState()
  const [layout, setLayout] = useState('circle')

  function useOnSelectionChange (id) {
    setSelection(id)
  }

  function addItem (target, sourceId) {
    target.id = `${items.length + 1}`
    target.data.id = target.id

    setItems(items => items.concat([target]))
    if (sourceId) {
      const connectingLink = {
        id: `${sourceId}->${target.id}`,
        source: sourceId,
        target: target.id,
      }
      setLinks(links => links.concat([connectingLink]))
    }
  }

  function removeItem (id) {
    setItems(_.filter(items, item => item.id !== id))
  }

  function mergeGraph (graph) {
    setItems(items => items.concat(graph.items))
    setLinks(links => links.concat(graph.links))
  }

  function onItemContextMenu (config) {
    setMenu(config)
  }

  function onPaneClick () {
    setMenu({})
  }

  function onMenu (itemId, menuItem, parentMenu) {
    const action = parentMenu || menuItem
    return async () => {
      switch (action) {
        case 'enrich':
          const loadedList = await Api.load(itemId, menuItem, 'list')
          setList({ items: loadedList, source: menuItem })
          break
        case 'edit':
          break
        case 'copy':
          break
        case 'remove':
          removeItem(itemId)
          break
      }
      onPaneClick()
    }
  }

  function onSelectListItem (id, source) {
    return async () => {
      setList()
      const graph = await Api.load(id, source, 'item')
      mergeGraph(graph)
    }
  }

  return (
      <div className={ styles }>
        <CreateItemPanel />
        <LayoutSelector onSelect={ name => setLayout(name)} />
        <Vis
          items={ items }
          links={ links }
          setItems={ setItems }
          setLinks={ setLinks }
          addItem={ addItem }
          layout={ layout }
          onSelectionChange={ useOnSelectionChange }
          onItemContextMenu={ onItemContextMenu }
          onPaneClick={ onPaneClick }
        />
        <div className="sidebar-right">
          <MiniMap zoomable pannable/>
          <Details selection={ selection }/>
          <Properties selection={ selection }/>
        </div>
        { menu.x && <Menu onSelect={ onMenu } {...menu} /> }
        { list && <List { ...list } onSelect={ onSelectListItem }/> }
      </div>
  )
}