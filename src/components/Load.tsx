import { Bridge } from '@qing-dev/bridge'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useEffect } from 'react'
import { useMount } from 'react-use'
import useSWR from 'swr'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { prefix } from '../configs/site-info'
import { bridgeAtom, fetcherAtom } from '../contexts/bridge'
import { scoresAtom, scoresListAtom } from '../contexts/scores'
import { accountAtom, settingsAtom } from '../contexts/settings'
import { slientFetcher } from '../utils/addons'
import { accountResponseMap, type UserResponse } from '../utils/maps'
import { Confirm } from './base/Modal'

export const Load = () => {
  const settings = useAtomValue(settingsAtom)

  const { data, error } = useSWR<UserResponse | false>(
    `${settings.developer.api || prefix}/api/user`,
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

export const ReloadPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.debug('Service Worker 已注册' + r)
    },
    onRegisterError(error) {
      console.debug('Service Worker 注册失败', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  useEffect(() => {
    if (!offlineReady) return
    console.debug('清廉街缓存完成')
  }, [offlineReady])

  return (
    <Confirm
      title="清廉街更新"
      description="清廉街网站有更新，需要重新加载页面，是否现在更新？"
      open={needRefresh}
      onClose={() => close()}
      onConfirm={() => updateServiceWorker(true)}
    />
  )
}
