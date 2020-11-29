import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { usePosts, prefetchPost } from '../../../hooks'

export const PostList = () => {
  const postsQuery = usePosts()

  return (
    <div>
      <h1>Blog</h1>

      <PostListStyles>
        {postsQuery.isLoading ? (
          <span>Loading...</span>
        ) : postsQuery.isError ? (
          postsQuery.error.message
        ) : (
          postsQuery.data.map((post) => (
            <>
              <PostStyles
                as={Link}
                to={`./${post.id}`}
                key={post.id}
                onMouseEnter={() => {
                  prefetchPost(post.id)
                }}
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </PostStyles>
            </>
          ))
        )}
      </PostListStyles>
    </div>
  )
}

export const PostStyles = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px rgba(130, 130, 130, 0.3);
  padding: 1rem;
  color: inherit;
  width: 700px;
  margin: 1rem 1rem 1rem 0;

  @media (max-width: 968px) {
    width: 300px;
    height: 300px;
  }

  :hover {
    text-decoration: none;
    h3 {
      text-decoration: underline;
    }
  }
`

const PostListStyles = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
