import { dehydrate } from "react-query/hydration";
import { prefetchPost, prefetchPosts } from "../../../hooks";
import { queryCache } from "../index";

export const queryHydrate = async (ctx) => {
  // Will be regex or anything better than this lame approach
  if (ctx?.query?.any?.some("blog", "admin")) {
    if (ctx.query.any[1]) {
      let postId = ctx.query.any[1];
      queryCache.prefetchQuery(["posts", String(postId)], prefetchPost, {
        staleTime: 5000,
      });
    }
    queryCache.prefetchQuery(["posts"], prefetchPosts, {
      staleTime: 5000,
    });
  }

  return {
    dehydratedState: dehydrate(queryCache),
  };
};
