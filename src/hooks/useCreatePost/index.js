import axios from 'axios'
import { useMutation } from 'react-query'
import { queryCache } from '../../components/App'

export const useCreatePost = () => {
  return useMutation(
    (values) =>
      axios
        .post('http://localhost:3000/api/posts', values)
        .then((res) => res.data),
    {
      onMutate: (values) => {
        queryCache.cancelQueries('posts')

        const oldPosts = queryCache.getQueryData('posts')

        queryCache.setQueryData('posts', (old) => {
          return [
            ...old,
            {
              ...values,
              id: Date.now(),
              isPreview: true,
            },
          ]
        })

        return () => queryCache.setQueryData('posts', oldPosts)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: () => queryCache.invalidateQueries('posts'),
    }
  )
}
