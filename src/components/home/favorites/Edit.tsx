import { AddOutlined, EditOffOutlined, EditOutlined } from '@mui/icons-material'
import { CardActionArea, Icon, Stack, Typography } from '@mui/material'
import { Fragment, useState } from 'react'
import { modesAtom } from '../../../contexts/modes'
import { Modal } from '../../base/Modal'
import { useAtom } from 'jotai'

export const HomeFavoritesLinkEdit = () => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <CardActionArea onClick={() => setOpen(true)}>
        <Stack
          spacing={1.5}
          direction="row"
          sx={{
            pl: 2.5,
            pr: 2,
            py: 1.5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            添加自定义链接
          </Typography>
          <AddOutlined fontSize="small" sx={{ color: 'text.disabled' }} />
        </Stack>
      </CardActionArea>

      <Modal
        title="编辑链接和分组"
        fullWidth
        maxWidth={false}
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
      >
        <Stack spacing={1} sx={{ px: 3, pb: 3 }}></Stack>
      </Modal>
    </Fragment>
  )
}

export const HomeFavoritesEditMode = () => {
  const [modes, setModes] = useAtom(modesAtom)

  return (
    <Fragment>
      <CardActionArea
        onClick={() => setModes({ ...modes, favorites: !modes.favorites })}
      >
        <Stack
          spacing={1.5}
          direction="row"
          sx={{
            pl: 2.5,
            pr: 2,
            py: 1.5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: modes.favorites ? 700 : 500,
            }}
          >
            {modes.favorites ? '退出编辑模式' : '进入编辑模式'}
          </Typography>
          <Icon
            component={modes.favorites ? EditOffOutlined : EditOutlined}
            fontSize="small"
            sx={{ color: 'text.disabled', width: 20, height: 20 }}
          />
        </Stack>
      </CardActionArea>
    </Fragment>
  )
}
