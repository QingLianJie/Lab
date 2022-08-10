import { Bridge } from '@qing-dev/bridge'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useEffect } from 'react'
import { useMount } from 'react-use'
import useSWR from 'swr'
import { prefix } from '../configs/site-info'
import { bridgeAtom, fetcherAtom } from '../contexts/bridge'
import { scoresAtom, scoresListAtom } from '../contexts/scores'
import { accountAtom } from '../contexts/settings'
import { slientFetcher } from '../utils/addons'
import { accountResponseMap, type UserResponse } from '../utils/maps'

export const Load = () => {
  const { data, error } = useSWR<UserResponse | false>(
    `${prefix}/api/user`,
    slientFetcher,
    {
      refreshInterval: 60 * 60 * 1000,
      suspense: true,
      refreshWhenHidden: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      onSuccess: (data: UserResponse | false) => {
        if (!data) return
        setAccount(accountResponseMap(data))
      },
      onError: () => setAccount(false),
    }
  )

  const [, setAccount] = useAtom(accountAtom)
  const [, setBridge] = useAtom(bridgeAtom)
  const [, setFetcher] = useAtom(fetcherAtom)

  useMount(() => {
    const fetcher = window.Fetcher
    const info = window.FetcherInfo
    if (fetcher && info) {
      setFetcher(info)
      const bridge = new Bridge(fetcher)
      setBridge(bridge)
    }

    if (error) setAccount(false)
    if (data) setAccount(accountResponseMap(data))
  })

  const scores = useAtomValue(scoresAtom)
  const [scoresList, setScoresList] = useAtom(scoresListAtom)

  useEffect(() => {
    if (scores) setScoresList(scores.scores)
  }, [scores])

  return <Fragment />
}
