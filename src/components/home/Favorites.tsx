import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Card, Divider, Tab } from '@mui/material'
import { useAtomValue } from 'jotai'
import { SyntheticEvent, useMemo, useState } from 'react'
import { favoritesAtom, Favorite } from '../../contexts/links'
import { HomeFavoritesEditMode, HomeFavoritesLinkEdit } from './favorites/Edit'
import { HomeFavoritesList, HomeFavoritesStarredList } from './favorites/List'
import { HomeFavoritesShare } from './favorites/Share'

type TabType = 'star' | 'all' | 'share'

const tabs = [
  { name: '收藏', id: 'star' },
  { name: '链接列表', id: 'all' },
  { name: '分享', id: 'share' },
]

export const HomeFavorites = () => {
  const favorites = useAtomValue(favoritesAtom)
  const starrtedFavorites = useMemo(
    () =>
      favorites.reduce((pre, cur) => {
        if ('children' in cur) {
          pre.push(...cur.children.filter(item => item.star))
          return pre
        } else {
          if (cur.star) pre.push(cur)
          return pre
        }
      }, [] as Favorite[]),
    [favorites]
  )

  const [currentTab, setTab] = useState<TabType>(
    starrtedFavorites.length === 0 ? 'all' : 'star'
  )
  const handleChange = (_event: SyntheticEvent, value: TabType) => setTab(value)

  return (
    <Card variant="outlined">
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="收藏的链接"
            sx={{ minHeight: 44 }}
          >
            {tabs.map(tab => (
              <Tab
                key={tab.id}
                label={tab.name}
                value={tab.id}
                sx={{
                  minHeight: 44,
                  minWidth: 'auto',
                  ml: { xs: tab.name === '分享' ? 'auto' : 0, sm: 0 },
                  px: 2.25,
                  flex: { xs: 'unset', sm: 'auto' },
                  whiteSpace: 'nowrap',
                  fontWeight: currentTab === tab.id ? 700 : 500,
                }}
              />
            ))}
          </TabList>
        </Box>
        <TabPanel value="star" sx={{ p: 0 }}>
          <HomeFavoritesStarredList list={starrtedFavorites} />
          <Divider />
          <HomeFavoritesLinkEdit />
        </TabPanel>

        <TabPanel value="all" sx={{ p: 0 }}>
          <HomeFavoritesList />
          <Divider />
          <HomeFavoritesEditMode />
        </TabPanel>

        <TabPanel value="share" sx={{ p: 0 }}>
          <HomeFavoritesShare />
        </TabPanel>
      </TabContext>
    </Card>
  )
}
