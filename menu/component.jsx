import React from 'react'
import { useReactFlow } from 'reactflow'
import PieMenu, { Slice } from 'react-pie-menu'

import Api from '../api/api'
import { styles } from './styles.css'

export default function Menu ({ onSelect, pos: { x, y }, nodeId }) {
  const { deleteElements, addNodes, addEdges } = useReactFlow()

  return (
    <PieMenu
      className={ styles }
      radius="125px"
      centerRadius="30px"
      centerX={ x + 'px' }
      centerY={ y + 'px' }
    >
      <Slice onSelect={ async () => {
        onSelect()
        const data = await Api.load(nodeId)
        addNodes(data.nodes)
        addEdges(data.links)
        console.log(data)
      }}>
        <i className="bi-cloud-arrow-down"/>
      </Slice>
      <Slice onSelect={ () => {
        onSelect()
        console.log('search')
        }}>
        <i className="bi-search"/>
      </Slice>
      <Slice onSelect={ () => {
        onSelect()
        console.log('copy')
        }}>
        <i className="bi-clipboard"/>
      </Slice>
      <Slice onSelect={ () => {
        onSelect()
        deleteElements({ nodes: [{ id: nodeId }] })
        }}>
        <i className="bi-trash"/>
      </Slice>
      <Slice onSelect={ () => {
        onSelect()
        console.log('0')
        }}>
        <i className="bi-0-circle"/>
      </Slice>
      <Slice onSelect={ () => {
        onSelect()
        console.log('1')
        }}>
        <i className="bi-1-circle"/>
      </Slice>
      <Slice onSelect={ () => {
        onSelect()
        console.log('2')
        }}>
        <i className="bi-2-circle"/>
      </Slice>
    </PieMenu>
  )
}