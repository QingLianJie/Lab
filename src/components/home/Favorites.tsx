import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Card, Divider, Tab } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { HomeFavoritesEditMode, HomeFavoritesLinkEdit } from './favorites/Edit'
import { HomeFavoritesList, HomeFavoritesStarredList } from './favorites/List'

type TabType = 'starred' | 'all'

export const HomeFavorites = () => {
  const [currentTab, setTab] = useState<TabType>('starred')
  const handleChange = (_event: SyntheticEvent, value: TabType) => setTab(value)

  return (
    <Card variant="outlined">
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="收藏的链接"
            variant="fullWidth"
            sx={{ minHeight: 42 }}
          >
            <Tab
              label="收藏夹"
              value="starred"
              sx={{
                minHeight: 40,
                flex: 1,
                fontWeight: currentTab === 'starred' ? 700 : 500,
              }}
            />
            <Tab
              label="链接列表"
              value="all"
              sx={{
                minHeight: 40,
                flex: 1,
                fontWeight: currentTab === 'all' ? 700 : 500,
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="starred" sx={{ p: 0 }}>
          <HomeFavoritesStarredList />
          <Divider />
          <HomeFavoritesLinkEdit />
        </TabPanel>
        <TabPanel value="all" sx={{ p: 0 }}>
          <HomeFavoritesList />
          <Divider />
          <HomeFavoritesEditMode />
        </TabPanel>
      </TabContext>
    </Card>
  )
}
