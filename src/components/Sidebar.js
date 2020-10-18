import React from 'react'
import { Link } from 'react-router-dom'

import { SidebarStyles } from './styled'
import { prefetchPosts } from '../hooks'

export default function Sidebar() {
  return (
    <SidebarStyles>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li onMouseEnter={() => prefetchPosts()}>
          <Link to="/blog">Blog</Link>
        </li>
        <hr />
        <li onMouseEnter={() => prefetchPosts()}>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </SidebarStyles>
  )
}
