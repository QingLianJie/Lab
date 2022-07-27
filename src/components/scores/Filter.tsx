import { CloseOutlined, FilterAltOutlined } from '@mui/icons-material'
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { groupBy } from 'lodash'
import { Fragment } from 'react'
import { modalsAtom } from '../../contexts/booleans'
import { scoresAtom, scoresListAtom } from '../../contexts/bridge/scores'

export const Filter = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const [scoresList, setScoresList] = useAtom(scoresListAtom)
  const scores = useAtomValue(scoresAtom)

  const handleType = (e: SelectChangeEvent) => {}
  const handleFilter = (name: string, value: string) => {
    if (!scores) return
    if (!value) {
    }
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

      <Dialog
        fullWidth
        maxWidth={false}
        open={modals.scores.filter}
        onClose={() =>
          setModals({
            ...modals,
            scores: { ...modals.scores, filter: false },
          })
        }
        sx={{ '& .MuiPaper-root': { maxWidth: '16rem' } }}
      >
        <DialogTitle sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
          筛选课程
          <IconButton
            aria-label="关闭"
            title="关闭"
            onClick={() =>
              setModals({
                ...modals,
                scores: { ...modals.scores, filter: false },
              })
            }
            sx={{ position: 'absolute', right: 12, top: 10 }}
          >
            <CloseOutlined
              sx={{
                color: 'text.disabled',
                '&:hover': { color: 'text.primary' },
                transition: 'all 0.2s',
              }}
            />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 2.5, pb: 2, overflowY: 'unset' }}>
          <Stack spacing={1.5}>
            <FormControl size="small">
              <InputLabel id="score-type-label" size="small">
                课程类型
              </InputLabel>
              <Select
                labelId="score-type-label"
                id="score-type"
                value=""
                label="课程类型"
                MenuProps={{ TransitionComponent: Fade }}
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
                value=""
                label="课程性质"
                MenuProps={{ TransitionComponent: Fade }}
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
                value=""
                label="课程分类"
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
                id="score-period"
                label="学分"
                size="small"
                sx={{ mr: 1.5 }}
              />
              <TextField id="score-credit" label="学时" size="small" />
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
          </Stack>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
