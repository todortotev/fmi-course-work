import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import { SidebarStyles } from './styled'
import { prefetchPosts } from '../hooks'

export default function Sidebar() {
  const location = useLocation()
  return (
    <SidebarStyles>
      <ListStyles>
        <li>
          <Link to="/">Home</Link>
        </li>
        {location.pathname === '/' && <hr />}
        <li onMouseEnter={() => prefetchPosts()}>
          <Link to="/blog">Blog</Link>
        </li>
        {location.pathname === '/blog' && <hr />}
        <li onMouseEnter={() => prefetchPosts()}>
          <Link to="/admin">Admin</Link>
        </li>
        {location.pathname === '/admin' && <hr />}
      </ListStyles>
    </SidebarStyles>
  )
}

const ListStyles = styled.ul`
  padding-left: 0;
`
