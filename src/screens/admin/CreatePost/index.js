import React from 'react'
import { useCreatePost } from '../../../hooks'
import PostForm from '../../../components/PostForm'

export const CreatePost = () => {
  const [createPost, createPostInfo] = useCreatePost()
  return (
    <div>
      <h3>Create New Post</h3>
      <div>
        <PostForm
          onSubmit={createPost}
          clearOnSubmit
          submitText={
            createPostInfo.isLoading
              ? 'Saving...'
              : createPostInfo.isError
              ? 'Error!'
              : createPostInfo.isSuccess
              ? 'Saved!'
              : 'Create Post'
          }
        />
      </div>
    </div>
  )
}
