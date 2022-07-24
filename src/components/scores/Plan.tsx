import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Card,
  Collapse,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tab,
  Typography,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { Fragment, SyntheticEvent, useState } from 'react'
import { plan2014, plan2019 } from '../../configs/scores/credits-plan'
import { scoresAtom } from '../../contexts/bridge/scores'
import { scoreMap } from '../../utils/calc'
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
          <TabList
            onChange={handleChange}
            aria-label="培养方案学分统计"
            variant="fullWidth"
            sx={{ minHeight: 40 }}
          >
            <Tab
              label="2019 版培养方案"
              value="2019"
              sx={{ minHeight: 40, flex: 3 }}
            />
            <Tab label="2014 版" value="2014" sx={{ minHeight: 40, flex: 2 }} />
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

type Rules = {
  key: string
  value: string[]
}[]

const PlanList = ({ plan }: PlanListProps) => {
  const scores = useAtomValue(scoresAtom)
  const passedScores = scores
    ? scores.scores.filter(score => score.score.some(s => scoreMap(s) >= 60))
    : []

  const [collapse, setCollapse] = useState<string[]>([])

  const calcCredits = (rules: Rules) =>
    passedScores
      .filter(score => {
        for (const rule of rules) {
          const target = score[rule.key as keyof typeof score]
          if (
            target &&
            typeof target === 'string' &&
            rule.value.includes(target)
          )
            return true
        }
        return false
      })
      .reduce((pre, cur) => pre + cur.credit, 0)

  return (
    <Stack divider={<Divider />}>
      <List disablePadding sx={{ py: 1 }}>
        {plan.map(list =>
          list.children ? (
            <Fragment key={list.name}>
              <ListItemButton
                key={list.name}
                sx={{ py: 0.5, pr: 2.25 }}
                onClick={() =>
                  collapse.includes(list.name)
                    ? setCollapse(collapse.filter(x => x !== list.name))
                    : setCollapse([...collapse, list.name])
                }
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon
                    component={list.icon}
                    sx={{ fontSize: 20, color: 'text.disabled' }}
                  />
                </ListItemIcon>
                <ListItemText primary={list.name} />
                {collapse.includes(list.name) ? (
                  <ExpandLess sx={{ fontSize: 20 }} />
                ) : (
                  <ExpandMore sx={{ fontSize: 20 }} />
                )}
              </ListItemButton>
              <Collapse in={collapse.includes(list.name)}>
                <Divider sx={{ mt: 1 }} />
                <List component="div" disablePadding sx={{ pt: 1 }}>
                  {list.children.map(item => (
                    <ListItem
                      key={item.name}
                      sx={{
                        pt: 0.75,
                        px: 2.5,
                        pb: item.children ? 0.25 : 0.75,
                      }}
                    >
                      <Stack spacing={0.75} sx={{ width: '100%' }}>
                        <Stack
                          direction="row"
                          sx={{
                            width: '100%',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 700, color: 'text.secondary' }}
                          >
                            {item.name}
                          </Typography>
                          {item.rules && (
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 700 }}
                            >
                              {calcCredits(item.rules)}
                            </Typography>
                          )}
                        </Stack>
                        {item.children && (
                          <List
                            component="div"
                            disablePadding
                            sx={{ width: '100%' }}
                          >
                            {item.children.map(child => (
                              <ListItem
                                key={child.name}
                                sx={{
                                  py: 0.5,
                                  px: 0,
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ color: 'text.secondary' }}
                                >
                                  {child.name}
                                </Typography>

                                <Typography variant="body2">
                                  {calcCredits(child.rules)}
                                </Typography>
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </Stack>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Fragment>
          ) : (
            <ListItemButton key={list.name} sx={{ py: 0.5, pr: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Icon
                  component={list.icon}
                  sx={{ fontSize: 20, color: 'text.disabled' }}
                />
              </ListItemIcon>
              <ListItemText primary={list.name} />
              <Typography sx={{ fontWeight: 700 }}>
                {calcCredits(list.rules)}
              </Typography>
            </ListItemButton>
          )
        )}
      </List>
    </Stack>
  )
}
