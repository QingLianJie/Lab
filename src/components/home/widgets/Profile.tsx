import {
  AccountCircleOutlined,
  FileUploadOutlined,
  LogoutOutlined,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  Divider,
  Icon,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import ky from 'ky'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useSWRConfig } from 'swr'
import { prefix } from '../../../configs/site-info'
import { modalsAtom } from '../../../contexts/modals'
import { schedulesAtom } from '../../../contexts/schedules'
import { scoresAtom } from '../../../contexts/scores'
import { accountAtom, settingsAtom } from '../../../contexts/settings'
import { Tooltip } from '../../base/styled/Tooltip'

export const HomeProfileWidget = () => {
  const navigate = useNavigate()

  const [modals, setModals] = useAtom(modalsAtom)
  const scores = useAtomValue(scoresAtom)
  const schedules = useAtomValue(schedulesAtom)

  const { mutate } = useSWRConfig()
  const [account, setAccount] = useAtom(accountAtom)
  const settings = useAtomValue(settingsAtom)

  const handleLogout = () => {
    ky.post(`${settings.developer.api || prefix}/rest-auth/logout/`, {
      credentials: 'include',
    }).then(() => {
      enqueueSnackbar('已退出登录')
      mutate(`${settings.developer.api || prefix}/api/user`)
      setAccount(false)
    })
  }

  const handleUpload = () => {
    const ans = confirm(
      '上传成绩可以帮助清廉街完善课程数据库，确认将匿名成绩上传到清廉街？'
    )
    if (!ans) return
    enqueueSnackbar('这个功能还没做')
    setModals(modals => ({ ...modals, thanks: true }))
  }

  return (
    <Card variant="outlined">
      {account ? (
        <Stack sx={{ position: 'relative' }}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              pb: 1.5,
              px: 2.25,
              pt: 2,
            }}
          >
            清廉街账号
          </Typography>
          <Stack
            direction="row"
            spacing={1.75}
            sx={{ px: 2.25, pb: 2, alignItems: 'center' }}
          >
            <Box
              sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: '50%',
                boxShadow: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.1)' },
                transition: 'transform 0.2s',
              }}
            >
              <Avatar
                src={
                  account && account.avatar
                    ? `${settings.developer.api || prefix}${account.avatar}`
                    : undefined
                }
                alt={account ? account.name : '未登录'}
                sx={{
                  backgroundColor: 'background.subtle',
                  width: 52,
                  height: 52,
                }}
                onClick={() => navigate('/settings?tab=account')}
              >
                <Typography
                  sx={{
                    color: 'text.disabled',
                    fontSize: 'h6.fontSize',
                    fontWeight: 700,
                  }}
                >
                  {account.name.slice(0, 1)}
                </Typography>
              </Avatar>
            </Box>
            <Stack spacing={0.25} sx={{ overflow: 'hidden' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {account.name}
                </Typography>
                <Chip
                  label={`UID ${account.id}`}
                  size="small"
                  sx={{
                    fontSize: 'caption.fontSize',
                    fontWeight: 700,
                    height: 'auto',
                    px: 0,
                    py: 0.1,
                  }}
                />
              </Stack>
              <Typography
                variant="body2"
                sx={{
                  width: '100%',
                  color: 'text.secondary',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {account.email || '无邮箱'}
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <CardActionArea
            onClick={
              scores && schedules
                ? handleUpload
                : () => navigate('/settings?tab=account')
            }
            sx={{ pl: 2.25, pr: 2, py: 1.5 }}
          >
            <Stack
              direction="row"
              spacing={2.5}
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {scores && schedules ? '上传匿名成绩' : '查看账号信息'}
              </Typography>
              <Icon
                component={
                  scores && schedules
                    ? FileUploadOutlined
                    : AccountCircleOutlined
                }
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </Stack>
          </CardActionArea>

          <Tooltip title="退出登录" arrow placement="top">
            <IconButton
              aria-label="退出登录"
              sx={{
                position: 'absolute',
                right: 5,
                top: 8,
                color: 'text.disabled',
                '&:hover': { color: 'text.primary' },
                transition: 'all 0.2s',
              }}
              onClick={handleLogout}
            >
              <LogoutOutlined sx={{ width: 24, height: 24 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Stack sx={{ px: 2.25, py: 2 }}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              pb: 1.5,
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
              mt: 1.5,
              mb: -1,
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={0.25}>
              {(['登录', '注册'] as const).map(text => (
                <Button
                  sx={{ py: 0.5, px: 1.25 }}
                  onClick={() =>
                    setModals(modals => ({ ...modals, auth: text }))
                  }
                  key={text}
                >
                  {text}
                </Button>
              ))}
            </Stack>
            <Button
              sx={{ py: 0.5, px: 1.25 }}
              onClick={() =>
                setModals(modals => ({ ...modals, auth: '重置密码' }))
              }
            >
              重置密码
            </Button>
          </Stack>
        </Stack>
      )}
    </Card>
  )
}
