import {
  CircularProgress,
  Collapse,
  List,
  Stack,
  Typography,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { Fragment, useMemo } from 'react'
import { TransitionGroup } from 'react-transition-group'
import useSWR from 'swr'
import { prefix } from '../../../../configs/site-info'
import { accountAtom } from '../../../../contexts/settings'
import { type UserProfile } from '../../../../index.d'
import { fetcher } from '../../../../utils/addons'
import {
  profileResponseMap,
  type ProfileResponse,
} from '../../../../utils/maps'
import { SettingsAccountComment } from './Comment'

export const SettingsAccountComments = () => {
  const account = useAtomValue(accountAtom)

  const { data } = useSWR<ProfileResponse>(
    `${prefix}/api/profile/${account ? account.name : ''}`,
    fetcher,
    {
      refreshInterval: 24 * 60 * 60 * 1000,
      suspense: true,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  )

  const profile: UserProfile = useMemo(() => {
    if (!data) throw new Error('评论加载失败')
    return profileResponseMap(data)
  }, [data])

  return (
    <Fragment>
      {profile.comments.length === 0 ? (
        <SettingsAccountCommentsError title="没有发表过课程评论" />
      ) : (
        <List dense sx={{ px: 0, py: 1 }}>
          <TransitionGroup>
            {profile.comments
              .sort((a, b) => b.id - a.id)
              .map(comment => (
                <Collapse key={comment.id}>
                  <SettingsAccountComment comment={comment} />
                </Collapse>
              ))}
          </TransitionGroup>
        </List>
      )}
    </Fragment>
  )
}

interface SettingsAccountCommentsErrorProps {
  title?: string
}

export const SettingsAccountCommentsError = ({
  title,
}: SettingsAccountCommentsErrorProps) => (
  <Stack
    sx={{
      flex: 1,
      height: '100%',
      width: '100%',
      px: 2,
      py: { xs: 12, sm: 8, md: 4 },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography sx={{ color: 'text.disabled' }}>
      {title || '获取课程评论出错'}
    </Typography>
  </Stack>
)

export const SettingsAccountCommentsLoading = () => (
  <Stack
    spacing={0.5}
    sx={{
      flex: 1,
      height: '100%',
      px: 2,
      py: { xs: 12, sm: 8, md: 4 },
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress size={24} thickness={6} />
  </Stack>
)
