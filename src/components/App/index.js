import MyApp from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'

import { ReactQueryCacheProvider, QueryCache } from 'react-query'
import { Hydrate } from 'react-query/hydration'

import { queryHydrate } from './queryHydrate'

export const queryCache = new QueryCache()

const GlobalStyles = createGlobalStyle`
  ${normalize};
  html, body, body, [data-reactroot] {
    height: calc(100vh - 70px);
    min-height: 100%;
    max-width: 100%;
    overflow-y: scroll !important;
  }

  html, body {
    width: 100%;
    font-size: 16px;
    font-family: "Helvetica", "Georgia", sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  input {
    max-width: 100%;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }
  overflow: visible;
`

class App extends MyApp {
  static async getInitialProps(appContext) {
    let pageProps = {}

    if (typeof window === 'undefined') {
      pageProps = await queryHydrate(appContext.ctx)
    }

    return { pageProps }
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyles />
          <ThemeProvider theme={{ mode: 'default' }}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>
      </ReactQueryCacheProvider>
    )
  }
}

export { App }
