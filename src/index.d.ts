declare global {
  interface Window {
    Fetcher: Fetcher
    FetcherInfo: FetcherInfo
  }
}

export type Fetcher = (options: FetcherOptions) => Promise<string>

export type FetcherInfo = {
  name: string
  version: string
}

interface FetcherOptions {
  url: string
  method: 'GET' | 'POST'
  referer?: string
  headers?: { [key: string]: string }
  form?: string
}
