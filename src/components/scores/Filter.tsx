import { FilterAltOutlined } from '@mui/icons-material'
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { modalsAtom } from '../../contexts/booleans'
import { scoresAtom } from '../../contexts/bridge/scores'

export const Filter = () => {
  const [modals, setModals] = useAtom(modalsAtom)
  const scores = useAtomValue(scoresAtom)

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
        sx={{ '& .MuiPaper-root': { maxWidth: '18rem' } }}
      >
        <DialogTitle sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
          筛选课程
        </DialogTitle>
        <DialogContent sx={{ px: 2.5 }}>
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
              >
                <MenuItem value="">不限</MenuItem>
                <MenuItem value="必修">必修</MenuItem>
                <MenuItem value="公选">公选</MenuItem>
                <MenuItem value="任选">任选</MenuItem>
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
              >
                <MenuItem value="">不限</MenuItem>
                <MenuItem value="专业核心课程">专业核心课程</MenuItem>
                <MenuItem value="自然科学与技术基础必修课">
                  自然科学与技术基础必修课
                </MenuItem>
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
                <MenuItem value="专业核心课程">专业核心课程</MenuItem>
                <MenuItem value="自然科学与技术基础必修课">
                  自然科学与技术基础必修课
                </MenuItem>
              </Select>
              <FormHelperText>选修分类，如中华传统文化等</FormHelperText>
            </FormControl>

            <Stack>
              <Stack direction="row">
                <TextField
                  id="score-period"
                  type="number"
                  label="学分"
                  size="small"
                  sx={{ mr: 1.5 }}
                />
                <TextField
                  id="score-credit"
                  label="学时"
                  size="small"
                  type="number"
                />
              </Stack>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  px: 1.5,
                  py: 0.75,
                  lineHeight: 1.5,
                }}
              >
                提示：学时和学分可以使用 , 或 - 符号进行筛选，代表单个或连续范围
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
