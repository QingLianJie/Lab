import { CloseOutlined, FilterAltOutlined } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { groupBy, range } from 'lodash'
import { Fragment } from 'react'
import { modalsAtom } from '../../contexts/booleans'
import { scoresAtom, scoresFilterAtom } from '../../contexts/bridge/scores'
import { Modal } from '../base/Modal'

export const ScoresFilter = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const [scoresFilter, setScoresFilter] = useAtom(scoresFilterAtom)
  const scores = useAtomValue(scoresAtom)
  const resetFilter = useResetAtom(scoresFilterAtom)

  const handleFilter = (name: string, value: string) => {
    setScoresFilter(filter => ({
      ...filter,
      filter: { ...filter.filter, [name]: value },
    }))
  }

  const handleNumberFilter = (name: string, value: string) => {
    if (!value) {
      setScoresFilter(filter => ({
        ...filter,
        filter: { ...filter.filter, [name]: '' },
      }))
      return
    }

    const parts = value.split(/,|，/)
    const result = parts
      .map(part => {
        if (!isNaN(Number(part))) return Number(part)
        const from = part.split('-')
        if (
          from.length !== 2 ||
          isNaN(Number(from[0])) ||
          isNaN(Number(from[1]))
        )
          return []
        return range(Number(from[0]), Number(from[1]) + 0.5, 0.5)
      })
      .flat()

    setScoresFilter(filter => ({
      ...filter,
      filter: { ...filter.filter, [name]: result },
    }))
  }

  return (
    <Fragment>
      <Fab
        color="primary"
        aria-label="筛选"
        sx={{
          color: 'white',
          position: 'fixed',
          right: { xs: 24, md: 48 },
          bottom: { xs: 92, md: 48 },
        }}
        onClick={() =>
          setModals({
            ...modals,
            scores: { ...modals.scores, filter: true },
          })
        }
      >
        <FilterAltOutlined />
      </Fab>

      <Modal
        title="筛选课程"
        fullWidth
        maxWidth={false}
        open={modals.scores.filter}
        keepMounted
        onClose={() =>
          setModals({
            ...modals,
            scores: { ...modals.scores, filter: false },
          })
        }
        sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
      >
        <Stack spacing={1.5} sx={{ px: 2.5, pb: 2.5, overflowY: 'unset' }}>
          <FormControl size="small">
            <InputLabel id="score-type-label" size="small">
              课程类型
            </InputLabel>
            <Select
              labelId="score-type-label"
              id="score-type"
              value={scoresFilter.filter.type}
              label="课程类型"
              MenuProps={{ TransitionComponent: Fade }}
              onChange={e => handleFilter('type', e.target.value)}
            >
              <MenuItem value="">不限</MenuItem>
              {scores &&
                Object.entries(groupBy(scores.scores, 'type')).map(
                  ([type, group]) => (
                    <MenuItem value={type} key={type}>
                      {type} ({group.length})
                    </MenuItem>
                  )
                )}
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel id="score-nature-label" size="small">
              课程性质
            </InputLabel>
            <Select
              labelId="score-nature-label"
              id="score-nature"
              value={scoresFilter.filter.nature}
              label="课程性质"
              MenuProps={{ TransitionComponent: Fade }}
              onChange={e => handleFilter('nature', e.target.value)}
            >
              <MenuItem value="">不限</MenuItem>
              {scores &&
                Object.entries(groupBy(scores.scores, 'nature')).map(
                  ([nature, group]) => (
                    <MenuItem value={nature} key={nature}>
                      {nature} ({group.length})
                    </MenuItem>
                  )
                )}
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel id="score-category-label" size="small">
              课程分类
            </InputLabel>
            <Select
              labelId="score-category-label"
              id="score-category"
              value={scoresFilter.filter.category}
              label="课程分类"
              MenuProps={{ TransitionComponent: Fade }}
              onChange={e => handleFilter('category', e.target.value)}
            >
              <MenuItem value="">不限</MenuItem>
              {scores &&
                Object.entries(groupBy(scores.scores, 'category')).map(
                  ([category, group]) =>
                    category !== 'undefined' && (
                      <MenuItem value={category} key={category}>
                        {category} ({group.length})
                      </MenuItem>
                    )
                )}
            </Select>
          </FormControl>

          <Stack direction="row">
            <TextField
              id="score-credit"
              label="学分"
              size="small"
              sx={{ mr: 1.5 }}
              onChange={e => handleNumberFilter('credit', e.target.value)}
            />
            <TextField
              id="score-period"
              label="学时"
              size="small"
              onChange={e => handleNumberFilter('period', e.target.value)}
            />
          </Stack>

          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              px: 0.5,
              lineHeight: 1.5,
            }}
          >
            提示：学时和学分可以使用 , 或 - 符号进行筛选，代表单个或连续范围
          </Typography>

          <Button
            type="button"
            variant="outlined"
            color="warning"
            sx={{ width: '100%', mt: 1.5, py: 0.625 }}
            onClick={resetFilter}
          >
            重置筛选及搜索
          </Button>
        </Stack>
      </Modal>
    </Fragment>
  )
}
