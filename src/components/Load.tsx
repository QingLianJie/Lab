import { Bridge } from '@qing-dev/bridge'
import { useAtom } from 'jotai'
import { Fragment, useEffect } from 'react'
import { useMount } from 'react-use'
import { bridgeAtom } from '../contexts/bridge'

export const Load = () => {
  const [bridge, setBridge] = useAtom(bridgeAtom)

  useMount(() => {
    const fetcher = window.Fetcher
    if (fetcher) {
      const bridge = new Bridge(fetcher)
      setBridge(bridge)
    }
  })

  return <Fragment />
}
