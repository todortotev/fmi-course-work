import React from 'react'
import { useIsFetching } from 'react-query'

export default function GlobalLoader() {
  const isFetching = useIsFetching()

  return (
    <Loader
      css={`
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        font-size: 1.5rem;
        transition: 0.3s ease;
      `}
      style={{
        opacity: isFetching ? 1 : 0,
      }}
    />
  )
}

import { keyframes } from 'styled-components'
import { ImSpinner2 } from 'react-icons/im'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export function Loader(props) {
  return (
    <ImSpinner2
      {...props}
      css={`
        vertical-align: middle;
        animation: ${rotate} 1s linear infinite;
      `}
    />
  )
}
