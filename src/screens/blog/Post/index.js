import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { usePost } from '../../../hooks'
import { resizeImage } from '../PostList'

export const BlogPost = () => {
  const { postId } = useParams()
  const postQuery = usePost(postId)

  return (
    <>
      {postQuery.isLoading ? (
        <span>Loading...</span>
      ) : postQuery.isError ? (
        postQuery.error.message
      ) : (
        <div>
          <h2>{postQuery.data.title}</h2>
          <p>{postQuery.data.body}</p>
          <Image src={resizeImage(postQuery.data.image, 500, 150)}></Image>
        </div>
      )}
    </>
  )
}

const Image = styled.img`
  float: left;
  left: 0;
`
