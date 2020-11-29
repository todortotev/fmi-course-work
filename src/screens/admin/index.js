import React from 'react'
import styled from 'styled-components'
import { CreatePost } from './CreatePost'
import { PostList } from './PostList'

export const AdminPosts = () => {
  return (
    <>
      <PostList />
      <CreatePost />
    </>
  )
}
