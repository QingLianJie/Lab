import { BookmarkAddOutlined, CopyAllOutlined } from '@mui/icons-material'
import {
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { compressSync, decompressSync, strFromU8, strToU8 } from 'fflate'
import { useAtom } from 'jotai'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { favoritesAtom, type Favorites } from '../../../contexts/links'
import { Tooltip } from '../../base/styled/Tooltip'

type SimplifiedFavorites = (
  | { n: string; h: string }
  | { n: string; c: { n: string; h: string }[] }
)[]

const convert = (favorites: Favorites): SimplifiedFavorites =>
  favorites.map(favorite => {
    if ('children' in favorite)
      return {
        n: favorite.name,
        c: favorite.children.map(item => ({ n: item.name, h: item.href })),
      }
    return { n: favorite.name, h: favorite.href }
  })

const parse = (json: SimplifiedFavorites): Favorites => {
  let count = new Date().getTime()

  return json.map(group => {
    if ('c' in group)
      return {
        id: count++,
        name: group.n,
        children: group.c.map(item => ({
          id: count++,
          name: item.n,
          href: item.h,
        })),
      }
    return {
      id: count++,
      name: group.n,
      href: group.h,
    }
  })
}

export const HomeFavoritesShare = () => {
  const [favorites, setFavorites] = useAtom(favoritesAtom)
  const favoritesGroup = favorites.filter(favorite => 'children' in favorite)

  const [group, setGroup] = useState('')
  const handleCopy = () => {
    const data = JSON.stringify(
      group
        ? convert(
            favorites.filter(
              favorite => 'children' in favorite && favorite.name === group
            )
          )
        : convert(favorites)
    )

    const gziped = btoa(strFromU8(compressSync(strToU8(data)), true))
    navigator.clipboard
      .writeText(gziped)
      .then(() => enqueueSnackbar('已复制选定链接和分组的代码'))
      .catch(error => {
        console.error(error)
        enqueueSnackbar(`复制出错 ${error}`)
      })
  }

  const [paste, setPaste] = useState('')
  const handleImport = () => {
    if (!paste) return
    try {
      const data = strFromU8(decompressSync(strToU8(atob(paste), true)))
      const json = JSON.parse(data) as SimplifiedFavorites
      const result = parse(json)
      setFavorites([...favorites, ...result])
      enqueueSnackbar(`成功导入 ${result.length} 个链接和分组`)
    } catch (error) {
      console.error(error)
      enqueueSnackbar('导入链接失败，请检查是否复制完整')
    }
  }

  return (
    <Stack divider={<Divider />}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ pl: 2, pt: 2, pb: 1.25, pr: 1.5 }}
      >
        <FormControl fullWidth>
          <InputLabel size="small">选择分享分组</InputLabel>
          <Select
            id="favorites-share-select"
            value={group}
            label="选择分享分组"
            size="small"
            onChange={e => setGroup(e.target.value)}
          >
            <MenuItem value="">全部</MenuItem>
            {favoritesGroup.map(favorite => (
              <MenuItem value={favorite.name} key={favorite.id}>
                {favorite.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>默认分享全部链接和分组</FormHelperText>
        </FormControl>
        <Tooltip title="复制分享代码" arrow placement="top">
          <IconButton
            size="small"
            color="primary"
            onClick={handleCopy}
            sx={{
              width: 40,
              height: 40,
              '&:hover svg': { color: 'text.secondary' },
            }}
          >
            <CopyAllOutlined
              sx={{ color: 'text.disabled', transition: 'color 0.2s' }}
            />
          </IconButton>
        </Tooltip>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{ pl: 2, pt: 2, pb: 1.25, pr: 1.5 }}
      >
        <TextField
          label="粘贴分享代码"
          size="small"
          placeholder="在这里粘贴分享代码"
          rows={3}
          multiline
          fullWidth
          helperText="导入不会覆盖当前的列表"
          onChange={e => setPaste(e.target.value)}
        />

        <Tooltip title="导入链接" arrow placement="top">
          <IconButton
            size="small"
            color="primary"
            onClick={handleImport}
            sx={{
              width: 40,
              height: 40,
              cursor: !!paste ? 'pointer' : 'not-allowed',
              '&:hover svg': { color: 'text.secondary' },
            }}
          >
            <BookmarkAddOutlined
              sx={{ color: 'text.disabled', transition: 'color 0.2s' }}
            />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  )
}
