import {
  type CoursesList,
  type CommentCourse,
  type CourseDetails,
  type UserProfile,
  type UserProfileComment,
} from '../index.d'
import { removeEmpty } from './format'

export interface UserResponse {
  pk: number
  username: string
  image: string
  self: boolean
  heu_username: string
  email: string
}

export const accountResponseMap = (response: UserResponse) => ({
  name: response.username,
  id: response.pk,
  email: response.email,
  avatar: response.image,
})

export interface CourseResponse {
  id: number
  course_id: string
  name: string
  credit: string
  total_time: string
  assessment_method: string
  attributes: string
  kind: string
  general_category: string
  count: number
}

export interface CommentUserResponse {
  username: string
  pk?: number
  image?: string
}

export interface CourseCommentResponse {
  id: number
  content: string
  created: string
  anonymous: boolean
  course: CourseResponse
  user: CommentUserResponse
  show: boolean
  self: boolean
  score: string
}

export const courseResponseMap = (response: CourseResponse): CommentCourse => ({
  id: response.course_id,
  name: response.name,
  credit: isNaN(Number(response.credit)) ? 0 : Number(response.credit),
  period: isNaN(Number(response.total_time)) ? 0 : Number(response.total_time),
  type: response.attributes,
  nature: response.kind,
  test: response.assessment_method,
  category: response.general_category,
  count: response.count,
})

export const courseCommentResponseMap = (
  response: CourseCommentResponse
): UserProfileComment => ({
  id: response.id,
  content: response.content,
  date: response.created,
  user: {
    score: response.score ? response.score : undefined,
    anonymous: response.anonymous,
    name: response.user.username,
    id: response.user.pk || -1,
    avatar: response.user.image ? response.user.image : undefined,
    self: response.self,
  },
  course: courseResponseMap(response.course),
})

export interface ProfileResponse {
  pk: number
  username: string
  image: string
  self: boolean
  heu_username: string
  email: string
  comments: CourseCommentResponse[]
}

export const profileResponseMap = (response: ProfileResponse): UserProfile => ({
  name: response.username,
  id: response.pk,
  email: response.email,
  avatar: response.image,
  self: response.self,
  comments: response.comments.map(comment => courseCommentResponseMap(comment)),
})

export interface CourseDetailsResponse extends CourseResponse {
  comments: {
    id: number
    content: string
    created: string
    anonymous: boolean
    user: CommentUserResponse
    show: boolean
    self: boolean
    score: string
  }[]
  more_comments: string
  my_scores: string | null
  statistics: {
    [key: string]: {
      total: number
      exam: { [key: string]: number }
      test: { [key: string]: number }
    }
  }
  fubaijie_comments: {
    id: number
    content: string
    created: string
    anonymous: boolean
    course: CourseResponse
    username: string
    show: boolean
    score: string
  }[]
}

export const courseDetailsResponseMap = (
  response: CourseDetailsResponse
): CourseDetails => ({
  course: courseResponseMap(response),
  statistics: [...Object.entries(response.statistics)].map(([key, value]) => ({
    name: key === 'all' ? '所有时间' : key,
    count: value.total,
    scores: [
      { type: '等级制', data: value.test },
      { type: '分数制', data: value.exam },
    ].filter(obj => Object.keys(obj.data).length !== 0),
  })),
  comments: [
    {
      name: '清廉街',
      comments: response.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        date: comment.created,
        user: {
          score: comment.score ? comment.score : undefined,
          anonymous: comment.anonymous,
          name: comment.user.username,
          id: comment.user.pk || -1,
          avatar: comment.user.image ? comment.user.image : undefined,
          self: comment.self,
        },
      })),
    },
    {
      name: '腐败街',
      comments: response.fubaijie_comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        date: comment.created,
        user: {
          score: comment.score ? comment.score : undefined,
          anonymous: comment.anonymous,
          name: comment.username,
          id: -1,
        },
      })),
    },
  ],
})

export interface CoursesListResponse {
  count: number
  next: string
  previous: string
  results: CourseResponse[]
}

export const coursesListResponseMap = (
  response: CoursesListResponse
): CoursesList => ({
  count: response.count,
  courses: response.results.map(course => courseResponseMap(course)),
})

export interface CoursesListQuery {
  search?: string
  type?: string
  nature?: string
  test?: string
  credit?: string
  period?: string
}

export const coursesListQueryMap = (query: string) => {
  const params = new URLSearchParams(query)

  return new URLSearchParams(
    removeEmpty({
      search: params.get('search') || '',
      attributes: params.get('type') || '',
      assessment_method: params.get('test') || '',
      kind: params.get('nature') || '',
      credit: params.get('credit') || '',
      total_time: params.get('period') || '',
    })
  ).toString()
}
