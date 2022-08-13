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
  credit: number
  nature: string
  period: number
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
  name: string // 学期
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
  remark: SummaryRemarkCourse[]
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

export interface CommentUser {
  score?: string
  anonymous: boolean
  name: string
  id: number
  avatar?: string
  self?: boolean
}

export interface Comment {
  id: number
  content: string
  date: string
  user: CommentUser
}

export interface CommentCourse extends Course {
  count: number
}

export interface TrendsCourseComment {
  course: CommentCourse
  comments: Comment[]
}

export type TrendsCourseComments = TrendsCourseComment[]

export enum CourseScoresType {
  '等级制',
  '分数制',
}

export interface CourseDetails {
  course: CommentCourse
  statistics: {
    name: string
    count: number
    scores: (
      | {
          type: CourseScoresType['等级制']
          data: { [key: string]: number }
        }
      | {
          type: CourseScoresType['分数制']
          data: { [key: number]: number }
        }
    )[]
  }[]
  comments: {
    name: '清廉街' | '腐败街'
    comments: Comment[]
  }[]
}

export interface UserProfileComment extends Comment {
  course: CommentCourse
}

export interface UserProfile {
  name: string
  id: number
  email?: string
  avatar?: string
  self?: boolean
  comments: UserProfileComment[]
}
