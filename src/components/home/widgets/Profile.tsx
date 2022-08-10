import { Button, Card, Stack, Typography } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { modalsAtom } from '../../../contexts/modals'
import { accountAtom } from '../../../contexts/settings'

export const HomeProfileWidget = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const account = useAtomValue(accountAtom)

  return (
    <Card variant="outlined" sx={{ px: 2, py: 1.5 }}>
      {account ? (
        <Stack>HomeProfile</Stack>
      ) : (
        <Stack sx={{ pt: 0.5, px: 0.25 }}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              pb: 1,
            }}
          >
            加入清廉街
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            登录清廉街账号后，可以发表课程评论、同步收藏夹等。新版清廉街账号不再绑定
            HEU 账号。
          </Typography>
          <Stack
            direction="row"
            sx={{
              mx: -1.25,
              mt: 2,
              mb: -0.5,
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={0.25}>
              {(['登录', '注册'] as const).map(text => (
                <Button
                  sx={{ py: 0.5, px: 1.25 }}
                  onClick={() => setModals({ ...modals, auth: text })}
                  key={text}
                >
                  {text}
                </Button>
              ))}
            </Stack>
            <Button
              sx={{ py: 0.5, px: 1.25 }}
              onClick={() => setModals({ ...modals, auth: '重置密码' })}
            >
              重置密码
            </Button>
          </Stack>
        </Stack>
      )}
    </Card>
  )
}