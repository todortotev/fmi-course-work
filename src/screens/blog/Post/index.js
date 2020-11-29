import React from 'react'
import { useParams } from 'react-router-dom'
import { usePost } from '../../../hooks'
import styled from 'styled-components'

const resizeImage = (url) =>
  url.substr(0, url.indexOf('/upload/') + 8) +
  `w_500,h_150,c_scale` +
  url.substring(url.indexOf('/sickfits/'))
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
          <Image src={resizeImage(postQuery.data.image)}></Image>
        </div>
      )}
    </>
  )
}

const Image = styled.img`
  float: left;
  left: 0;
`
