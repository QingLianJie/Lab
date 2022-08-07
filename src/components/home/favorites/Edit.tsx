import { AddOutlined } from '@mui/icons-material'
import { CardActionArea, Stack, Typography } from '@mui/material'
import { Fragment } from 'react'

export const HomeFavoritesEdit = () => {
  return (
    <Fragment>
      <CardActionArea>
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
    </Fragment>
  )
}
