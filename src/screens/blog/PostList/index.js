import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { usePosts, prefetchPost } from '../../../hooks'

const resizeImage = (url) =>
  url.substr(0, url.indexOf('/upload/') + 8) +
  `w_400,h_200,c_scale` +
  url.substring(url.indexOf('/sickfits/'))

export const PostList = () => {
  const postsQuery = usePosts()

  return (
    <div>
      <h1>Blog</h1>

      <Container>
        {postsQuery.isLoading ? (
          <span>Loading...</span>
        ) : postsQuery.isError ? (
          postsQuery.error.message
        ) : (
          postsQuery.data.map((post) => (
            <>
              <Card
                as={Link}
                to={`./${post.id}`}
                key={post.id}
                onMouseEnter={() => {
                  prefetchPost(post.id)
                }}
              >
                <ImageBox>
                  <img src={resizeImage(post.image)} />
                </ImageBox>
                <Content>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                </Content>
              </Card>
            </>
          ))
        )}
      </Container>
    </div>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 1100px;

  @media (max-width: 1024px) {
    width: 1000px;
  }

  @media (max-width: 991px) {
    width: 250px;
    flex-direction: column;
  }
`
const Card = styled.div`
  position: relative;
  max-width: 450px;
  border: solid 1px rgba(130, 130, 130, 0.3);
  margin: 10px;
  padding: 15px;

  @media (max-width: 991px) {
    max-width: 250px;
    flex-direction: column;
  }
  :hover {
    text-decoration: none;
    h3 {
      text-decoration: underline;
    }
  }
`
const ImageBox = styled.div``
const Content = styled.div``
