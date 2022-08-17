import { BookOutlined, CloseOutlined } from '@mui/icons-material'
import { Button, Icon, IconButton, Typography } from '@mui/material'
import { Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tooltip } from '../../../base/styled/Tooltip'

export const CoursesListResetFilter = () => {
  const [params, setParams] = useSearchParams()

  return (
    <Fragment>
      {[...params.keys()].filter(key => key !== 'page').length !== 0 && (
        <Tooltip title="重置搜索及筛选" arrow placement="top">
          <IconButton
            color="primary"
            sx={{
              color: 'text.disabled',
              '&:hover': { color: 'text.primary' },
              transition: 'all 0.2s',
            }}
            onClick={() => setParams({})}
          >
            <CloseOutlined />
          </IconButton>
        </Tooltip>
      )}
    </Fragment>
  )
}
