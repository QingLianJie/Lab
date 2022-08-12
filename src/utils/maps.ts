import { prefix } from '../configs/site-info'

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
  avatar: `${prefix}${response.image}`,
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

export const courseCommentResponseMap = (response: CourseCommentResponse) => ({
  id: response.id,
  content: response.content,
  date: response.created,
  user: {
    score: response.score ? response.score : undefined,
    anonymous: response.anonymous,
    name: response.user.username,
    id: response.user.pk || -1,
    avatar: response.user.image ? `${prefix}${response.user.image}` : undefined,
    self: response.self,
  },
  course: {
    id: response.course.course_id,
    name: response.course.name,
    credit: isNaN(Number(response.course.credit))
      ? 0
      : Number(response.course.credit),
    period: isNaN(Number(response.course.total_time))
      ? 0
      : Number(response.course.total_time),
    type: response.course.attributes,
    nature: response.course.kind,
    test: response.course.assessment_method,
    category: response.course.general_category,
    count: response.course.count,
  },
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

export const profileResponseMap = (response: ProfileResponse) => ({
  name: response.username,
  id: response.pk,
  email: response.email,
  avatar: `${prefix}${response.image}`,
  self: response.self,
  comments: response.comments.map(comment => courseCommentResponseMap(comment)),
})
