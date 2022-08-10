import ky from 'ky'

export const fetcher = <T>(url: string): Promise<T> =>
  ky.get(url, { credentials: 'include' }).json()

export const slientFetcher = <T>(url: string): Promise<T | false> =>
  ky
    .get(url, { credentials: 'include' })
    .then(res => res.json() as Promise<T>)
    .catch(error => {
      console.error(error)
      return false
    })
