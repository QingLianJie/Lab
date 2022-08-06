import { favorites } from '../configs/home/favorites'
import { atomLocal } from '../utils/atom'

export type Favorite = {
  id: number
  name: string
  href: string
  star?: boolean
  lan?: boolean
}

export type Favorites = (
  | {
      id: number
      name: string
      children: Favorite[]
    }
  | Favorite
)[]

export const defaultFavorites = favorites

export const favoritesAtom = atomLocal<Favorites>('favorites', defaultFavorites)
