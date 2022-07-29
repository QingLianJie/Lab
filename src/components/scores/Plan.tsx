import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material'
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
import { Fragment, SyntheticEvent, useState } from 'react'
import { plan2014, plan2019 } from '../../configs/scores/credits-plan'
import { scoresAtom, scoresListAtom } from '../../contexts/bridge/scores'
import { scoreMap } from '../../utils/calc'

type PlanVersion = '2014' | '2019'

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
            sx={{ minHeight: 44 }}
          >
            <Tab
              label="2019 版培养方案"
              value="2019"
              sx={{ minHeight: 42, flex: 3 }}
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
      <PlanTips />
    </Card>
  )
}

const PlanTips = () => (
  <Typography
    variant="body2"
    sx={{
      fontSize: 'body2.fontSize',
      px: 2,
      py: 1.75,
      color: 'text.secondary',
    }}
  >
    注：培养方案计算仅供参考，请认真核对，此处计算仅统计成绩合格科目的学分。
  </Typography>
)

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
                sx={{
                  py: 0.5,
                  pr: 2.25,
                  '&:hover svg': { color: list.color[isDark ? 400 : 500] },
                }}
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
                />
                <Icon
                  component={
                    collapse.includes(list.name)
                      ? ExpandLessOutlined
                      : ExpandMoreOutlined
                  }
                  sx={{
                    fontSize: 20,
                    mr: 1,
                    color: 'text.disabled',
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
                        px: 2.5,
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
                              sx={{ fontWeight: 700 }}
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
            <ListItemButton
              key={list.name}
              sx={{
                py: 0.5,
                pr: 2.5,
                '&:hover svg': { color: list.color[isDark ? 400 : 500] },
              }}
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
              />
              <Typography sx={{ fontWeight: 700 }}>
                {calcCredits(list.rules)} 分
              </Typography>
            </ListItemButton>
          )
        )}
      </List>
    </Stack>
  )
}
