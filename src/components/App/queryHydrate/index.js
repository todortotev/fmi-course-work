import { dehydrate } from 'react-query/hydration'
import axios from 'axios'
import { queryCache } from '../index'
import { prefetchPost, prefetchPosts } from '../../../hooks'

export const queryHydrate = async (ctx) => {
  // Will be regex or anything better than this lame approach
  if (ctx?.query?.any?.includes('blog', 'admin')) {
    if (ctx.query.any[1]) {
      let postId = ctx.query.any[1]
      prefetchPost(postId)
    }
    prefetchPosts()
  }

  return {
    dehydratedState: dehydrate(queryCache),
  }
}
