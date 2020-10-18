import axios from 'axios'
import { useMutation } from 'react-query'

import { queryCache } from '../../components/App'

export const useSavePost = () => {
  return useMutation(
    (values) =>
      axios
        .patch(`http://localhost:3000/api/posts/${values.id}`, values)
        .then((res) => res.data),
    {
      onMutate: (values) => {
        queryCache.cancelQueries('posts')

        const oldPost = queryCache.getQueryData(['posts', values.id])

        queryCache.setQueryData(['posts', values.id], values)

        return () => queryCache.setQueryData(['posts', values.id], oldPost)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: (data, variables) => {
        queryCache.invalidateQueries('posts')
        queryCache.invalidateQueries(['posts', variables.id])
      },
    }
  )
}
