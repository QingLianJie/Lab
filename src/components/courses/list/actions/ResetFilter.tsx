import { BookOutlined, CloseOutlined } from '@mui/icons-material'
import { Button, Icon, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { Tooltip } from '../../../base/styled/Tooltip'

export const CoursesListResetFilter = () => {
  const [params, setParams] = useSearchParams()

  return (
    <Tooltip title="重置搜索及筛选" arrow placement="top">
      <Button
        color="primary"
        sx={{
          width: 'fit-content',
          ml: -1,
          ps: 1.25,
          pr: 1.75,
          py: 1,
          alignItems: 'center',
        }}
        onClick={() => setParams({})}
      >
        <Icon
          component={
            [...params.keys()].length === 0 ? BookOutlined : CloseOutlined
          }
          sx={{ color: 'text.disabled', mr: 1.5 }}
        />
        <Typography sx={{ fontSize: 'body1.fontSize', color: 'text.primary' }}>
          0 个课程
        </Typography>
      </Button>
    </Tooltip>
  )
}
