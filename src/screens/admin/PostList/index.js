import React from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../../../hooks'
import { prefetchPost } from '../../../hooks/usePost'
import { Loader } from '../../../components/GlobalLoader'

export const PostList = () => {
  const postsQuery = usePosts()
  return (
    <div>
      <div>
        {postsQuery.isLoading ? (
          <span>
            <Loader /> Loading
          </span>
        ) : (
          <>
            <h3>Posts</h3>
            <ul>
              {postsQuery.data.map((post) => (
                <li
                  key={post.id}
                  style={
                    post.isPreview && { opacity: 0.3, pointerEvents: 'none' }
                  }
                >
                  <Link
                    to={`./${post.id}`}
                    onMouseEnter={() => prefetchPost(post.id)}
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <br />
          </>
        )}
      </div>
    </div>
  )
}
