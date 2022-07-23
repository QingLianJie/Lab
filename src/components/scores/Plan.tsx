import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  Tab,
  Typography,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { Fragment, SyntheticEvent, useState } from 'react'
import { plan2014, plan2019 } from '../../configs/scores/credits-plan'
import { scoresAtom } from '../../contexts/bridge/scores'
import { Markdown } from '../base/Markdown'

type PlanVersion = '2014' | '2019'

const calcTips = `
- 培养方案计算仅供参考，可能会有计算错误，请认真核对！
- 培养方案计算中仅包含成绩合格科目（等效成绩 >= 60 分）的学分统计。
`

export const Plan = () => {
  const scores = useAtomValue(scoresAtom)

  const [currentTab, setTab] = useState<PlanVersion>('2019')
  const handleChange = (_event: SyntheticEvent, value: PlanVersion) =>
    setTab(value)

  return (
    <Card variant="outlined">
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="培养方案学分统计">
            <Tab label="2019 版培养方案" value="2019" />
            <Tab label="2014 版" value="2014" />
          </TabList>
        </Box>
        <TabPanel value="2019" sx={{ p: 0 }}>
          <PlanList plan={plan2019} />
        </TabPanel>
        <TabPanel value="2014" sx={{ p: 0 }}>
          <PlanList plan={plan2014} />
        </TabPanel>
      </TabContext>
      <Divider />
      <Box sx={{ fontSize: 'body2.fontSize', p: 2, color: 'text.secondary' }}>
        <Markdown>{calcTips}</Markdown>
      </Box>
    </Card>
  )
}

interface PlanListProps {
  plan: typeof plan2014 | typeof plan2019
}

const PlanList = ({ plan }: PlanListProps) => {
  const scores = useAtomValue(scoresAtom)

  return (
    <Stack divider={<Divider />}>
      {plan.map((list, i) => (
        <List
          key={i}
          subheader={
            list.name && (
              <ListSubheader sx={{ lineHeight: 2.5 }}>
                {list.name}
              </ListSubheader>
            )
          }
          sx={{ py: 1 }}
        >
          {list.children.map(item => (
            <ListItem key={item.name} sx={{ py: 0.5 }}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      ))}
    </Stack>
  )
}
