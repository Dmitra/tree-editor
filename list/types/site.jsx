import _ from 'lodash'
import React from 'react'
import { Table } from 'react-bootstrap'
import { styles } from './site.css'

export default function Site ({ items, selection, onSelectItem }) {

  return (
    <Table className={ styles }>
      <thead>
        <tr>
          <th>Domain Name</th>
          <th>Created At</th>
          <th>Registrar</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        { _.map(items, ({ id, data }) => (
          <tr key={ id }
            className={ _.includes(selection, id) ? 'selected' : '' }
            onClick={ onSelectItem(id) }
          >
            <td>{ id }</td>
            <td>{ data['Created Date'] }</td>
            <td>{ data.Registrar }</td>
            <td>{ data.Status }</td>
          </tr>
        )) }
      </tbody>
    </Table>
  )
}