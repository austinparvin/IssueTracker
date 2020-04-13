import React from 'react'
import { PromoNavMenu } from './PromoNavMenu'

export function PromoLayout(props) {
  return (
    <div className="gray-bg">
      <PromoNavMenu />
      <div>{props.children}</div>
    </div>
  )
}
