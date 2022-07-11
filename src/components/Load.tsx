import { Bridge } from '@qing-dev/bridge'
import { useAtom } from 'jotai'
import { Fragment, useEffect } from 'react'
import { useMount } from 'react-use'
import { bridgeAtom, fetcherAtom } from '../contexts/bridge'

export const Load = () => {
  const [bridge, setBridge] = useAtom(bridgeAtom)
  const [fetcher, setFetcher] = useAtom(fetcherAtom)

  useMount(() => {
    const fetcher = window.Fetcher
    const info = window.FetcherInfo
    if (fetcher && info) {
      setFetcher(info)
      const bridge = new Bridge(fetcher)
      setBridge(bridge)
    }
  })

  return <Fragment />
}
