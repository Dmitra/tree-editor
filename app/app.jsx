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

import 'bootstrap-icons/font/bootstrap-icons.css'
import { styles } from './styles.css'

export default function App() {
  // TODO replace ReactFlow nodes management by local "nodes" state
  const [menu, setMenu] = useState({})
  const [list, setList] = useState({ open: false })
  const [items, setItems] = useState([])
  const [links, setLinks] = useState([])
  const [selection, setSelection] = useState()
  const [layout, setLayout] = useState('circle')

  function useOnSelectionChange (id) {
    setSelection(id)
  }

  function addItem (target, sourceId) {
    setItems(items => items.concat([target]))
    console.log(items)

    if (sourceId) {
      const connectingLink = {
        id: `${sourceId}->${target.id}`,
        source: sourceId,
        target: target.id,
      }
      setLinks(links => links.concat([connectingLink]))
    }
  }

  function onItemContextMenu (pos) {
    setMenu(pos)
  }

  function onPaneClick () {
    setMenu({})
  }

  function onMenu (name) {
    return () => {
      switch (name) {
        case 'enrich':
          setList({ open: true })
          break
        case 'edit':
          break
        case 'copy':
          break
        case 'delete':
          // update items state
          // deleteElements({ nodes: [{ id: nodeId }] })
          break
      }
      onPaneClick()
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
        { menu.open && <Menu onSelect={ onMenu } menu /> }
        { list.open && <List/> }
      </div>
  )
}