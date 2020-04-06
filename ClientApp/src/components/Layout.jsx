import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { NavMenu } from './NavMenu'

export function Layout(props) {
  return (
    <div className="gray-bg">
      <NavMenu />
      <div>{props.children}</div>
    </div>
  )
}
