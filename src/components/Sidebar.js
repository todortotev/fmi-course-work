import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { prefetchPosts } from '../hooks'

export const SidebarStyles = styled.div`
  width: 175px;
  border-right: 1px solid black;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 80px;
    font-size: 15px;
  }
`

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
        {location.pathname.startsWith('/blog') && <hr />}
        <li onMouseEnter={() => prefetchPosts()}>
          <Link to="/admin">Admin</Link>
        </li>
        {location.pathname.startsWith('/admin') && <hr />}
      </ListStyles>
    </SidebarStyles>
  )
}

const ListStyles = styled.ul`
  padding-left: 0;
`
