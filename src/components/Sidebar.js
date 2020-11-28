import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { SidebarStyles } from './styled'
import { prefetchPosts } from '../hooks'

export default function Sidebar() {
  return (
    <SidebarStyles>
      <ListStyles>
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
      </ListStyles>
    </SidebarStyles>
  )
}

const ListStyles = styled.ul`
  padding-left: 0;
`
