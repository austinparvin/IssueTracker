import React from 'react'
import { NavMenu } from './NavMenu'

export function Layout(props) {
  return (
    <div className="gray-bg">
      <NavMenu />
      <div>{props.children}</div>
    </div>
  )
}
