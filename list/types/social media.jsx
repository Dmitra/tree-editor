import _ from 'lodash'
import React from 'react'
import { Table, Image } from 'react-bootstrap'

import { styles } from './social-media.css'
export default function SocialMedia ({ items, selection, onSelectItem }) {

  return (
    <Table className={ styles }>
      <thead>
        <tr>
          <th>Thumbnail</th>
          <th>Name</th>
          <th>Domain</th>
          <th>URL</th>
          <th>Followers</th>
        </tr>
      </thead>
      <tbody>
        { _.map(items, ({ id, data }) => (
          <tr key={ id }
            className={ _.includes(selection, id) ? 'selected' : '' }
            onClick={ onSelectItem(id) }
          >
            <td>
              <Image src={ `./avatar/${data.name}.jpeg` } rounded xs="2" />
            </td>
            <td>{ data.name }</td>
            <td>{ data.Domain }</td>
            <td>{ data.URL }</td>
            <td>{ data.Followers }</td>
          </tr>
        )) }
      </tbody>
    </Table>
  )
}