declare global {
  interface Window {
    Fetcher: Fetcher
  }
}

export type Fetcher = (options: FetcherOptions) => Promise<string>

interface FetcherOptions {
  url: string
  method: 'GET' | 'POST'
  referer?: string
  headers?: { [key: string]: string }
  form?: string
}
