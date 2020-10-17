import React from 'react'
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
