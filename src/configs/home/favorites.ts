import { type Favorites } from '../../contexts/links'

export const favorites: Favorites = [
  {
    id: 1,
    name: '常用链接',
    children: [
      {
        id: 101,
        name: '学生个人中心',
        href: 'https://edusys.wvpn.hrbeu.edu.cn/jsxsd/framework/xsMain.jsp',
        star: true,
      },
      {
        id: 102,
        name: '网上办事中心',
        href: 'https://one.wvpn.hrbeu.edu.cn/',
        star: true,
      },
      {
        id: 103,
        name: '学校官网',
        href: 'http://www.hrbeu.edu.cn/',
        star: false,
      },
      {
        id: 104,
        name: '学校电子邮箱',
        href: 'https://mail.hrbeu.edu.cn/',
        star: false,
      },
      {
        id: 105,
        name: '图书馆官网',
        href: 'https://lib.wvpn.hrbeu.edu.cn/',
        star: false,
      },
      {
        id: 106,
        name: '云打印',
        href: 'http://librf.hrbeu.edu.cn/',
        lan: true,
        star: false,
      },
    ],
  },
  {
    id: 2,
    name: '学习平台',
    children: [
      {
        id: 201,
        name: '智慧树',
        href: 'https://onlineweb.zhihuishu.com/',
        star: false,
      },
      {
        id: 202,
        name: '超星',
        href: 'https://i.chaoxing.com/',
        star: false,
      },
      {
        id: 203,
        name: '雨课堂',
        href: 'https://www.yuketang.cn/web',
        star: false,
      },
    ],
  },
  {
    id: 3,
    name: '考试与技能认证',
    children: [
      {
        id: 301,
        name: '四六级',
        href: 'https://cet.neea.edu.cn/',
        star: false,
      },
      {
        id: 302,
        name: '黑龙江省人事考试网',
        href: 'http://www.hljrsks.org.cn/hljrsks/index/index.ks',
        star: false,
      },
      {
        id: 303,
        name: '软考',
        href: 'https://bm.ruankao.org.cn/sign/welcome',
        star: false,
      },
      {
        id: 304,
        name: '教师资格证',
        href: 'http://ntce.neea.edu.cn/',
        star: false,
      },
      {
        id: 305,
        name: '普通话',
        href: 'https://bm.cltt.org/#/index',
        star: false,
      },
    ],
  },
  {
    id: 4,
    name: '毕业设计与论文',
    children: [
      {
        id: 401,
        name: '本科生毕业设计管理系统',
        href: 'https://co2.cnki.net/Login.html?dp=hrbeu',
        star: false,
      },
      {
        id: 402,
        name: 'Google 学术',
        href: 'https://scholar.google.com/',
        star: false,
      },
      {
        id: 403,
        name: '中国知网 CNKI',
        href: 'https://www-cnki-net-443.wvpn.hrbeu.edu.cn/',
        star: false,
      },
      {
        id: 404,
        name: '万方数据',
        href: 'https://g-wanfangdata-com-cn.wvpn.hrbeu.edu.cn/',
        star: false,
      },
    ],
  },
  {
    id: 5,
    name: '其他链接',
    children: [
      {
        id: 501,
        name: '学信网',
        href: 'https://my.chsi.com.cn/archive/index.jsp',
        star: false,
      },
      {
        id: 502,
        name: '教师个人主页',
        href: 'http://homepage.hrbeu.edu.cn/irisweb/kyindex',
        star: false,
      },
      {
        id: 503,
        name: '工学新闻',
        href: 'http://gongxue.cn/',
        star: false,
      },
      {
        id: 504,
        name: '轻教平台',
        href: 'https://qingj.wvpn.hrbeu.edu.cn/',
        star: false,
      },
      {
        id: 505,
        name: '实验室综合管理系统',
        href: 'http://lims.hrbeu.edu.cn/OLMSWeb/Indexmain.aspx',
        lan: true,
        star: false,
      },
    ],
  },
]
