import {
  BookOutlined,
  CheckBoxOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material'
import { blue, green, red } from '@mui/material/colors'

export const plan2014 = [
  {
    name: '必修',
    icon: BookOutlined,
    color: red,
    rules: [{ key: 'type', value: ['必修'] }],
  },
  {
    name: '专选',
    icon: WorkOutlineOutlined,
    color: blue,
    rules: [
      {
        key: 'nature',
        value: ['专业选修课程', '专业选修课', '19专业选修课程'],
      },
    ],
  },
  {
    name: '选修',
    icon: CheckBoxOutlined,
    color: green,
    rules: [
      {
        key: 'nature',
        value: [
          '中外历史与文化',
          '语言与文学',
          '哲学人生与社会科学',
          '艺术修养与审美',
          '自然科学与人类文明',
          '国防文化与船海史话',
          '中华传统文化',
          '19中华传统文化类（A0）',
          '新生研讨类',
          '专业拓展类',
          '创新创业类',
          '19创新创业综合实践课程',
        ],
      },
    ],
    children: [
      {
        name: '文化素养教育',
        rules: [
          {
            key: 'nature',
            value: [
              '中外历史与文化',
              '语言与文学',
              '哲学人生与社会科学',
              '艺术修养与审美',
              '自然科学与人类文明',
              '国防文化与船海史话',
              '中华传统文化',
              '19中华传统文化类（A0）',
            ],
          },
        ],
        children: [
          {
            name: 'A 中外历史与文化',
            rules: [{ key: 'nature', value: ['中外历史与文化'] }],
          },
          {
            name: 'B 语言与文学',
            rules: [{ key: 'nature', value: ['语言与文学'] }],
          },
          {
            name: 'C 哲学人生与社会科学',
            rules: [{ key: 'nature', value: ['哲学人生与社会科学'] }],
          },
          {
            name: 'D 艺术修养与审美',
            rules: [{ key: 'nature', value: ['艺术修养与审美'] }],
          },
          {
            name: 'E 自然科学与人类文明',
            rules: [{ key: 'nature', value: ['自然科学与人类文明'] }],
          },
          {
            name: 'F 国防文化与船海史话',
            rules: [{ key: 'nature', value: ['国防文化与船海史话'] }],
          },
          {
            name: 'G 中华优秀传统文化',
            rules: [
              {
                key: 'nature',
                value: ['中华传统文化', '19中华传统文化类（A0）'],
              },
            ],
          },
        ],
      },
      {
        name: '新生研讨',
        rules: [{ key: 'nature', value: ['新生研讨类'] }],
      },
      {
        name: '专业拓展',
        rules: [{ key: 'nature', value: ['专业拓展类'] }],
      },
      {
        name: '创新创业',
        rules: [
          { key: 'nature', value: ['创新创业类', '19创新创业综合实践课程'] },
        ],
      },
    ],
  },
]

export const plan2019 = [
  {
    name: '必修',
    icon: BookOutlined,
    color: red,
    rules: [{ key: 'type', value: ['必修'] }],
  },
  {
    name: '专选',
    icon: WorkOutlineOutlined,
    color: blue,
    rules: [
      {
        key: 'nature',
        value: ['专业选修课程', '专业选修课', '19专业选修课程'],
      },
      { key: 'category', value: ['19跨专业选修类（G）'] },
    ],
  },
  {
    name: '选修',
    icon: CheckBoxOutlined,
    color: green,
    rules: [
      {
        key: 'kind',
        value: [
          '19人文素质与文化传承（A）',
          '中华传统文化',
          '19中华传统文化类（A0）',
          '19艺术鉴赏与审美体验（B）',
          '艺术修养与审美',
          '19社会发展与公民责任（C）',
          '19自然科学与工程技术（D）',
          '19三海一核与国防建设（E）',
          '19创新思维与创业实践（F）',
          '创新创业类',
        ],
      },
    ],
    children: [
      {
        name: 'A 人文素质与文化传承',
        rules: [
          {
            key: 'kind',
            value: [
              '19人文素质与文化传承（A）',
              '中华传统文化',
              '19中华传统文化类（A0）',
            ],
          },
        ],
        children: [
          {
            name: 'A0 中华传统文化类',
            rules: [{ key: 'kind', value: ['19中华传统文化类（A0）'] }],
          },
        ],
      },
      {
        name: 'B 艺术鉴赏与审美体验',
        rules: [
          {
            key: 'kind',
            value: ['19艺术鉴赏与审美体验（B）', '艺术修养与审美'],
          },
        ],
      },
      {
        name: 'C 社会发展与公民责任',
        rules: [{ key: 'kind', value: ['19社会发展与公民责任（C）'] }],
      },
      {
        name: 'D 自然科学与工程技术',
        rules: [{ key: 'kind', value: ['19自然科学与工程技术（D）'] }],
      },
      {
        name: 'E 三海一核与国防建设',
        rules: [{ key: 'kind', value: ['19三海一核与国防建设（E）'] }],
      },
      {
        name: 'F 创新思维与创业实践',
        rules: [
          { key: 'kind', value: ['19创新思维与创业实践（F）', '创新创业类'] },
        ],
      },
    ],
  },
]
