import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
import { hydrate, dehydrate } from 'react-query/hydration'

import { Wrapper, Main } from './components/styled'
import Sidebar from './components/Sidebar'
import GlobalLoader from './components/GlobalLoader'

import { AdminPosts } from './screens/admin'
import { AdminPost } from './screens/admin/Post'
import { BlogPosts } from './screens/blog'
import { BlogPost } from './screens/blog/Post'
import { queryCache } from './components/App'

function cacheSync() {
  if (typeof localStorage !== 'undefined') {
    let cache = localStorage.getItem('queryCache_1')
    if (cache) {
      hydrate(queryCache, JSON.parse(cache))
    }

    queryCache.subscribe((cache) => {
      localStorage.setItem('queryCache_1', JSON.stringify(dehydrate(cache)))
    })
  }
}

cacheSync()

function SupressHydrationWarning({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof document === 'undefined' ? null : children}
    </div>
  )
}

export const Root = () => {
  return (
    <SupressHydrationWarning>
      <BrowserRouter>
        <Wrapper>
          <Sidebar />
          <Main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1>Welcome!</h1>
                    <p>My name is Todor Totev</p>
                    <p>
                      This is my course work for the Web Programming course in
                      Facultry of Mathematics and Informatics
                    </p>
                  </>
                }
              />
              <Route path="/admin" element={<AdminPosts />} />
              <Route path="/admin/:postId" element={<AdminPost />} />
              <Route path="/blog" element={<BlogPosts />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
            </Routes>
          </Main>
        </Wrapper>
        <GlobalLoader />
        <ReactQueryDevtools />
      </BrowserRouter>
    </SupressHydrationWarning>
  )
}
