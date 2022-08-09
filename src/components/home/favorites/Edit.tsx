import { AddOutlined, EditOffOutlined, EditOutlined } from '@mui/icons-material'
import {
  Autocomplete,
  Button,
  CardActionArea,
  Checkbox,
  FormControlLabel,
  Icon,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { type FormEvent, Fragment, useEffect, useRef, useState } from 'react'
import { modesAtom } from '../../../contexts/modes'
import { Modal } from '../../base/Modal'
import { useAtom } from 'jotai'
import { favoritesAtom } from '../../../contexts/links'
import { enqueueSnackbar } from 'notistack'

type FormType = {
  name: string
  href: string
  group?: string
  star?: boolean
}

export const HomeFavoritesLinkEdit = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [favorites, setFavorites] = useAtom(favoritesAtom)

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<FormType>({ name: '', href: '' })

  const groups = favorites
    .filter(favorites => 'children' in favorites)
    .map(group => group.name)

  useEffect(() => {
    if (!open || !inputRef.current) return
    inputRef.current.focus()
  }, [open])

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    const now = new Date().getTime()
    const link = {
      id: now + 1,
      name: form.name,
      href: form.href,
      star: !!form.star,
    }

    if (form.group) {
      const target = favorites.find(
        favorite => 'children' in favorite && favorite.name === form.group
      )
      if (target) {
        setFavorites(favorites =>
          favorites.map(group => {
            if ('children' in group && group.name === target.name)
              return {
                ...group,
                children: [...group.children, link],
              }
            return group
          })
        )
      } else {
        setFavorites(favorites => [
          ...favorites,
          {
            id: now,
            name: form.group || '未分组',
            children: [link],
          },
        ])
      }
    } else {
      setFavorites([...favorites, link])
    }
    enqueueSnackbar(`已添加链接 ${form.name}`)
    setForm({ name: '', href: '' })
    setOpen(false)
  }

  return (
    <Fragment>
      <CardActionArea onClick={() => setOpen(true)}>
        <Stack
          spacing={1.5}
          direction="row"
          sx={{
            pl: 2.25,
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
        title="添加自定义链接"
        fullWidth
        keepMounted
        maxWidth={false}
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
      >
        <Stack
          component="form"
          spacing={1.5}
          sx={{ px: 2.5, pb: 2.5 }}
          onSubmit={handleAdd}
        >
          <TextField
            inputRef={inputRef}
            id="link-name"
            label="名称"
            size="small"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            id="link-href"
            label="地址"
            size="small"
            required
            value={form.href}
            onChange={e => setForm({ ...form, href: e.target.value })}
          />
          <Autocomplete
            freeSolo
            id="link-group"
            options={groups}
            inputValue={form.group || ''}
            onInputChange={(e, value) =>
              setForm({ ...form, group: value || '' })
            }
            renderInput={params => (
              <TextField
                {...params}
                size="small"
                label="分组"
                helperText="可以通过输入分组名来添加分组"
              />
            )}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="link-star"
                sx={{ my: -3, ml: -1 }}
                size="small"
                checked={!!form.star}
                onChange={e => setForm({ ...form, star: e.target.checked })}
              />
            }
            label="添加到收藏夹"
            sx={{ '& span': { fontSize: 'body2.fontSize' } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ py: 0.75 }}
          >
            添加链接
          </Button>
        </Stack>
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
            pl: 2.25,
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
