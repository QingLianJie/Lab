declare global {
  interface Window {
    Fetcher: Fetcher
    FetcherInfo: FetcherInfo
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

export type FetcherInfo = {
  name: string
  version: string
}

export interface Course {
  name: string
  id: string
  type: string
  category: string
  test: string
  credit: string
  period: string
}

export interface Score {
  term: string // 学期
  name: string
  id: string
  type: string // 类型（必修、选修等）
  nature: string // 课程性质（专业核心课程、自然科学与技术基础必修课等）
  test: string // 考查方式（考试、考查等）
  from: string[] // 考试性质（正常考试、缺考等）
  credit: number // 学分
  period: number // 学时
  score: (string | number)[] // 分数（分数制或等级制）
  category?: string // 课程分类（选修中的艺术修养与审美、创新创业类等）
  mark?: (string | undefind)[] // 成绩标记（如缺考）
}

export type Scores = Score[]

export type ScoresAtom = {
  id: string
  date: string
  scores: Scores
}

export interface Timetable {
  name: string | undefined // 学期
  weeks: TimetableWeek[]
  courses: Summary
}

export interface TimetableWeek {
  name: string // 第几周
  rows: TimetableRow[]
}

export interface TimetableRow {
  name: string // 第几大节
  cols: TimetableCol[]
}

export interface TimetableCol {
  name: string // 星期几
  courses: TimetableCourse[]
}

export interface TimetableCourse {
  name: string
  teacher: string[]
  week: number[]
  location?: string
  section?: number[]
}

export type Summary = {
  main: SummaryCourse[]
  remark: SummaryCourse[]
}

export type SummaryCourse = {
  name: string
  week: number[]
  day: number
  teacher: string[]
  location: string
  section: number[]
}

export type SummaryRemarkCourse = {
  name: string
  week: number[]
  teacher: string[]
}

export type TimeTableBlock = {
  row: number
  span: number
  col: number
  courses: SummaryCourse[]
}

export type TimeTableBlocks = TimeTableBlock[]

export type SchedulesAtom = {
  id: string
  date: string
  timetable: Timetable
  colors: {
    name: string
    color: string
  }[]
}
