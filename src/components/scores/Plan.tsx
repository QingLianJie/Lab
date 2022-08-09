import { ExpandMoreOutlined } from '@mui/icons-material'
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
  useTheme,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { Fragment, useState, type SyntheticEvent } from 'react'
import { plan2014, plan2019 } from '../../configs/scores/credits-plan'
import { studentAtom } from '../../contexts/bridge'
import { scoresListAtom } from '../../contexts/scores'
import markdown from '../../markdown/scores/plan-tips.md?raw'
import { scoreMap } from '../../utils/calc'
import { Markdown } from '../base/Markdown'

type PlanVersion = 'tips' | '2014' | '2019'

const plans = [
  { name: '2019', id: '2019' },
  { name: '2014', id: '2014' },
  { name: '培养方案', id: 'tips' },
]

export const ScoresPlan = () => {
  const student = useAtomValue(studentAtom)
  const is2014 = student && Number(student.id.slice(0, 4)) < 2019

  const [currentTab, setTab] = useState<PlanVersion>(is2014 ? '2014' : '2019')
  const handleChange = (_event: SyntheticEvent, value: PlanVersion) =>
    setTab(value)

  return (
    <Card variant="outlined">
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="培养方案学分统计"
            sx={{ minHeight: 44 }}
          >
            {plans.map(plan => (
              <Tab
                key={plan.id}
                label={plan.name}
                value={plan.id}
                sx={{
                  minHeight: 44,
                  minWidth: 'auto',
                  fontWeight: currentTab === plan.id ? 700 : 500,
                  px: 2.25,
                  ml: plan.id === 'tips' ? 'auto' : 0,
                }}
              />
            ))}
          </TabList>
        </Box>
        <TabPanel value="tips" sx={{ p: 0 }}>
          <Stack sx={{ px: 2.25, py: 2, fontSize: 'body2.fontSize' }}>
            <Markdown>{markdown}</Markdown>
          </Stack>
        </TabPanel>
        <TabPanel value="2019" sx={{ p: 0 }}>
          <PlanList plan={plan2019} />
        </TabPanel>
        <TabPanel value="2014" sx={{ p: 0 }}>
          <PlanList plan={plan2014} />
        </TabPanel>
      </TabContext>
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
  const { palette } = useTheme()
  const isDark = palette.mode === 'dark'

  const scoresList = useAtomValue(scoresListAtom)

  const selectedScores = scoresList.filter(s => s.selected)
  const isSelected = selectedScores.length > 0
  const calcScores = isSelected ? selectedScores : scoresList

  const passedScores = calcScores.filter(score =>
    score.score.some(s => scoreMap(s) >= 60)
  )

  const [collapse, setCollapse] = useState<string[]>([])

  const filterScores = (rules: Rules) =>
    passedScores.filter(score => {
      for (const rule of rules) {
        const target = score[rule.key as keyof typeof score]
        if (target && typeof target === 'string' && rule.value.includes(target))
          return true
      }
      return false
    })

  const calcCredits = (rules: Rules) =>
    filterScores(rules).reduce((pre, cur) => pre + cur.credit, 0)
  const calcCounts = (rules: Rules) => filterScores(rules).length

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
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Icon
                    component={list.icon}
                    sx={{
                      fontSize: 20,
                      color: 'text.disabled',
                      transition: 'all 0.2s',
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${list.name} (${calcCounts(list.rules)})`}
                  sx={{ fontVariantNumeric: 'tabular-nums', my: 0.375 }}
                />
                <Icon
                  component={ExpandMoreOutlined}
                  sx={{
                    fontSize: 20,
                    mr: 1,
                    color: 'text.disabled',
                    transform: collapse.includes(list.name)
                      ? 'rotate(180deg)'
                      : 'rotate(0)',
                    transition: 'all 0.2s',
                  }}
                />
                <Typography sx={{ fontWeight: 700 }}>
                  {calcCredits(list.rules)} 分
                </Typography>
              </ListItemButton>
              <Collapse in={collapse.includes(list.name)}>
                <Divider sx={{ mt: 1 }} />
                <List disablePadding sx={{ pt: 1 }}>
                  {list.children.map(item => (
                    <ListItem
                      key={item.name}
                      sx={{
                        pt: 0.5,
                        px: 2.25,
                        pb: item.children ? 0.25 : 0.5,
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
                              sx={{
                                fontWeight: 700,
                              }}
                            >
                              {calcCredits(item.rules)} 分
                            </Typography>
                          )}
                        </Stack>
                        {item.children && (
                          <List disablePadding sx={{ width: '100%' }}>
                            {item.children.map(child => (
                              <ListItem
                                key={child.name}
                                sx={{
                                  py: 0.25,
                                  px: 0,
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{ color: 'text.secondary' }}
                                >
                                  {child.name}
                                </Typography>

                                <Typography variant="caption">
                                  {calcCredits(child.rules)} 分
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
            <ListItem key={list.name} sx={{ py: 0.5, pr: 2.25 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Icon
                  component={list.icon}
                  sx={{
                    fontSize: 20,
                    color: 'text.disabled',
                    transition: 'all 0.2s',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={`${list.name} (${calcCounts(list.rules)})`}
              />
              <Typography sx={{ fontWeight: 700 }}>
                {calcCredits(list.rules)} 分
              </Typography>
            </ListItem>
          )
        )}
      </List>
    </Stack>
  )
}
