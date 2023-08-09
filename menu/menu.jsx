import _ from 'lodash'
import React, { useEffect, useRef } from 'react'
import CMenu from 'circular-menu'

import enrich from './enrich.json'

import 'circular-menu/dist/css/circular-menu.css'
import { styles } from './styles.css'

export default function Menu ({ onSelect, x, y, item }) {
  const menu = useRef()
  const config = {
    diameter: 200,
    menus: [{
      title: 'Copy',
      icon: 'bi-clipboard',
    }, {
      title: 'Edit',
      icon: 'bi-pencil',
      disabled: true,
    }, {
      title: 'Enrich',
      icon: 'bi-cloud-arrow-down',
      menus: _.map(enrich[item.type], title => makeItem('enrich', title)),
    }, {
      title: 'Delete',
      icon: 'bi-trash',
      click: onSelect(item.id, 'remove'),
    }]
  }

  function makeItem (parent, title, icon) {
    return {
      title,
      icon,
      click: onSelect(item.id, title, parent),
    }
  }

  useEffect(() => {
    menu.current = CMenu('#menu1')
      .config(config)
  }, [])

  useEffect(() => {
    if (x && y) menu.current.show([x, y])
  }, [x, y])

  return (
    <div id='menu1' className={ styles }></div>
  )
}