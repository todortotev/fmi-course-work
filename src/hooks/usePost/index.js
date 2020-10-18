import axios from 'axios'
import { useQuery } from 'react-query'

import { queryCache } from '../../components/App'

export const fetchPost = (_, postId) =>
  axios.get(`http://localhost:3000/api/posts/${postId}`).then((res) => res.data)

export const prefetchPost = (postId) => {
  queryCache.prefetchQuery(['posts', String(postId)], fetchPost, {
    staleTime: 5000,
  })
}

export const usePost = (postId) => {
  return useQuery(['posts', postId], fetchPost, {
    initialData: () =>
      queryCache.getQueryData('posts')?.find((d) => d.id == postId),
    staleTime: 2000,
  })
}
