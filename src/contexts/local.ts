import { atom } from 'jotai'

export const atomLocal = <T>(key: string, initialValue: T) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key)
    if (item !== null) return JSON.parse(item)
    return initialValue
  }
  const baseAtom = atom<T>(getInitialValue() as T)
  const derivedAtom = atom<T, T | ((arg: T) => T)>(
    get => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function'
          ? (update as (arg: T) => T)(get(baseAtom))
          : update
      set(baseAtom, nextValue)
      if (!nextValue) localStorage.removeItem(key)
      else localStorage.setItem(key, JSON.stringify(nextValue))
    }
  )
  return derivedAtom
}