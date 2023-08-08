import React from 'react'
import { Image } from 'react-bootstrap'

import { styles } from './person.css'
export default function Person ({ data }) {

  return (
    <div className={ styles }>
      <Image src={ `./avatar/${data.id}.jpeg` } rounded xs="2" />
      <div className="d-flex flex-column ml-4 justify-content-center flex-grow-1 ">
        <div className="name">{ data.id }<i className="bi-patch-check pl-2"/></div>
        <div className="info d-flex flex-row">
          <div className="item"><i className="bi-envelope-at"/>{ data.email }</div>
          <div className="item"><i className="bi-lock"/>{ data.title }</div>
          <div className="item"><i className="bi-geo-alt"/>{ data.address }</div>
        </div>
      </div>
    </div>
  )
}