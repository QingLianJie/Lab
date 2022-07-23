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
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { Fragment, useState } from 'react'
import { scoresAtom } from '../../contexts/bridge/scores'

export const Filter = () => {
  const [open, setOpen] = useState(false)
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
        onClick={() => setOpen(true)}
      >
        <FilterAltOutlined />
      </Fab>

      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiPaper-root': { maxWidth: '18rem' } }}
      >
        <DialogTitle sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
          筛选课程
        </DialogTitle>
        <DialogContent sx={{ px: 2.5 }}>
          <Stack spacing={1.5}>
            <TextField
              id="score-search"
              label="根据课程信息搜索 ..."
              size="small"
              helperText="可以搜索课程名、成绩等信息"
            />

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
            </FormControl>

            <Stack direction="row">
              <TextField
                id="score-credit"
                label="学时"
                size="small"
                type="number"
                sx={{ mr: 1.5 }}
              />
              <TextField
                id="score-period"
                type="number"
                label="学分"
                size="small"
              />
            </Stack>

            <FormControl sx={{ px: 0.5 }}>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="只看有效成绩"
                sx={{ mt: -0.5 }}
              />
              <FormHelperText sx={{ my: -0.5, mx: 0 }}>
                不看缺考成绩、补考课程的历史成绩
              </FormHelperText>
            </FormControl>
          </Stack>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
