import _ from 'lodash'
import React from 'react'
import { ListGroup, Image } from 'react-bootstrap'

import { styles } from './person.css'
export default function Person ({ items, selection, onSelectItem }) {

  return (
    <ListGroup className={ styles }>
      { _.map(items, ({ id, data }) => (
        <ListGroup.Item key={ `list-item-${id}`}
          action
          variant={ _.includes(selection, id) ? 'secondary' : '' }
          onClick={ onSelectItem(id) }
        >
          <div className={ styles }>
            <Image src={ `./avatar/${data.id}.jpeg` } rounded xs="2" />
            <div className="d-flex flex-column ml-4 justify-content-center flex-grow-1 ">
              <div className="name">{ data.id }<i className="bi-patch-check pl-2"/></div>
              <div className="info d-flex flex-row">
                <div className="item"><i className="bi-envelope-at"/>{ data.email }</div>
                <div className="item"><i className="bi-lock"/>{ data.title }</div>
                <div className="item"><i className="bi-geo-alt"/>{ data['addr.'] }</div>
              </div>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}