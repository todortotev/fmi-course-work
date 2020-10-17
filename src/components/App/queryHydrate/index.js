import { dehydrate } from 'react-query/hydration'
import axios from 'axios'
import { queryCache } from '../index'

export const prefetchPost = (_, postId) =>
  axios.get(`http://localhost:3000/api/posts/${postId}`).then((res) => res.data)

const prefetchPosts = () =>
  axios.get('http://localhost:3000/api/posts').then((res) => res.data)

export const queryHydrate = async (ctx) => {
  // Will be regex or anything better than this lame approach
  if (ctx?.query?.any?.includes('blog')) {
    if (ctx.query.any[1]) {
      let postId = ctx.query.any[1]
      queryCache.prefetchQuery(['posts', String(postId)], prefetchPost, {
        staleTime: 5000,
      })
    }
    queryCache.prefetchQuery(['posts'], prefetchPosts, {
      staleTime: 5000,
    })
  }

  return {
    dehydratedState: dehydrate(queryCache),
  }
}
