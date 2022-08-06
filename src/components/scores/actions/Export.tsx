import { FileDownloadOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { pick } from 'lodash'
import { studentAtom } from '../../../contexts/bridge'
import { scoresListAtom, scoresViewAtom } from '../../../contexts/scores'
import { Tooltip } from '../../base/styled/Tooltip'

export const ScoresExportAction = () => {
  const student = useAtomValue(studentAtom)
  const scoresList = useAtomValue(scoresListAtom)
  const scoresView = useAtomValue(scoresViewAtom)

  const handleExport = () => {
    const data = scoresList
      .filter(score => !score.hidden)
      .map(score => pick(score, scoresView.columns))

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = href
    link.download = `${student ? student.id : ''} 导出的成绩 ${dayjs().format(
      'YYYY-MM-DD HH-mm-ss'
    )}.json`.trim()
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  return (
    <Tooltip title="导出当前表 (JSON)" arrow placement="top">
      <IconButton
        aria-label="导出当前表"
        sx={{
          color: 'text.disabled',
          '&:hover': { color: 'text.primary' },
          transition: 'all 0.2s',
        }}
        onClick={handleExport}
      >
        <FileDownloadOutlined />
      </IconButton>
    </Tooltip>
  )
}
