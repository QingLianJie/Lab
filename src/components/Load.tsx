import { Bridge } from '@qing-dev/bridge'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useEffect } from 'react'
import { useMount } from 'react-use'
import { bridgeAtom, fetcherAtom } from '../contexts/bridge'
import { scoresAtom, scoresListAtom } from '../contexts/scores'

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

  const scores = useAtomValue(scoresAtom)
  const [scoresList, setScoresList] = useAtom(scoresListAtom)

  useEffect(() => {
    if (scores) setScoresList(scores.scores)
  }, [scores])

  return <Fragment />
}
