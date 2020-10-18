import axios from 'axios'
import { useQuery } from 'react-query'

import { queryCache } from '../../components/App'

const fetchPosts = () =>
  axios.get('http://localhost:3000/api/posts').then((res) => res.data)

export const prefetchPosts = (postId) => {
  queryCache.prefetchQuery(['posts', String(postId)], fetchPosts, {
    staleTime: 5000,
  })
}

export const usePosts = () => useQuery('posts', fetchPosts)
